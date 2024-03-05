import { Router } from 'express';
import { addCategories, deleteCategories, getCategories, updateCategories } from '../controllers/adminController/category.controller';

const router = Router();

router.post('/addCategory',addCategories);
router.get('/categories',getCategories);
router.patch('/deleteCategory',deleteCategories)
router.patch('/updateCategory',updateCategories)



export default router;
