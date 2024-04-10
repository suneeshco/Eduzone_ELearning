import { Router } from 'express';
import { addCourse , getCourses , getSingleCourse ,addLesson , getLessons ,getActiveCategories , editCourse , updateProfile, getInstructorDetails , getLessonDetails , editLesson , deleteLesson , instructorChangeImage } from '../controllers/instructorController/instructorController';
import { instructorAuth } from '../middlewares/auth.middleware';
import { getOrderDetails } from '../controllers/orderController/orderController';

const router = Router();

router.post('/addCourse',instructorAuth,addCourse)
router.get('/getCourses/:id',instructorAuth,getCourses)
router.get('/getSingleCourse/:id',instructorAuth,getSingleCourse)
router.post('/addLesson',instructorAuth,addLesson)
router.get('/getLessons/:id',instructorAuth,getLessons)
router.get('/categories',instructorAuth,getActiveCategories)
router.put('/editCourse',instructorAuth,editCourse)
router.put('/updateProfile',instructorAuth,updateProfile)
router.get('/getInstructorDetails/:id',getInstructorDetails)
router.get('/getLessonDetails/:id',instructorAuth,getLessonDetails)
router.put('/editLesson',instructorAuth,editLesson)
router.delete('/deleteLesson/:id', instructorAuth,deleteLesson)
router.patch('/instructorChangeImage',instructorAuth,instructorChangeImage)
router.get('/getOrderDetails',instructorAuth,getOrderDetails)


export default router