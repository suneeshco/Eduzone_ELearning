import { Request, Response, NextFunction} from 'express';
import jwt , { JwtPayload, Secret } from 'jsonwebtoken';
import { findUserById } from '../repositories/user.repository';
import { findAdminById } from '../repositories/admin.repository';
import session, { Session } from 'express-session';

interface CustomRequest extends Request {
    session: Session & { studentDetail?: any }; 
}


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
        if (decoded.role === 'student') {
            const user = await findUserById(decoded._id);
            if (!user) {
                return res.status(401).json({ error: 'User not found' });
            }
            if (!user.status) {
                return res.status(401).json({ error: 'Account is blocked' });
            }
            next();
        } else {
            return res.status(401).json({ error: 'Unauthorized' });
        }

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

        const decoded : any = jwt.verify(token,process.env.TOKEN_SECRET as Secret)
         if (decoded.role === 'instructor') {
            const user = await findUserById(decoded._id);
            if (!user) {
                return res.status(401).json({ error: 'Instructor not found' });
            }
            if (!user.status) {
                return res.status(401).json({ error: 'Account is blocked' });
            }
            next();
        } else {
            return res.status(401).json({ error: 'Unauthorized' });
        }
        
        
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
        
        const decoded : any = jwt.verify(token,process.env.TOKEN_SECRET as Secret)
        // const user =await findUserById(decoded._id)
        // if(!user){
        //     return res.status(401).json({ error: 'Admin Details Not Found' });
        // }
        if(decoded.role === 'admin'){
            next()
        }else{
            return res.status(401).json({ error: 'Unauthorized' });
        }
    } catch (error) {
        console.log(error); 
    }
}



export const userOtpExpiration = (req: CustomRequest, res: Response, next: NextFunction) => {
    const now = Date.now();
    if (req.session.studentDetail && req.session.studentDetail.otpCode && req.session.studentDetail.otpSetTimestamp) {
        if (typeof req.session.studentDetail.otpSetTimestamp === 'number') {
            const timeElapsed = now - req.session.studentDetail.otpSetTimestamp;
            if (timeElapsed >= 60000) { 
                req.session.studentDetail.otpCode = undefined;
                req.session.studentDetail.otpSetTimestamp = undefined;
                console.log("Expired OTP code cleaned up");
                return res.send({expired:"Otp Expired"})
            }
        }
    }
    next();
};