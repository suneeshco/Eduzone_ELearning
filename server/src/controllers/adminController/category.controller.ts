import { Request, Response } from 'express';
import { addCategory, getCategory, deleteCategory ,updateCategory , getActiveCategory } from '../../services/category.service';


export const addCategories = async(req : Request,res : Response) :  Promise<void> => {
    try {
        const {categoryName} = req.body;
        const status = true
        const category = await addCategory(categoryName) 
        res.send(category)
        
    } catch (error) {
        console.log(error);
        
        res.status(500).json({ message: 'Server Error' });
    }
}


export const getCategories = async(req : Request,res : Response) :  Promise<void> => {
    try {
        
        const categories = await getCategory() 
        res.send(categories)
        
    } catch (error) {
        console.log(error);
        
        res.status(500).json({ message: 'Server Error' });
    }
} 



export const deleteCategories = async(req : Request,res : Response) :  Promise<void> => {
    try {
        const {id} = req.body;
        const deletedcategories:any = await deleteCategory(id) 
        res.send(deletedcategories)
        
    } catch (error) {
        console.log(error);
        
        res.status(500).json({ message: 'Server Error' });
    }
} 



export const updateCategories = async(req : Request,res : Response) :  Promise<void> => {
    try {
        const {value,id} = req.body;
        const categories:any = await updateCategory(value,id) 
        res.send(categories)
        
    } catch (error) {
        console.log(error);
        
        res.status(500).json({ message: 'Server Error' });
    }
}



export const getActiveCategories = async(req : Request,res : Response) :  Promise<void> => {
    try {
        const categories = await getActiveCategory() 
        res.send(categories)
        
    } catch (error) {
        console.log(error);
        
        res.status(500).json({ message: 'Server Error' });
    }
}