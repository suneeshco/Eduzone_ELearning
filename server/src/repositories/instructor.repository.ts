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
