import express, { Router } from 'express';
import {
  createArticle,
  getAllAuthors,
  getAllPersonalArticle,
  getAllPublicArticle,
} from '../controllers/article';
import { verifyToken } from '../middleware/verifyToken';

const router: Router = express.Router();

router.route('/article').get(getAllPublicArticle).post(createArticle);

router.route('/article/user_article').get(verifyToken, getAllPersonalArticle);

router.route('/authors').get(getAllAuthors);

export default router;
