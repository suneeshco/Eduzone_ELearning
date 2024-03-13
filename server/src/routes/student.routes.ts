import { Router } from 'express';
import { getAllCourses ,updateProfile} from '../controllers/studentController/studentController';

const router = Router();

router.get('/getAllCourses',getAllCourses);
router.put('/updateProfile',updateProfile)

export default router;
