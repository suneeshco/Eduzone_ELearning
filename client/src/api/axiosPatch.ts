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

export const resetPassword = async (userId :string | undefined , token : string | undefined , password : string) =>{
    try {
        
        
        return await apiInstance.patch('/auth/studentResetPassword',{userId,token,password})
    } catch (error) {
        throw error
    }
}