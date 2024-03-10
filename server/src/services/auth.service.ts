import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import crypto from 'crypto'
import { createUser, findUserByEmail, findUserById } from '../repositories/user.repository';
import {createInstructor,findInstructorByEmail} from '../repositories/instructor.repository';
import { findAdminByEmail } from '../repositories/admin.repository';
import { UserDocument } from '../models/user.model';
import { InstructorDocument } from '../models/instructor.model';
import { AdminDocument } from '../models/admin.model';
import { createToken, findToken } from '../repositories/token.repository';
import nodemailer from 'nodemailer';


const randomToken = () => {
  return crypto.randomBytes(48).toString('hex');
 }

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



export const sendForgotRequest = async (email:string) =>{
  try {
      const user = await findUserByEmail(email);
      
      if (!user) {
        throw new Error('User not found'); 
      }

      const randToken = randomToken()
  
      const createTok = await createToken({userId:user._id,token:randToken})
      
      const link = `${process.env.BASE_URL}/student/password-reset/${user._id}/${createTok.token}`;



      const transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 587,
        secure: false,
        requireTLS: true,
        auth: {
            user: process.env.USER_NAME,
            pass: process.env.USER_PASSWORD
        }
    });
    const mailOptions = {
        from: process.env.USER_NAME,
        to: email,
        subject: "Reset Password",
        text: `We have recieved your request for reset password. Click ${link} to reset your password.`
    };
    transporter.sendMail(mailOptions, function (err, info) {
        if (err) {
            console.error("Error sending email: ", err);
            throw new Error('Error sending mail')
        } else {
            console.log("Email sent: " + info.response);
            return "Reset link is sent to your email";
        }
      })

    } catch (error) {
      throw error;
    }
}





export const studentResetPass = async (userId:string , token : string , password : string) =>{
  try {
      const user = await findUserById(userId);
      
      if (!user) {
        throw new Error('User not found'); 
      }

      const getToken = await findToken(userId,token)

      if (!token) {
        throw new Error('User not found'); 
      }

      const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

      if(user && getToken){
        user.password=hashedPassword
        await user.save();
        await getToken?.deleteOne();
      }

      return user

    } catch (error) {
      throw error;
    }
}
