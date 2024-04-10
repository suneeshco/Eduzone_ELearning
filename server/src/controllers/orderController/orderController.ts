import { Request, Response } from 'express';
import { getOrderDetailss } from '../../services/order.service';

export const getOrderDetails = async(req : Request,res : Response) :  Promise<void> => {
    try {
        let instructorId = req.query.instructorId as string; 
        let search = req.query.search as string | undefined;
        const instructors =search? await getOrderDetailss(instructorId, search)  : await getOrderDetailss(instructorId, "")
        res.send(instructors)
        
    } catch (error) {
        console.log(error);
        
        res.status(500).json({ message: 'Server Error' });
    }
}