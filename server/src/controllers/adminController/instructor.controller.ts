import { Request, Response } from 'express';
import { getInstructorLists } from '../../services/admin.service';
import { changeInstructorStatuss } from '../../services/admin.service';


export const getInstructorList = async(req : Request,res : Response) :  Promise<void> => {
    try {
        const instructors = await getInstructorLists() 
        res.send(instructors)
        
    } catch (error) {
        console.log(error);
        
        res.status(500).json({ message: 'Server Error' });
    }
}



export const changeInstructorStatus = async(req : Request,res : Response) :  Promise<void> => {
    try {
        const {id} = req.body;
        const data:any = await changeInstructorStatuss(id) 
        res.send(data)
        
    } catch (error) {
        console.log(error);
        
        res.status(500).json({ message: 'Server Error' });
    }
}