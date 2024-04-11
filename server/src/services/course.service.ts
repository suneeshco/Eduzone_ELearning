import { getAllCourse, getAllCourseAd} from "../repositories/course.repository";
import { getStudentOrderDetails } from "../repositories/order.repository";



export const getAllCoursess = async (search:any,sort:any,categories:any)=>{
    try {
        let courses = await getAllCourse(search,sort,categories)
        return courses
    } catch (error) {
        console.log(error); 
    }
}



export const getEnrolledCoursess = async (studentId: string)=>{
    try {
        let courses = await getStudentOrderDetails(studentId)
        return courses
    } catch (error) {
        console.log(error); 
    }
}


export const getAllCoursesAdmin = async (search:any)=>{
    try {
        let courses = await getAllCourseAd(search)
        return courses
    } catch (error) {
        console.log(error); 
    }
}