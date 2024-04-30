import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import crypto from 'crypto'
import { createUser, findUserByEmail, findUserById } from '../repositories/user.repository';
// import {findInstructorByEmail} from '../repositories/instructor.repository';
import { findAdminByEmail } from '../repositories/admin.repository';
import { UserDocument } from '../models/user.model';
import { InstructorDocument } from '../models/instructor.model';
import { AdminDocument } from '../models/admin.model';
import { createToken, findToken } from '../repositories/token.repository';
import nodemailer from 'nodemailer';


export interface LoginResponse {
  user: UserDocument|InstructorDocument|AdminDocument;
  token: string;
}

interface ErrorResponse {
  error: string;
 }
 


const randomToken = () => {
  return crypto.randomBytes(48).toString('hex');
 }



 function generateRandomPassword(length:number) {
  const charset = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()';
  let password = '';
  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * charset.length);
    password += charset[randomIndex];
  }
  return password;
}



export const signup = async (firstname: string,lastname:string, email: string, mobile:string, password: string , role : string): Promise<UserDocument | string> => {
  try {
    

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = await createUser({ firstname, lastname, email, mobile, password: hashedPassword , role });

    const token = jwt.sign({ _id: newUser._id }, process.env.TOKEN_SECRET!);
    return newUser;
  } catch (error) {
    throw error;
  }
};


export const login = async (email:string , password : string): Promise<LoginResponse | ErrorResponse> =>{
    try {
        const existingUser = await findUserByEmail(email);

        
        if (!existingUser) {
          return { error: 'User Not Exists' };
        }
    
        const passwordMatch = await bcrypt.compare( password, existingUser.password);

        if (!passwordMatch) {
          return { error: 'Incorrect Password' };
        }

        


        if(!existingUser?.status){
          console.log(existingUser?.status);
          
          return { error: 'User Blocked' };
        }

       
        const token = jwt.sign({ _id: existingUser._id , role: existingUser.role }, process.env.TOKEN_SECRET!);
        
        return {user:existingUser,token:token};
      } catch (error) {
        throw error;
      }
}






// export const instructorSignup = async (firstname: string,lastname:string, email: string, mobile:string, password: string , role : string): Promise<InstructorDocument | string> => {
//   try {
//     const existingUser = await findInstructorByEmail(email);
//     if (existingUser) {
//       throw new Error('Instructor already exists');
//     }

//     const salt = await bcrypt.genSalt(10);
//     const hashedPassword = await bcrypt.hash(password, salt);

//     const newUser = await createInstructor({ firstname, lastname, email, mobile, password: hashedPassword , role});
    
    

//     const token = jwt.sign({ _id: newUser._id }, process.env.INSTRUCTOR_SECRET!);
//     return newUser;
//   } catch (error) {
//     throw error;
//   }
// };


// export const instructorLogin = async (email:string , password : string): Promise<LoginResponse | ErrorResponse> =>{
//     try {
      
      
//         const existingUser = await findInstructorByEmail(email);
//         if (!existingUser) {
//           return { error: 'Instructor Not Exists' };
//         }
    
//         const passwordMatch = await bcrypt.compare( password, existingUser.password);

//         if (!passwordMatch) {
//           return { error: 'Incorrect Password' };
//         }

//         if(!existingUser?.status){
//           console.log(existingUser?.status);
          
//           return { error: 'Instructor Blocked' };
//         }

       
//         const token = jwt.sign({ _id: existingUser._id , role : existingUser.role}, process.env.TOKEN_SECRET!);
//         return {user:existingUser,token:token};
//       } catch (error) {
//         throw error;
//       }
// }



export const adminLogin = async (email:string , password : string): Promise< LoginResponse | ErrorResponse > =>{
  try {
      const existingUser = await findAdminByEmail(email);
      
      if (!existingUser) {
        return { error: 'Incorrect Username' }; 
      }
  
      const passwordMatch = await bcrypt.compare( password, existingUser.password);

      if (!passwordMatch) {
        return { error: 'Incorrect Password' };
      }

     
      const token = jwt.sign({ _id: existingUser._id }, process.env.ADMIN_SECRET!);
      return {user:existingUser,token:token};
    } catch (error) {
      throw error;
    }
}



export const sendForgotRequest = async (email:string) =>{
  try {
      const user = await findUserByEmail(email);
      
      if (!user) {
        return { error: 'User Not Found' }; 
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
    const info = await transporter.sendMail(mailOptions);

    console.log("Email sent: " + info.response);
    
    return { success: "Email sent successfully" };

    } catch (error) {
      throw error;
    }
}





export const studentResetPass = async (userId:string , token : string , password : string) =>{
  try {
      const user = await findUserById(userId);
      
      if (!user) {
        return { error: 'User Not Found' }; 
      }

      const getToken = await findToken(userId,token)

      if (!token) {
        return { error: 'User Not Found' }; 
      }

      const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

      if(user && getToken){
        user.password=hashedPassword
        await user.save();
        await getToken?.deleteOne();
      }

      return {user:user}

    } catch (error) {
      throw error;
    }
}




export const googleSignup=async(email:string ,password:string, name:string , role : string): Promise<object> => {
  try {
    
    
    const existingUser = await findUserByEmail(email);
    console.log(existingUser);
    if (existingUser) {
      return { error: 'User Already Exists' };
    }


    let newPassword = generateRandomPassword(12)
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(newPassword, salt);


    const isActive:boolean = true;
    const newUser = await createUser({ firstname :name, lastname:"", email:email, mobile:"", password: hashedPassword , role : role});

   
    const token = jwt.sign({ _id: newUser._id }, process.env.TOKEN_SECRET!);
    // if(newUser){
      
    //     console.log(newPassword);
        

    //     const transporter = nodemailer.createTransport({
    //         host: "smtp.gmail.com",
    //         port: 587,
    //         secure: false,
    //         requireTLS: true,
    //         auth: {
    //             user: process.env.USER_NAME,
    //             pass: process.env.USER_PASSWORD
    //         }
    //     });
    //     const mailOptions = {
    //         from: process.env.USER_NAME,
    //         to: newUser.email,
    //         subject: "Verification Code",
    //         text: `Thank you for creating account. Your Password Is ${newPassword}`
    //     };
    //     const info = await transporter.sendMail(mailOptions);
    //     console.log("Email sent: " + info.response);
        
    
    // }
    return {token:token,user:newUser};
  } catch (error) {
    throw error;
  }
};




export const googleLogin = async (email:string , password : string): Promise<LoginResponse | ErrorResponse> =>{
  try {
      const existingUser = await findUserByEmail(email);

      
      if (!existingUser) {
        return { error: 'User Not Exists' };
      }

      if(!existingUser?.status){
        console.log(existingUser?.status);
        
        return { error: 'User Blocked' };
      }

     
      const token = jwt.sign({ _id: existingUser._id,role:existingUser.role }, process.env.TOKEN_SECRET!);
      
      return {user:existingUser,token:token};
    } catch (error) {
      throw error;
    }
}



export const changePasswords = async (userId:string , oldPassword : string , password : string) =>{
  try {
      const user = await findUserById(userId);
      
      if (!user) {
        return { error: 'User Not Found' }; 
      }

      const passwordMatch = await bcrypt.compare(oldPassword, user.password)

      if(!passwordMatch){
        return { error: 'Password Incorrect' }; 
      }

      const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

      if(user){
        user.password=hashedPassword
        await user.save();
      }

      return {user:user}

    } catch (error) {
      throw error;
    }
}