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

const jwt_secret = process.env.JWT_SECRET as string;

export const register = async (req: Request, res: Response) => {
  const { firstname, lastname, middlename, username, email, password }: Body =
    req.body;

    // Check if user already exist
   const verifyUser = await prisma.author.findUnique({
     where: {
       username: username,
     },
   });

   if (verifyUser) 
    res.json({msg: "username already taken"})
  // 

  const id = uuidv4();
  const saltRounds = 10;

  bcrypt.hash(password, saltRounds, async function (err, hash) {
    if (err) res.json({ msg: err.message });

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


  res.status(200).json({msg: "user successfully creadted"});
};

export const login = async (req: Request, res: Response) => {
  const { username, password }: loginBody = req.body;
  const user = await prisma.author.findUnique({
    where: {
      username: username,
    },
  });

  if (!user) {
    res.json({ msg: 'invalid cridentials' });
  } else {
    bcrypt.compare(password, user?.password, function (err, result) {
      if (err) res.status(400).json({ msg: 'invalid credentials' });

      const token = jwt.sign(
        {
          exp: Math.floor(Date.now() / 1000) + 60 * 60, // 1hr
          data: { ...user, password: null },
        },
        jwt_secret
      );

      res.status(200).json({ token });
    });
  }
};
