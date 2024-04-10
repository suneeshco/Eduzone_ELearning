import { Router } from 'express';
import { getAllCourses ,updateProfile , getStudentDetails , studentChangeImage , stripePayment ,createOrders, getEnrolledCourses , courseRating ,getMyRating , getAllRating} from '../controllers/studentController/studentController';
import { studentAuth } from '../middlewares/auth.middleware';
import { getLessons, getSingleCourse } from '../controllers/instructorController/instructorController';


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

export default router;
