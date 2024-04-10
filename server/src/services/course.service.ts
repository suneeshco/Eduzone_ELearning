import { getAllCourse, getEnrolledCourses} from "../repositories/course.repository";



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
        let courses = await getEnrolledCourses(studentId)
        return courses
    } catch (error) {
        console.log(error); 
    }
}