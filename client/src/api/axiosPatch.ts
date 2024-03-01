import { apiInstance } from "./config/axiosConfig";


export const deleteCategories = async (id:string) =>{
    try {
        console.log(id);
        
        return await apiInstance.patch('/admin/deleteCategory',{id})
    } catch (error) {
        throw error
    }
}