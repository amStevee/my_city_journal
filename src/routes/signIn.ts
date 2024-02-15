import express from 'express'
import { login, register } from '../controllers/register'
import { verifyToken } from '../middleware/verifyToken';

const router = express.Router();

router.route('/').post(register).post(login)

export default router