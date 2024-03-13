import { Router } from 'express';
import { addCategories, deleteCategories, getCategories, updateCategories , getActiveCategories} from '../controllers/adminController/category.controller';
import { getStudentList , changeStudentStatus } from '../controllers/adminController/student.controller';
import { getInstructorList } from '../controllers/adminController/instructor.controller';
import { changeInstructorStatus } from '../controllers/adminController/instructor.controller';

const router = Router();

router.post('/addCategory',addCategories);
router.get('/categories',getCategories);
router.get('/activeCategories',getActiveCategories);
router.patch('/deleteCategory',deleteCategories)
router.patch('/updateCategory',updateCategories)
router.get('/getStudentList',getStudentList);
router.patch('/changeStudentStatus', changeStudentStatus)
router.get('/getInstructorList',getInstructorList)
router.patch('/changeInstructorStatus', changeInstructorStatus)



export default router;
