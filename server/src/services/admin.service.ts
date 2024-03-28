import { getStudentList , changeStudentStatus } from "../repositories/user.repository"
import {   changeInstructorStatus } from "../repositories/instructor.repository"
import { getInstructorList } from "../repositories/user.repository"


export const getStudentLists = async ()=>{
    try {
        let students = await getStudentList()
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

export const getInstructorLists = async ()=>{
    try {
        let instructors = await getInstructorList()
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