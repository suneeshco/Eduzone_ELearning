import { apiInstance } from "./config/axiosConfig";


export const getCategories = async () =>{
    try {
        return await apiInstance.get('/admin/categories')
    } catch (error) {
        throw error
    }
}