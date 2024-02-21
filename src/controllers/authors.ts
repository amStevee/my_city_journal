import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";


const prisma = new PrismaClient();


export const getAllAuthors = async (req: Request, res: Response) => {
    const authors = await prisma.author.findMany()

    if (!authors) res.status(500).json({msg: "something went wrong"})

    res.status(200).json(authors)
}