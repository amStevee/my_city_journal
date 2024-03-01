import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';
import { paramsType } from '../utils/types';

const prisma = new PrismaClient();
export const verifyUser = async (
  req: Request,
  res: Response,
  next: () => void
) => {
  try {
    const { uxr }: paramsType = req.params;

    const verifyUser = await prisma.article.findMany({
      where: {
        authorId: uxr,
      },
    });

    if (verifyUser) next();
  } catch (error) {
    res.sendStatus(403);
  }
};
