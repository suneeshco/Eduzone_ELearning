import { Router } from 'express';
import { getAllCourses } from '../controllers/studentController/studentController';

const router = Router();

router.get('/getAllCourses',getAllCourses);

export default router;
