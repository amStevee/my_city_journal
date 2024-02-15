import express, { Application, Request, Response } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
dotenv.config();

import signin from './routes/signIn'
const app: Application = express();

app.use(cors())
app.use(express.json())
const port = process.env.PORT || 5000;

// ROUTES
app.use('api/v1/auth', signin)







app.listen(port, () => {
  console.log(`[server✨]: server is running on port ${port}`);
});
