import { Request, Response, NextFunction} from 'express';
import jwt , { JwtPayload, Secret } from 'jsonwebtoken';
import { findUserById } from '../repositories/user.repository';
import { findAdminById } from '../repositories/admin.repository';
import { findInstructorById } from '../repositories/instructor.repository';


export const studentAuth = async (req:Request,res:Response,next:NextFunction) => {
    try {
        const authHeader = req.headers.authorization

        if(!authHeader || !authHeader.startsWith('Bearer')){
            return res.status(401).json({ error: 'No token found' });
        }
        const token = authHeader.split(' ')[1]
        if (!token) {
            return res.status(401).json({ error: 'No token found' });
        }

        const decoded : any = jwt.verify(token,process.env.TOKEN_SECRET as Secret)
        const user =await findUserById(decoded._id)
        
        if(!user){
            return res.status(401).json({ error: 'User not found' });
        }

        if(!user.status){
            return res.status(401).json({ error: 'Account is blocked' });
        }
        
        next()

    } catch (error) {
        console.log(error);
    }
}


export const instructorAuth = async (req:Request,res:Response,next:NextFunction) => {
    try {
        const authHeader = req.headers.authorization
    
        if(!authHeader || !authHeader.startsWith('Bearer')){
            return res.status(401).json({ error: 'No token found' });
        }
        const token = authHeader.split(' ')[1]
        if (!token) {
            return res.status(401).json({ error: 'No token found' });
        }

        const decoded : any = jwt.verify(token,process.env.INSTRUCTOR_SECRET as Secret)
        const user =await findInstructorById(decoded._id)
        if(!user){
            return res.status(401).json({ error: 'Instructor not found' });
        }
        if(!user.status){
            return res.status(401).json({ error: 'Account is blocked' });
        }
        next()
    } catch (error) {
        console.log(error);   
    }
}



export const adminAuth = async (req:Request,res:Response,next:NextFunction) => {
    try {
        const authHeader = req.headers.authorization
        if(!authHeader || !authHeader.startsWith('Bearer')){
            return res.status(401).json({ error: 'No token found' });
        }
        const token = authHeader.split(' ')[1]
        if (!token) {
            return res.status(401).json({ error: 'No token found' });
        }
        
        const decoded : any = jwt.verify(token,process.env.ADMIN_SECRET as Secret)
        const user =await findAdminById(decoded._id)
        if(!user){
            return res.status(401).json({ error: 'Admin Details Not Found' });
        }
        next()
    } catch (error) {
        console.log(error); 
    }
}