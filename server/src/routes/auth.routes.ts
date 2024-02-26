import { Router } from 'express';
import {authController} from '../controllers/authController/auth.controller';

const router = Router();

router.post('/signup', authController.studentSignup);
router.post('/login',authController.studentLogin);

router.post('/instructorSignUp', authController.instructorSignup);
router.post('/instructorLogin',authController.instructorLogin);

router.post('/adminLogin',authController.adminLogin);


export default router;
