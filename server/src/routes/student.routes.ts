import { Router } from 'express';
import { getAllCourses ,updateProfile , getStudentDetails} from '../controllers/studentController/studentController';
import { studentAuth } from '../middlewares/auth.middleware';

const router = Router();

router.get('/getAllCourses',getAllCourses);
router.put('/updateProfile',studentAuth,updateProfile)
router.get('/getStudentDetails/:id',getStudentDetails)

export default router;
