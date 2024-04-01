import { getStudentList , changeStudentStatus } from "../repositories/user.repository"
import {   changeInstructorStatus } from "../repositories/instructor.repository"
import { getInstructorList } from "../repositories/user.repository"


export const getStudentLists = async (search:any)=>{
    try {
        let students = await getStudentList(search)
        return students
    } catch (error) {
        throw error
    }
}


export const changeStudentStatuss = async (id:string)=>{
    try {
        let data:any = await changeStudentStatus(id);
        
        return data
    } catch (error) {
        throw error
    }
}

export const getInstructorLists = async (search:any)=>{
    try {
        let instructors = await getInstructorList(search)
        return instructors
    } catch (error) {
        throw error
    }
}


export const changeInstructorStatuss = async (id:string)=>{
    try {
        let data:any = await changeInstructorStatus(id);
        
        return data
    } catch (error) {
        throw error
    }
}