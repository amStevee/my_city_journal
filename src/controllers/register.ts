import { Response, Request } from 'express';
import { PrismaClient } from '@prisma/client';
import { v4 as uuidv4 } from 'uuid';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';


interface Body {
  firstname: string;
  lastname: string;
  middlename?: string;
  username: string;
  email: string;
  password: string;
}

interface loginBody {
  id: string;
  username: string;
  password: string;
}

const prisma = new PrismaClient();

const jwt_secret = process.env.JWT_SECRET;

export const register = async (req: Request, res: Response) => {
  const { firstname, lastname, middlename, username, email, password }: Body =
    req.body;
  const id = uuidv4();
  const saltRounds = 10;

  bcrypt.hash(password, saltRounds, async function (err, hash) {
    if (err) res.json({ errMessage: err.message });

    // Store hash in your password DB.
    await prisma.author.create({
      data: {
        id: id,
        firstname: firstname,
        lastname: lastname,
        middlename: middlename,
        username: username,
        email: email,
        password: hash,
      },
    });
  });

  const user = await prisma.author.findUnique({
    where: {
      id: id,
    },
  });

  res.status(200).json(user);
};

export const login = async (req: Request, res: Response) => {
  const { username, password }: loginBody = req.body;
  const user = await prisma.author.findUnique({
    where: {
      username: username,
    },
  });

  if (!user) {
    res.json({ msg: 'user not found' });
  } else {
    bcrypt.compare(password, user?.password, function (err, result) {
      if (err) res.status(400).json({ msg: 'invalid credentials' });

      const token = jwt.sign(
        {
          exp: Math.floor(Date.now() / 1000) + 60 * 60, // 1hr
          data: {...user, password: null},
        },
        'jwt_secret'
      );

      res.json({ token });
    });
  }
};
