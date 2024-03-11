import Course , {CourseDocument}  from '../models/course.model';

export const getAllCourse = async (): Promise<CourseDocument[]> => {
    try {
      return await Course.find({}).populate('instructorId');
    } catch (error) {
      throw error;
    }
  }