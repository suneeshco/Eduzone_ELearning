import { apiInstance } from "./config/axiosConfig";


export const getCategories = async () =>{
    try {
        return await apiInstance.get('/admin/categories')
    } catch (error) {
        throw error
    }
}

export const getCourses = async (id:string | undefined) => {
    try {
        return await apiInstance.get(`/instructor/getCourses/${id}`)
    } catch (error) {
        throw error
    }
}



export const getSingleCourse = async (id:string | undefined) => {
    try {
        return await apiInstance.get(`/instructor/getSingleCourse/${id}`)
    } catch (error) {
        throw error
    }
}


export const getLessons = async (id:string | undefined) => {
    try {
        return await apiInstance.get(`/instructor/getLessons/${id}`)
    } catch (error) {
        throw error
    }
}