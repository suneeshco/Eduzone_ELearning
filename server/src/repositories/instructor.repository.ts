import Instructor, { InstructorDocument } from '../models/instructor.model';
import Course , {CourseDocument}  from '../models/course.model';
import Lesson , {LessonDocument} from '../models/lesson.model';

export const createInstructor = async (instructorData: Partial<InstructorDocument>): Promise<InstructorDocument> => {
  try {
    return await Instructor.create(instructorData);
  } catch (error) {
    throw error;
  }
};

export const findInstructorByEmail = async (email: string): Promise<InstructorDocument | null> => {
  try {
    return await Instructor.findOne({ email });
  } catch (error) {
    throw error;
  }
};


export const addCourse = async (course: Partial<CourseDocument>): Promise<CourseDocument> => {
  try {
    return await Course.create(course);
  } catch (error) {
    throw error;
  }
}


export const getCourse = async (id: Partial<CourseDocument>): Promise<CourseDocument[]> => {
  try {
    return await Course.find({instructorId : id});
  } catch (error) {
    throw error;
  }
}



export const getSingleCourse = async (id: Partial<CourseDocument>): Promise<CourseDocument | null> => {
  try {
    return await Course.findOne({_id : id});
  } catch (error) {
    throw error;
  }
}


export const addLesson = async (course: Partial<LessonDocument>): Promise<LessonDocument> => {
  try {
    return await Lesson.create(course);
  } catch (error) {
    throw error;
  }
}


export const getLesson = async (id: Partial<LessonDocument>): Promise<LessonDocument[]> => {
  try {
    return await Lesson.find({courseId : id});
  } catch (error) {
    throw error;
  }
}



export const editCourse = async ({ courseId, courseName, courseDuration, courseFee, courseDescription, category, imageUrl }:any) => {
  try {
    const updatedCourse = await Course.findByIdAndUpdate(courseId, {
      courseName,
      courseDuration,
      courseFee,
      courseDescription,
      category,
      imageUrl
    }, { new: true });

    return updatedCourse
  } catch (error) {
    throw error;
  }
}


export const findInstructorById = async (id: string): Promise<InstructorDocument | null> => {
  try {
    return await Instructor.findOne({ _id : id });
  } catch (error) {
    throw error;
  }
};


export const updateProfile = async (firstname:any,lastname:any,email:any,mobile :any,id: string) => {
  try {
    const updatedProfile = await Instructor.findByIdAndUpdate(id, {
      firstname,
      lastname,
      email,
      mobile
    }, { new: true });
    return updatedProfile
  } catch (error) {
    throw error;
  }
};



export const getInstructorList = async () =>{
  try {
    const instructors = await Instructor.find({})
    return instructors
  } catch (error) {
    throw error
  }
}


export const changeInstructorStatus = async (id: string) => {
  try {
     const instructor = await Instructor.findOne({ _id: id });
     if (!instructor) {
       throw new Error('Student not found'); 
     }
     instructor.status = !instructor.status
     await instructor.save();
     return instructor;
  } catch (error) {
     throw error; 
  }
 };