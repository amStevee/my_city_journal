import { Request, Response } from 'express';
import { v4 as uuidv4 } from 'uuid';
import { PrismaClient } from '@prisma/client';
import jwt from 'jsonwebtoken';
import { capitalizeString } from '../utils/capitalize';

interface authorType {
  id: String;
  firstname: String;
  lastname: String;
  middlename?: String;
  username: String;
  email: String;
  password: String;
  following: String[];
  created_at: String;
  updated_at?: string;
}

interface commentsType {
  id: String;
  comment: String;
  articleId: String;
}

interface articleType {
  authorId: string;
  title: string;
  location: string;
  description: string;
  rating: number;
  isPublic: boolean;
  image: string;
}

interface peruType {
  id: string;
}

interface CustomRequest extends Request {
  token?: string;
}

interface filterQ {
  location?: string;
}

const prisma = new PrismaClient();

// FOR TEST PURPOSE (GET ALL AUTHORS REQUEST)
export const getAllAuthors = async (req: CustomRequest, res: Response) => {
  try {
    const authors = await prisma.author.findMany();

    res.status(200).json({ authors });
  } catch (error: any) {
    console.error(error.message);
    res.status(500).json({ msg: '[Server Error]: something went wrong' });
  }
};
// /////////////////////////

// CREATE
export const createArticle = async (req: Request, res: Response) => {
  try {
    const {
      authorId,
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
        author: { connect: { id: authorId } }, // Connect the article to the author
      },
    });

    const updatedArticles = await prisma.article.findMany({
      where: {
        authorId: authorId,
      },
    });

    await prisma.author.update({
      where: { id: authorId },
      data: {
        articles: {
          connect: updatedArticles.map((article) => ({ id: article.id })),
        },
      },
    });

    res.status(200).json({ msg: 'article added successfully' });
  } catch (error: any) {
    console.error(error.message);
    res.status(500).json({ msg: '[Server Error]: something went wrong' });
  }
};

// UPDATE ARTICLE DESCRIPTION

// DELETE ARTICLE

// DELETE ACCOUNT

// CREATE ARTICLE COMMENT

// UPDATE ARTICLE COMMENT

// DELETE ARTICLE COMMENT

// GET PUB. ARTICLE
export const getAllPublicArticle = async (req: Request, res: Response) => {
  try {
    const articles = await prisma.article.findMany({
      where: {
        isPublic: true,
      },
    });

    if (!articles) res.json({ msg: 'no article found' });

    res.status(200).json(articles);
  } catch (error: any) {
    console.error(error.message);
    res.status(500).json({ msg: '[Server Error]: something went wrong' });
  }
};

// GET USER's ARTICLES
export const getAllPersonalArticle = async (req: Request, res: Response) => {
  const { id }: peruType = req.body;
  try {
    const articles = await prisma.article.findMany({
      where: {
        authorId: id,
      },
    });

    if (!articles) res.json({ msg: 'no article found' });

    res.status(200).json(articles);
  } catch (error: any) {
    console.error(error.message);
    res.status(500).json({ msg: '[Server Error]: something went wrong' });
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
      res.json({ msg: 'no article match your query' });

    res.status(200).json(filteredResult);
  } catch (error: any) {
    console.error(error.message);
    res.status(500).json({ msg: '[Server Error]: something went wrong' });
  }
};

