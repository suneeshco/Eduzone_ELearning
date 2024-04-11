import { Router } from 'express';
import { addCategories, deleteCategories, getCategories, updateCategories , getActiveCategories} from '../controllers/adminController/category.controller';
import { getStudentList , changeStudentStatus } from '../controllers/adminController/student.controller';
import { getInstructorList } from '../controllers/adminController/instructor.controller';
import { changeInstructorStatus } from '../controllers/adminController/instructor.controller';
import { adminAuth, studentAuth } from '../middlewares/auth.middleware';
import {  getLessons, getSingleCourse } from '../controllers/instructorController/instructorController';
import { getAllCoursesAd , changeCourseStatus } from '../controllers/adminController/course.controller';

const router = Router();

router.post('/addCategory',adminAuth,addCategories);
router.get('/categories',adminAuth,getCategories);
router.get('/activeCategories',getActiveCategories);
router.patch('/deleteCategory',adminAuth,deleteCategories)
router.patch('/updateCategory',adminAuth,updateCategories)
router.get('/getStudentList',adminAuth,getStudentList);
router.patch('/changeStudentStatus',adminAuth, changeStudentStatus)
router.patch('/changeCourseStatus',adminAuth, changeCourseStatus)
router.get('/getInstructorList',adminAuth,getInstructorList)
router.patch('/changeInstructorStatus',adminAuth, changeInstructorStatus)
router.get('/getLessons/:id', adminAuth , getLessons )
router.get('/getSingleCourse/:id',adminAuth , getSingleCourse)
router.get('/getAllCourses',getAllCoursesAd)



export default router;
