import { Request, Response } from 'express';
import { signup , login , instructorSignup , instructorLogin , adminLogin} from '../../services/auth.service';


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
        const user = await login(email,password);
        res.send({user});
    } catch (error) {
        console.log(error);
        res.status(500).json({message:"Server Error"})  
    }
  },


  async instructorSignup(req: Request, res: Response): Promise<void> {
    try {
      const { firstname, lastname, email, mobile, password } = req.body;
      const token = await instructorSignup(firstname, lastname, email, mobile, password);
      res.header('instructor-auth-token', token).send({ token });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Server Error' });
    }
  },


  async instructorLogin(req:Request , res: Response): Promise <void> {
    try {
        const {email,password} = req.body;
        const token = await instructorLogin(email,password);
        res.header('instructor-auth-token',token).send({token});
    } catch (error) {
        console.log(error);
        res.status(500).json({message:"Server Error"})  
    }
  },



  async adminLogin(req:Request , res: Response): Promise <void> {
    try {
        const {email,password} = req.body;
        const token = await adminLogin(email,password);
        res.header('admin-auth-token',token).send({token});
    } catch (error) {
        console.log(error);
        res.status(500).json({message:"Server Error"})  
    }
  },


  

  
};

