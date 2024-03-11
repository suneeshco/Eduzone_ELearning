import { Router } from 'express';
import { addCategories, deleteCategories, getCategories, updateCategories , getActiveCategories} from '../controllers/adminController/category.controller';

const router = Router();

router.post('/addCategory',addCategories);
router.get('/categories',getCategories);
router.get('/activeCategories',getActiveCategories);
router.patch('/deleteCategory',deleteCategories)
router.patch('/updateCategory',updateCategories)



export default router;
