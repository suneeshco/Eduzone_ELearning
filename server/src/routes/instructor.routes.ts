import { Router } from 'express';
import { addCourse , getCourses , getSingleCourse ,addLesson , getLessons ,getActiveCategories , editCourse , updateProfile} from '../controllers/instructorController/instructorController';

const router = Router();

router.post('/addCourse',addCourse)
router.get('/getCourses/:id',getCourses)
router.get('/getSingleCourse/:id',getSingleCourse)
router.post('/addLesson',addLesson)
router.get('/getLessons/:id',getLessons)
router.get('/categories',getActiveCategories)
router.put('/editCourse',editCourse)
router.put('/updateProfile',updateProfile)


export default router