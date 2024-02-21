import express, { Router } from 'express';
import { getAllAuthors } from '../controllers/authors';

const router: Router = express.Router();

router.route('/').get(getAllAuthors);

export default router;
