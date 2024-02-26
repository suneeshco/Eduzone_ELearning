import Instructor, { InstructorDocument } from '../models/instructor.model';

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