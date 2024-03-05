import { apiInstance } from "./config/axiosConfig";


export const deleteCategories = async (id:string) =>{
    try {
        console.log(id);
        
        return await apiInstance.patch('/admin/deleteCategory',{id})
    } catch (error) {
        throw error
    }
}


export const updateCategories = async (value:string,id:string|null) =>{
    try {
        console.log(id);
        
        return await apiInstance.patch('/admin/updateCategory',{value,id})
    } catch (error) {
        throw error
    }
}