import { createCategory,findCategoryByName, getCategories, findCategoryById , getActiveCategories ,findCategoryByIdAndUpdate } from "../repositories/category.repository";




export const addCategory = async(categoryName : string)=>{
    try {
        let status = true
        let existCategory = await findCategoryByName(categoryName);
        
        if(existCategory){
            return "Category exists"
        }
        const category = await createCategory({categoryName , status})
        return category
    } catch (error) {
        throw error
    }
}


export const getCategory = async ()=>{
    try {
        let categories = await getCategories()
        return categories
    } catch (error) {
        throw error
    }
}


export const deleteCategory = async (id:string)=>{
    try {
        let categories:any = await findCategoryById(id);
        
        return categories
    } catch (error) {
        throw error
    }
}


export const getActiveCategory = async ()=>{
    try {
        let categories = await getActiveCategories()
        return categories
    } catch (error) {
        throw error
    }
}



export const updateCategory = async (value:string,id:string)=>{
    try {
        let existCategory = await findCategoryByName(value);
        if(existCategory){
            return "Category exists"
        }
        let categories:any = await findCategoryByIdAndUpdate(value,id);
        
        return categories
    } catch (error) {
        throw error
    }
}