import { RatingDocument } from '../models/ratings.model';
import User,{ UserDocument } from '../models/user.model';
import { updateCourseRating , findProgress, createProgress , getProgress } from '../repositories/course.repository';
import { getLesson } from '../repositories/instructor.repository';
import { courseRating , getMyRating , getAllRating ,calculateOverallRating} from '../repositories/rating.repository';
import { findUserById ,updateProfile , updatePhoto, getAllInstructorList} from '../repositories/user.repository';




export const updateProfiles = async (firstname: string,lastname:string, email: string, mobile:string, id: string)=> {
    try {
      const user = await findUserById(id);
      if (!user) {
        throw new Error('User not exists');
      }
  
     const updatedUser = updateProfile(firstname,lastname,email,mobile,id)
      return updatedUser;
    } catch (error) {
      throw error;
    }
  };


  export const getStudentDetailss = async ( id: string)=> {
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




  export const studentChangeImages = async (photo : string , userId : string)=> {
    try {
      const user = await findUserById(userId);
      if (!user) {
        throw new Error('User not exists');
      }
  
     const updatedUser = updatePhoto(photo , userId)
      return updatedUser;
    } catch (error) {
      throw error;
    }
  };



  export const courseRatings = async ( data : Partial<RatingDocument> )=> {
    try {
      const rating = await courseRating(data);
      
      return rating;
    } catch (error) {
      throw error;
    }
  };

  export const updateOverallRating = async ( courseId:string )=> {
    try {
      const overallRating = await calculateOverallRating(courseId);  
      const updated = await updateCourseRating(courseId,overallRating);    
      return updated;
    } catch (error) {
      throw error;
    }
  };



  export const getMyRatings = async ( courseId:any, studentId:any )=> {
    try {
      
      const rating = await getMyRating(courseId,studentId);
      return rating;
    } catch (error) {
      throw error;
    }
  };


  export const getAllRatings = async ( courseId:any )=> {
    try {
      
      const rating = await getAllRating(courseId);
      return rating;
    } catch (error) {
      throw error;
    }
  };



  export const getInstructors = async (  )=> {
    try {
      
      const instructors = await getAllInstructorList();
      return instructors;
    } catch (error) {
      throw error;
    }
  };

  export const updateProgressLesson = async (studentId:string, courseId:string, lessonId:string)=> {
    try {
      const progress = await findProgress(studentId, courseId, lessonId);
      console.log("progressDoc",progress);
      
let newProgress
      if(progress){
        return progress
      }else{
         newProgress = await createProgress(studentId, courseId, lessonId)
      }
      
      
     
      return newProgress;
    } catch (error) {
      throw error;
    }
  };

  export const getProgresses = async ( courseId:any , studentId : any)=> {
    try {
      let progressCount=0;
      const {count,progress} = await getProgress(courseId,studentId);
      const totalLesson = await getLesson(courseId)
      if(count>0){
        progressCount = (count/totalLesson.length)*100
      }
      return {progressCount,progress};
    } catch (error) {
      throw error;
    }
  };