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

export const getInstructorCategories = async () =>{
    try {
        return await apiInstance.get('/instructor/categories')
    } catch (error) {
        throw error
    }
}



export const getCategoriesForStudent = async () =>{
    try {
        return await apiInstance.get('/admin/activeCategories')
    } catch (error) {
        throw error
    }
}


export const getAllCourses = async () => {
    try {
        return await apiInstance.get(`/student/getAllCourses`)
    } catch (error) {
        throw error
    }
}


export const getStudentList = async () => {
    try {
        return await apiInstance.get(`/admin/getStudentList`)
    } catch (error) {
        throw error
    }
}