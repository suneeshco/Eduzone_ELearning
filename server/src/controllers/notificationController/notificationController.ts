import { Request, Response } from 'express';
import jwt, { JwtPayload, Secret } from 'jsonwebtoken';
import { getNotifications } from '../../services/notification.service';
import { changeIsReadStatus } from '../../repositories/notification.repository';

export const getNotificationsAdmin = async(req:Request,res:Response) =>{
    const authHeader = req.headers.authorization
        if (!authHeader || !authHeader.startsWith('Bearer')) {
            return res.status(401).json({ error: 'No token found' });
        }
        const token = authHeader.split(' ')[1]
        if (!token) {
            return res.status(401).json({ error: 'No token found' });
        }

        const decoded: any = jwt.verify(token, process.env.TOKEN_SECRET as Secret)
    try {
        const notification= await getNotifications(decoded._id)
        console.log("notifica",notification);
        
        res.send({notification:notification})
    } catch (error) {
        console.log(error);
        
    }
}


export const changeIsRead = async (req:Request,res:Response) => {
    try {
        const id = req.params.id
        const response = await changeIsReadStatus(id)
    } catch (error) {
        console.log(error);  
    }
}