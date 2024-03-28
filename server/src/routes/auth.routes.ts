import { Router } from 'express';
import {authController} from '../controllers/authController/auth.controller';
import { userOtpExpiration } from '../middlewares/auth.middleware';

const router = Router();

router.post('/signup', authController.studentSignup);
router.post('/login',authController.studentLogin);
router.post('/studentForgot',authController.studentForgot);
router.patch('/studentResetPassword', authController.studentResetPassword)
router.post('/google/register', authController.googleRegister);
router.post('/google/login', authController.googleLogin);
router.post('/studentOtp',userOtpExpiration,authController.verifyOtp)
router.get('/studentResendOtp',authController.ResendOtp)


// router.post('/instructorSignUp', authController.instructorSignup);
// router.post('/instructorLogin',authController.instructorLogin);

router.post('/adminLogin',authController.adminLogin);


export default router;
