import { getAllCourse, getAllCourseAd, getValidCourses} from "../repositories/course.repository";
import { getStudentOrderDetails } from "../repositories/order.repository";
import { getAllRatingCount } from "../repositories/rating.repository";
import { getAllInstructorList } from "../repositories/user.repository";



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



export const getOverviews = async ()=>{
    try {
        let courses = await getValidCourses()
        let instructors = await getAllInstructorList()
        let instructor = instructors.length
        let reviews = await getAllRatingCount()
        return {courses,instructor,reviews}
    } catch (error) {
        console.log(error); 
    }
}