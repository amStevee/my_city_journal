import express, { Router } from 'express';
import {
  createArticle,
  createComment,
  deleteArticle,
  deleteComment,
  filterArticlesByLocation,
  getAllAuthors,
  getAllPersonalArticle,
  getAllPublicArticle,
  updateComment,
  updateDescription,
} from '../controllers/article';
import { verifyToken } from '../middleware/verifyToken';
import { verifyUser } from '../middleware/verifyUser';

const router: Router = express.Router();

router.route('/articles').get(getAllPublicArticle);

router.route('/articles/:uxr').post(verifyToken, createArticle);

router
  .route('/articles/:uxr/article/update/:artc')
  .put(verifyToken, verifyUser, updateDescription);

router
  .route('/articles/user_article/:uxr')
  .get(verifyToken, getAllPersonalArticle);

router.route('/articles/search').get(filterArticlesByLocation);

router.route('/articles/:uxr/article/:artc').delete(verifyToken, deleteArticle);

// COMMENT ROUTES
router.route('/articles/:uxr/article/:artc').post(createComment);

router
  .route('/articles/:uxr/article/:artc/:cmt')
  .delete(deleteComment)
  .put(updateComment);

// This route is for test purpose (user should be Admin)
router.route('admin/authors').get(getAllAuthors);

export default router;
