import { Router } from 'express';
import { getAllCourses ,updateProfile , getStudentDetails , studentChangeImage , stripePayment ,createOrders, getEnrolledCourses , courseRating ,getMyRating , getAllRating , getInstructorListForStudent, videoPlay , updateProgress , getProgress , generateCertificates , getOverview} from '../controllers/studentController/studentController';
import { authenticateUser, studentAuth } from '../middlewares/auth.middleware';
import { getLessons, getSingleCourse } from '../controllers/instructorController/instructorController';
import { authController } from '../controllers/authController/auth.controller';


const router = Router();

router.get('/getAllCourses',getAllCourses);
router.get('/getSingleCourse/:id',getSingleCourse)
router.get('/getLessons/:id',getLessons)
router.put('/updateProfile',studentAuth,updateProfile)
router.get('/getStudentDetails/:id',getStudentDetails)
router.patch('/studentChangeImage',studentAuth,studentChangeImage)
router.post('/stripe/create-checkout-session',studentAuth, stripePayment);
router.get('/getEnrolledCourses/:id',studentAuth,getEnrolledCourses)
router.post('/courseRating',studentAuth,courseRating)
router.get('/getMyRating',studentAuth,getMyRating)
router.get('/getAllRating',getAllRating)
router.post('/createOrder',studentAuth,createOrders)
router.get('/getInstructorList',getInstructorListForStudent)
// router.get('/video', authenticateUser )
router.post('/updateProgress',studentAuth,updateProgress)
router.get('/getProgress',studentAuth,getProgress)
router.get('/video',authenticateUser,videoPlay)
router.post('/generateCertificate',studentAuth,generateCertificates)
router.get('/getOverview',getOverview)
router.patch('/changePassword',studentAuth,authController.studentChangePassword)

export default router;
