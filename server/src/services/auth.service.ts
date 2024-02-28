import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { createUser, findUserByEmail } from '../repositories/user.repository';
import {createInstructor,findInstructorByEmail} from '../repositories/instructor.repository';
import { findAdminByEmail } from '../repositories/admin.repository';
import { UserDocument } from '../models/user.model';
import { InstructorDocument } from '../models/instructor.model';
import { AdminDocument } from '../models/admin.model';

export const signup = async (firstname: string,lastname:string, email: string, mobile:string, password: string): Promise<UserDocument | string> => {
  try {
    const existingUser = await findUserByEmail(email);
    if (existingUser) {
      throw new Error('User already exists');
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = await createUser({ firstname, lastname, email, mobile, password: hashedPassword });

    const token = jwt.sign({ _id: newUser._id }, process.env.TOKEN_SECRET!);
    return newUser;
  } catch (error) {
    throw error;
  }
};


export const login = async (email:string , password : string): Promise<UserDocument | string> =>{
    try {
        const existingUser = await findUserByEmail(email);
        if (!existingUser) {
          throw new Error('User not exists');
        }
    
        const passwordMatch = await bcrypt.compare( password, existingUser.password);

        if (!passwordMatch) {
        throw new Error('Incorrect password');
        }

        // If the password matches, generate and return a JWT token
        const token = jwt.sign({ _id: existingUser._id }, process.env.TOKEN_SECRET!);
        return existingUser;
      } catch (error) {
        throw error;
      }
}






export const instructorSignup = async (firstname: string,lastname:string, email: string, mobile:number, password: string): Promise<InstructorDocument | string> => {
  try {
    const existingUser = await findInstructorByEmail(email);
    if (existingUser) {
      throw new Error('Instructor already exists');
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = await createInstructor({ firstname, lastname, email, mobile, password: hashedPassword });
    
    

    const token = jwt.sign({ _id: newUser._id }, process.env.INSTRUCTOR_SECRET!);
    return newUser;
  } catch (error) {
    throw error;
  }
};


export const instructorLogin = async (email:string , password : string): Promise<InstructorDocument|string> =>{
    try {
        const existingUser = await findInstructorByEmail(email);
        if (!existingUser) {
          throw new Error('Instructor not exists'); 
        }
    
        const passwordMatch = await bcrypt.compare( password, existingUser.password);

        if (!passwordMatch) {
        throw new Error('Incorrect password');
        }

        // If the password matches, generate and return a JWT token
        const token = jwt.sign({ _id: existingUser._id }, process.env.INSTRUCTOR_SECRET!);
        return existingUser;
      } catch (error) {
        throw error;
      }
}



export const adminLogin = async (email:string , password : string): Promise< AdminDocument | string> =>{
  try {
      const existingUser = await findAdminByEmail(email);
      
      if (!existingUser) {
        throw new Error('Admin not exists'); 
      }
  
      const passwordMatch = await bcrypt.compare( password, existingUser.password);

      if (!passwordMatch) {
      throw new Error('Incorrect password');
      }

      // If the password matches, generate and return a JWT token
      const token = jwt.sign({ _id: existingUser._id }, process.env.ADMIN_SECRET!);
      return existingUser;
    } catch (error) {
      throw error;
    }
}
