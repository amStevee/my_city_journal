import dotenv from 'dotenv';
import express, { Application, urlencoded } from 'express';
import cors from 'cors';
import { rateLimit } from 'express-rate-limit';
dotenv.config();

const port = process.env.PORT || 5000;
const app: Application = express();
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  limit: 100,
  standardHeaders: 'draft-7',
  legacyHeaders: false, // Disable the `X-RateLimit-*` headers.
});

import signInRouter from './routes/signIn';
import articleRouter from './routes/article';

app.use(limiter)
app.use(cors());
app.use(urlencoded({ extended: true }));
app.use(express.json());

// ROUTES
app.use('/api/v1', articleRouter);
app.use('/api/v1/auth', signInRouter);

app.listen(port, () => {
  console.log(`[server✨]: server is running on port ${port}`);
});
