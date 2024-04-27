import Course, { CourseDocument } from '../models/course.model';
import StudentProgress , { StudentProgressDocument } from '../models/studentProgress.model';
import  Category  from '../models/category.model';

export const getAllCourse = async (search: any, sort: any, categories: any): Promise<CourseDocument[]> => {
  try {
    let query: any = {isApproved: true};
    if (search && search.trim() !== '') {
      const searchRegex = new RegExp(search.trim(), 'i');
      query = { ...query, courseName: searchRegex };
    }

    let sortCriteria: any = {};
    if (sort === '1') {
      sortCriteria = { ...sortCriteria, courseFee: 1 };
    } else if (sort === '-1') {
      sortCriteria = { ...sortCriteria, courseFee: -1 };
    }else if (sort === 'rating') {
      sortCriteria = { ...sortCriteria, rating:-1 };
    }

    let activeCategories = await Category.find({ status: true }).distinct('_id');

    if (categories && categories.length > 0) {
      let categ = categories.split(',')
      query = { ...query, category: { $in: categ } }; 
    }else{
      let cate = activeCategories
      query = { ...query, category: { $in: cate } };
    }

    return await Course.find(query).populate('instructorId').sort(sortCriteria);
  } catch (error) {
    throw error;
  }
};







export const updateCourseRating = async (courseId: string, rating : number): Promise<CourseDocument | null> => {
  try {
    const updatedCourse = await Course.findByIdAndUpdate(courseId, { rating: rating });
    if (updatedCourse) {
      return updatedCourse; 
    } else {
      throw new Error(`Course with ID ${courseId} not found`);
    }
  } catch (error) {
    throw error;
  }
};



export const getAllCourseAd = async (search: any): Promise<CourseDocument[]> => {
  try {
    let query: any = {};
    if (search && search.trim() !== '') {
      const searchRegex = new RegExp(search.trim(), 'i');
      query = { ...query, courseName: searchRegex };
    }
    return await Course.find(query).populate('instructorId').sort({createdAt:-1});
  } catch (error) {
    throw error;
  }
};


export const changeCourseStatus = async (id: string) => {
  try {
     const course = await Course.findOne({ _id: id });
     if (!course) {
       throw new Error('Course not found'); 
     }
     course.isApproved = !course.isApproved
     await course.save();
     return course;
  } catch (error) {
     throw error; 
  }
 };


 export const findProgress = async (studentId:string, courseId:string, lessonId:string) => {
  try {
     const course = await StudentProgress.findOne({ studentId:studentId , courseId:courseId,lessonId :lessonId });
     return course;
  } catch (error) {
     throw error; 
  }
 };

 export const createProgress = async (studentId:string, courseId:string, lessonId:string) => {
  try {
     
     const progress = await StudentProgress.create({
      studentId ,
      courseId,
      lessonId ,
      isCompleted : true
    });
    await progress.save();
     return progress;
  } catch (error) {
     throw error; 
  }
 };


 export const getProgress = async (courseId:string, studentId:string) => {
  try {
    const count = await StudentProgress.countDocuments({ courseId, studentId, isCompleted: true });
    const progress = await StudentProgress.find({ courseId, studentId, isCompleted: true });
    return {count,progress};
  } catch (error) {
     throw error; 
  }
 };


 export const getValidCourses = async () => {
  try {
    const approvedCoursesCount = await Course.countDocuments({ isApproved: true });
    return approvedCoursesCount
  } catch (error) {
    throw error;
  }
};

