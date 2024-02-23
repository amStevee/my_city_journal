import { Request, Response } from 'express';
import { v4 as uuidv4 } from 'uuid';
import { PrismaClient } from '@prisma/client';
import jwt from 'jsonwebtoken';

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

const prisma = new PrismaClient();

// FOR TEST PURPOSE (GET ALL AUTHORS REQUEST)
export const getAllAuthors = async (req: CustomRequest, res: Response) => {
  try {
    const authors = await prisma.author.findMany();

    res.status(200).json({authors});
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
        authorId: authorId,
        title: title,
        location: location,
        description: description,
        rating: rating,
        isPublic: isPublic,
        image: image,
      },
    });

    res.status(200).json({ msg: 'article added successfully' });
  } catch (error: any) {
    console.error(error.message);
    res.status(500).json({ msg: '[Server Error]: something went wrong' });
  }
};

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
    const articles = await prisma.article.findUnique({
      where: {
        id: id,
      },
    });

    if (!articles) res.json({ msg: 'no article found' });

    res.status(200).json(articles);
  } catch (error: any) {
    console.error(error.message);
    res.status(500).json({ msg: '[Server Error]: something went wrong' });
  }
};
