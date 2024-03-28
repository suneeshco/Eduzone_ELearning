import { addCourse , getCourse , getSingleCourse , addLesson , getLesson, editCourse  , updateProfile , getLessonDetails , editLesson , deleteLessonByIds } from "../repositories/instructor.repository";
import { findUserById , findInstructorById, instructorUpdateProfile, instructorUpdatePhoto} from "../repositories/user.repository";

export const addCourses = async (data:any)=>{
    try {
        let courseData = await addCourse(data)
        return courseData
    } catch (error) {
        console.log(error);
        
    }
}


export const getCoursess = async (id:any)=>{
    try {
        let courses = await getCourse(id)
        return courses
    } catch (error) {
        console.log(error);
        
    }
}


export const getSingleCoursess = async (id:any)=>{
    try {
        let courses = await getSingleCourse(id)
        return courses
    } catch (error) {
        console.log(error);
        
    }
}


export const addLessons = async (data:any)=>{
    try {
        let lessonData = await addLesson(data)
        return lessonData
    } catch (error) {
        console.log(error);
        
    }
}


export const getLessonss = async (id:any)=>{
    try {
        let lessons = await getLesson(id)
        return lessons
    } catch (error) {
        console.log(error);
        
    }
}


export const editCourses = async (data:any)=>{
    try {
        let courseId = data.courseId
        let courseData = await getSingleCourse(courseId)
        if(!courseData){
            throw new Error("No Course Found")
        }
        let updated = await editCourse(data)
        return updated
    } catch (error) {
        console.log(error);
        
    }
}


export const updateProfiles = async (firstname: string,lastname:string, email: string, mobile:string, id: string)=> {
    try {
      const user = await findUserById(id);
      if (!user) {
        throw new Error('User not exists');
      }
  
     const updatedUser = instructorUpdateProfile(firstname,lastname,email,mobile,id)
      return updatedUser;
    } catch (error) {
      throw error;
    }
  };



  export const getInstructorDetailss = async ( id: string)=> {
    try {
      const user = await findUserById(id);
      if (!user) {
        throw new Error('User not exists');
      }
  
    
    
      return user;
    } catch (error) {
      throw error;
    }
  };


  export const getLessonDetail = async (id:any)=>{
    try {
        let lesson = await getLessonDetails(id)
        return lesson
    } catch (error) {
        console.log(error);
        
    }
}


export const editLessons = async (data:any)=>{
    try {
        let courseId = data.courseId
        
        
        let courseData = await getSingleCourse(courseId)
        console.log(data);
        if(!courseData){
            throw new Error("No Course Found")
        }
        let updated = await editLesson(data)
        return updated
    } catch (error) {
        console.log(error);
        
    }
}



export const deleteLessonById = async (id:any)=>{
    try {
        
        let deleted = await deleteLessonByIds(id)
        return deleted
    } catch (error) {
        console.log(error);
        
    }
}



export const instructorChangeImages = async (photo : string , userId : string)=> {
    try {
      const user = await findUserById(userId);
      if (!user) {
        throw new Error('User not exists');
      }
  
     const updatedUser = instructorUpdatePhoto(photo , userId)
      return updatedUser;
    } catch (error) {
      throw error;
    }
  };