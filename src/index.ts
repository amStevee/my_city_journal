import express, { Application, Request, Response } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
dotenv.config();

const port = process.env.PORT || 5000;

const app: Application = express();

app.listen(port, () => {
  console.log(`[server✨]: server is running on port ${port}`);
});
