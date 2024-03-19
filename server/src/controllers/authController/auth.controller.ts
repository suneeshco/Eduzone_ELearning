import { Request, Response } from 'express';
import { signup , login , instructorSignup , instructorLogin , adminLogin , sendForgotRequest , studentResetPass , googleSignup , googleLogin} from '../../services/auth.service';
import nodemailer from 'nodemailer';
import Jwt from "jsonwebtoken";




interface DecodedData {
  name: string;
  email: string;
  picture: string;
  jti: string;
}
export const authController = {
  async studentSignup(req: Request, res: Response): Promise<void> {
    try {
      const { firstname, lastname, email, mobile, password,confirmPassword } = req.body;
      const user = await signup(firstname, lastname, email, mobile, password);
      res.send({user})
    } catch (error) {
      console.log("error",error);
      res.status(500).send({ message: 'Server Error' });
    }
  },


  async studentLogin(req:Request , res: Response): Promise <void> {
    try {
        const {email,password} = req.body;
        const response = await login(email,password);
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

        
        const message = sendForgotRequest(email)

        res.status(200).json({ message: message });
        
    } catch (error) {
        console.log(error);
        res.status(500).json({message:"Server Error"})  
    }
  },


  async studentResetPassword(req:Request , res: Response): Promise <void> {
    try {
        const {userId , token , password } = req.body;

       const reset = studentResetPass(userId,token,password)
       res.status(200).json({ message: "Password reset successful" });
    } catch (error) {
        console.log(error);
        res.status(500).json({message:"Server Error"})  
    }
  },


  async instructorSignup(req: Request, res: Response): Promise<void> {
    try {
      const { firstname, lastname, email, mobile, password } = req.body;
      const instructor = await instructorSignup(firstname, lastname, email, mobile, password);
      res.send({ instructor });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Server Error' });
    }
  },


  async instructorLogin(req:Request , res: Response): Promise <void> {
    try {
        const {email,password} = req.body;
        const response = await instructorLogin(email,password);

        if ('error' in response) {
          res.send({ error: response.error });
      } else {
          console.log(response.token);
          res.send({ instructor: response.user, token: response.token });
      }
        
    } catch (error) {
        console.log(error);
        res.status(500).json({message:"Server Error"})  
    }
  },



  async adminLogin(req:Request , res: Response): Promise <void> {
    try {
        const {email,password} = req.body;
        
        const {user,token} = await adminLogin(email,password);
        res.send({admin:user,token});
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
      
      
      const user=await googleSignup(email,jti,name)
      if(user){
        res.status(200).json({ message: "user saved successfully" });
      }
      
    } catch (error) {
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





