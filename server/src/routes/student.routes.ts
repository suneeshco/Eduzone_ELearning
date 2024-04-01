import { Router } from 'express';
import { getAllCourses ,updateProfile , getStudentDetails , studentChangeImage} from '../controllers/studentController/studentController';
import { studentAuth } from '../middlewares/auth.middleware';
import { getLessons, getSingleCourse } from '../controllers/instructorController/instructorController';

const router = Router();

router.get('/getAllCourses',getAllCourses);
router.get('/getSingleCourse/:id',getSingleCourse)
router.get('/getLessons/:id',getLessons)
router.put('/updateProfile',studentAuth,updateProfile)
router.get('/getStudentDetails/:id',getStudentDetails)
router.patch('/studentChangeImage',studentAuth,studentChangeImage)

export default router;
