import { Request, Response } from 'express';
import { signup , login , instructorSignup , instructorLogin , adminLogin} from '../../services/auth.service';


export const authController = {
  async studentSignup(req: Request, res: Response): Promise<void> {
    try {
      const { firstname, lastname, email, mobile, password,confirmPassword } = req.body;
      const user = await signup(firstname, lastname, email, mobile, password);
      res.send({user})
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
        const instructor = await instructorLogin(email,password);
        res.send({instructor});
    } catch (error) {
        console.log(error);
        res.status(500).json({message:"Server Error"})  
    }
  },



  async adminLogin(req:Request , res: Response): Promise <void> {
    try {
        const {email,password} = req.body;
        const admin = await adminLogin(email,password);
        res.send({admin});
    } catch (error) {
        console.log(error);
        res.status(500).json({message:"Server Error"})  
    }
  },


  

  
};

