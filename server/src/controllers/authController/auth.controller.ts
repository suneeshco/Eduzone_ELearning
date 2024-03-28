import { Request, Response } from 'express';
import { signup , login ,  adminLogin , sendForgotRequest , studentResetPass , googleSignup , googleLogin} from '../../services/auth.service';
import nodemailer from 'nodemailer';
import Jwt from "jsonwebtoken";
import session from 'express-session';
import generateOtp from '../../utils/sendOtpMail';
import { findUserByEmail, findUserById } from '../../repositories/user.repository';
import { UserDocument } from '../../models/user.model';
// import { findInstructorByEmail } from '../../repositories/instructor.repository';

declare module 'express-session' {
  interface Session {
     otp: string;
     studentDetail: {
       firstname: string;
       lastname: string;
       email: string;
       mobile: string;
       password: string;
       otpCode:string | undefined;
       otpSetTimestamp:Number | undefined;
       role: string;
     };
  }
 }


interface DecodedData {
  name: string;
  email: string;
  picture: string;
  jti: string;
}
export const authController = {
  async studentSignup(req: Request, res: Response): Promise<void> {
    try {
      const { firstname, lastname, email, mobile, password,confirmPassword,role } = req.body;
      
       const user = await findUserByEmail(email)
      if(user){
         res.send({error : "Email Already Exists"})
      }else{
        const otpCode = await generateOtp(email);
        console.log(otpCode);
        
  
        if (otpCode !== undefined) {
          
          req.session.studentDetail = {
            firstname:firstname,
            lastname:lastname,
            email:email,
            mobile:mobile,
            password:password,
            otpCode: otpCode,
            otpSetTimestamp: Date.now(),
            role:role
          };
        res.send({success:"Otp Send Successfully"})
         console.log(req.session);
         
      }
      }

      
      
  } catch (error) {
      console.log("error",error);
      res.status(500).send({ message: 'Server Error' });
    }
  },



  async verifyOtp(req: Request, res: Response): Promise<void> {
    try {
      const { otp } = req.body;
      const sendOtp = req.session.studentDetail.otpCode
      const users = req.session.studentDetail

      console.log(otp);
      console.log(sendOtp);
      console.log(users);
      console.log(req.session);
      
      
      
      
      if(otp===sendOtp){
        
        
         const user = await signup(users?.firstname,users?.lastname,users?.email,users?.mobile,users?.password,users?.role);
      res.send({user})
      }else{
        res.send({error:"Incorrect Otp"})
      }
    } catch (error) {
      console.log(error);
      
    }
  },



  async ResendOtp(req: Request, res: Response): Promise<void> {
    try {
      const userData = req.session.studentDetail;
      if (!userData) {
        res.send({error:"Session Not Found , Please SignUp Again"})
        return;
      }
      const email = userData.email;
      const newOtp = await generateOtp(email);
      if (req.session.studentDetail) {
        req.session.studentDetail.otpCode = newOtp;
      } else {
        console.error("Session user data is unexpectedly undefined.");
        res.status(500).send({error : "Something Went Wrong, Please SignUp Again"})
        return;
      }
      res.status(200).send({ success: "New OTP sent to email" });
    } catch (error) {
      console.error(error);
      res.status(500).send({ error: "Server Error" });
    }
  },



  async studentLogin(req:Request , res: Response): Promise <void> {
    try {
        const {email,password} = req.body;
        
        
        
        let  response = await login(email,password);
        
        console.log(response);
        
        if ('error' in response) {
          res.send({ error: response.error });
      } else {
          console.log(response.token);
          res.send({ user: response.user, token: response.token });
      }
    } catch (error) {
        console.log(error);
        res.status(500).json({message:"Server Error"})  
    }
  },



  async studentForgot(req:Request , res: Response): Promise <void> {
    try {
        const {email} = req.body;

        
        const message =await sendForgotRequest(email)
       

        res.status(200).json({ message: message });
        
    } catch (error) {
        console.log(error);
        res.status(500).json({message:"Server Error"})  
    }
  },


  async studentResetPassword(req:Request , res: Response): Promise <void> {
    try {
        const {userId , token , password } = req.body;

       const reset =await studentResetPass(userId,token,password)
       res.status(200).json({ message: reset });
    } catch (error) {
        console.log(error);
        res.status(500).json({message:"Server Error"})  
    }
  },


  // async instructorSignup(req: Request, res: Response): Promise<void> {
  //   try {
  //     const { firstname, lastname, email, mobile, password } = req.body;
  //     const instructor = await instructorSignup(firstname, lastname, email, mobile, password);
  //     res.send({ instructor });
  //   } catch (error) {
  //     console.error(error);
  //     res.status(500).json({ message: 'Server Error' });
  //   }
  // },


  // async instructorLogin(req:Request , res: Response): Promise <void> {
  //   try {
  //       const {email,password} = req.body;
  //       const response = await instructorLogin(email,password);

  //       if ('error' in response) {
  //         res.send({ error: response.error });
  //     } else {
  //         console.log(response.token);
  //         res.send({ instructor: response.user, token: response.token });
  //     }
        
  //   } catch (error) {
  //       console.log(error);
  //       res.status(500).json({message:"Server Error"})  
  //   }
  // },



  async adminLogin(req:Request , res: Response): Promise <void> {
    try {
        const {email,password} = req.body;
        
        const response = await adminLogin(email,password);
        if ('error' in response) {
          res.send({ error: response.error });
      } else{
        res.send({admin:response.user,token:response.token});
      }
        
    } catch (error) {
        console.log(error);
        res.status(500).json({message:"Server Error"})  
    }
  },


  async googleRegister (req: Request, res: Response){
    try {
      console.log("This is credential in body: ", req.body.credential);
      const token = req.body.credential;
      console.log(token)
      const decodedData = Jwt.decode(req.body.credential);
  
      console.log("Decoded data: ", decodedData);
      const {
        name,
        email,
        jti,
      }: DecodedData = decodedData as DecodedData;
      let role = 'student'
      
      
      const user=await googleSignup(email,jti,name,role)

      

      console.log("user",user);
      if ('error' in user) {
        res.send({ error: user.error });
    } 
    else if(user){
        res.status(200).json({ message: "user saved successfully" });
      }
      
    } catch (error) {
      console.log("Haiiiiii");
      
      res.status(400).json({ error: "User already exists" });
    }
  },





  async googleLogin(req: Request, res: Response){
    try {
      const decodedData = Jwt.decode(req.body.credential) as DecodedData | null;
      console.log(decodedData)
  
      if (!decodedData) {
        return res.status(400).json({ error: "Invalid credentials" });
      }
  
      const {email,jti} = decodedData;
      const password=jti;
      const response = await googleLogin(email,password);
        if ('error' in response) {
          res.send({ error: response.error });
      } else {
          console.log(response.token);
          res.send({ user: response.user, token: response.token });
      }
    } catch (error) {
      console.log(error);
      res.status(500).json({message:"Server Error"})  
    }
  }

  
};





