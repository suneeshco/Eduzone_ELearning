import { Request, Response } from 'express';
import { signup , login} from '../services/auth.service';

export const authController = {
  async studentSignup(req: Request, res: Response): Promise<void> {
    try {
      const { firstname, lastname, email, mobile, password } = req.body;
      const token = await signup(firstname, lastname, email, mobile, password);
      res.header('auth-token', token).send({ token });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Server Error' });
    }
  },


  async studentLogin(req:Request , res: Response): Promise <void> {
    try {
        const {email,password} = req.body;
        const token = await login(email,password);
        res.header('auth-token',token).send({token});
    } catch (error) {
        console.log(error);
        res.status(500).json({message:"Server Error"})
        
    }
  }

  
};

