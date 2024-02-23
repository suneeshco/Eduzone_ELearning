import { Router } from 'express';
import {authController} from '../controllers/auth.controller';

const router = Router();

router.post('/signup', authController.studentSignup);
router.post('/login',authController.studentLogin);

export default router;
