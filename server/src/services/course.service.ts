import { getAllCourse } from "../repositories/course.repository";



export const getAllCoursess = async ()=>{
    try {
        let courses = await getAllCourse()
        return courses
    } catch (error) {
        console.log(error); 
    }
}