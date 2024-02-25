import dotenv from 'dotenv';
import express, { Application, urlencoded } from 'express';
import cors from 'cors';
dotenv.config();

const port = process.env.PORT || 5000;
const app: Application = express();

import signInRouter from './routes/signIn';
import articleRouter from './routes/article';

// Install rateLimiter
app.use(cors());
app.use(urlencoded({ extended: true }));
app.use(express.json());

// ROUTES
app.use('/api/v1', articleRouter);
app.use('/api/v1/auth', signInRouter);

app.listen(port, () => {
  console.log(`[server✨]: server is running on port ${port}`);
});
