import { Request, Response } from 'express';
import { v4 as uuidv4 } from 'uuid';
import { PrismaClient } from '@prisma/client';
import { capitalizeString } from '../utils/capitalize';
import { articleType, bodyType, filterQ, paramsType } from '../utils/types';

const prisma = new PrismaClient();

// FOR TEST PURPOSE (GET ALL AUTHORS REQUEST)
export const getAllAuthors = async (req: Request, res: Response) => {
  try {
    const authors = await prisma.author.findMany();

    res.status(200).json({ authors });
  } catch (error: any) {
    console.error(error.message);
    res.status(500).json({
      error_msg:
        '[Server Error]: sorry we are unable to properly handle this error at the moment',
    });
  }
};
// /////////////////////////

// cloud fler

// CREATE ARTICLE
export const createArticle = async (req: Request, res: Response) => {
  try {
    const { uxr }: paramsType = req.params;
    const {
      title,
      location,
      description,
      rating,
      isPublic,
      image,
    }: articleType = req.body;

    const articleId = uuidv4();

    await prisma.article.create({
      data: {
        id: articleId,
        title,
        location,
        description,
        rating,
        isPublic,
        image,
        author: { connect: { id: uxr } }, // Connect the article to the author
      },
    });

    const updatedArticles = await prisma.article.findMany({
      where: {
        authorId: uxr,
      },
    });

    await prisma.author.update({
      where: { id: uxr },
      data: {
        articles: {
          connect: updatedArticles.map((article) => ({ id: article.id })),
        },
      },
    });

    res.status(200).json({ success: true, msg: 'article added successfully' });
  } catch (error: any) {
    console.error(error.message);
    res.status(500).json({
      error_msg:
        '[Server Error]: sorry we are unable to properly handle this error at the moment',
    });
  }
};

// UPDATE ARTICLE DESCRIPTION
export const updateDescription = async (req: Request, res: Response) => {
  // /articles/:uxr/article/update/:artc
  try {
    const { uxr, artc }: paramsType = req.params;
    const { desc }: bodyType = req.body;

    await prisma.article.update({
      where: { id: artc, authorId: uxr },
      data: {
        description: desc,
      },
    });

    res.status(200).json({ success: true, msg: 'updated successfully' });
  } catch (error: any) {
    console.error(error.message);
    res
      .status(500)
      .json({ error_msg: '[Server Error]: Unable to process this request' });
  }
};

// DELETE ARTICLE
export const deleteArticle = async (req: Request, res: Response) => {
  try {
    const { uxr, artc }: paramsType = req.params;

    await prisma.article.delete({
      where: {
        id: String(artc),
        authorId: uxr,
      },
    });

    res.status(200).json({ success: true, msg: 'Deleted successfully' });
  } catch (error: any) {
    console.error(error.message);
    res.status(500).json({
      error_msg:
        '[Server Error]: sorry we are unable to properly handle this error at the moment',
    });
  }
};

// CREATE ARTICLE COMMENT
export const createComment = async (req: Request, res: Response) => {
  try {
    // /articles/:uxr/article/:artc
    const { uxr, artc }: paramsType = req.params;

    const { desc }: bodyType = req.body;
    const cmtId = uuidv4();

    // Create new comment
    const comment = await prisma.comments.create({
      data: {
        id: cmtId,
        authorId: uxr,
        articleId: artc,
        content: desc,
      },
    });

    res.status(200).json({ success: true, msg: comment });
  } catch (error: any) {
    console.error(error.message);
    res.status(500).json({
      error_msg:
        '[Server Error]: sorry we are unable to properly handle this error at the moment',
    });
  }
};

// UPDATE ARTICLE COMMENT
export const updateComment = async (req: Request, res: Response) => {
  try {
    const { uxr, artc, cmt }: paramsType = req.params;
    const { desc }: bodyType = req.body;

    await prisma.comments.update({
      where: {
        id_authorId_articleId: {
          id: cmt,
          authorId: uxr,
          articleId: artc,
        },
      },
      data: {
        content: desc,
      },
    });

    const updateComment = await prisma.comments.findMany({
      where: {
        id: cmt,
      },
    });

    await prisma.article.update({
      where: {
        id: artc,
      },

      data: {
        comments: {
          connect: updateComment.map((comment) => ({
            id_authorId_articleId: {
              id: comment.id,
              authorId: comment.authorId,
              articleId: comment.articleId,
            },
          })),
        },
      },
    });

    res.status(200).json({ success: true });
  } catch (error: any) {
    console.error(error.message);
    res.status(500).json({
      error_msg:
        '[Server Error]: sorry we are unable to properly handle this error at the moment',
    });
  }
};

// DELETE ARTICLE COMMENT
export const deleteComment = async (req: Request, res: Response) => {
  const { uxr, artc, cmt }: paramsType = req.params;
  await prisma.comments.deleteMany({
    where: {
      id: cmt,
      authorId: uxr,
      articleId: artc,
    },
  });

  res.status(200).json({ success: true });
};

// GET PUB. ARTICLE
export const getAllPublicArticle = async (req: Request, res: Response) => {
  try {
    const articles = await prisma.article.findMany({
      where: {
        isPublic: true,
      },
      include: {
        comments: true,
      },
    });

    if (!articles) res.json({ success: true, msg: 'no article found' });

    res.status(200).json(articles);
  } catch (error: any) {
    console.error(error.message);
    res.status(500).json({
      error_msg:
        '[Server Error]: sorry we are unable to properly handle this error at the moment',
    });
  }
};

// GET USER's ARTICLES
export const getAllPersonalArticle = async (req: Request, res: Response) => {
  // uxr as user id
  const { uxr }: paramsType = req.params;
  try {
    const articles = await prisma.article.findMany({
      where: {
        authorId: uxr,
      },
    });

    if (!articles) res.json({ success: true, msg: 'no article found' });

    res.status(200).json(articles);
  } catch (error: any) {
    console.error(error.message);
    res.status(500).json({
      error_msg:
        '[Server Error]: sorry we are unable to properly handle this error at the moment',
    });
  }
};

// FILTER ARTICLES
export const filterArticlesByLocation = async (req: Request, res: Response) => {
  try {
    const { location }: filterQ = req.query;

    const filteredResult = await prisma.article.findMany({
      where: {
        location: await capitalizeString(location),
      },
    });

    if (!filteredResult.length)
      res.json({ success: true, msg: 'no article match your query' });

    res.status(200).json(filteredResult);
  } catch (error: any) {
    console.error(error.message);
    res.status(500).json({
      error_msg:
        '[Server Error]: sorry we are unable to properly handle this error at the moment',
    });
  }
};
