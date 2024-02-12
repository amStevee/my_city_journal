import express,{ Response, Request } from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient()

const register = async (req: Request, res: Response) => {
    prisma
}