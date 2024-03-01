import express from 'express';
import { login, register } from '../controllers/signIn';
import { getAllAuthors } from '../controllers/article';

const router = express.Router();

router.route('/authors').get(getAllAuthors)
router.route('/register').post(register);
router.route('/login').post(login);

export default router;
