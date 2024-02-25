import express, { Router } from 'express';
import {
  createArticle,
  filterArticlesByLocation,
  getAllAuthors,
  getAllPersonalArticle,
  getAllPublicArticle,
} from '../controllers/article';
import { verifyToken } from '../middleware/verifyToken';

const router: Router = express.Router();

router.route('/article').get(getAllPublicArticle).post(verifyToken, createArticle);

router.route('/article/user_article').get(verifyToken, getAllPersonalArticle);

router.route('/article/search').get(filterArticlesByLocation)

router.route('/authors').get(getAllAuthors);

export default router;
