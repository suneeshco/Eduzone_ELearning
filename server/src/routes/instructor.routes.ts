import { Router } from 'express';
import { addCourse , getCourses , getSingleCourse ,addLesson , getLessons} from '../controllers/instructorController/instructorController';

const router = Router();

router.post('/addCourse',addCourse)
router.get('/getCourses/:id',getCourses)
router.get('/getSingleCourse/:id',getSingleCourse)
router.post('/addLesson',addLesson)
router.get('/getLessons/:id',getLessons)


export default router