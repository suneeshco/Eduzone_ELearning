import { Request, Response } from 'express';
import { getStudentLists , changeStudentStatuss } from '../../services/admin.service';


export const getStudentList = async(req : Request,res : Response) :  Promise<void> => {
    try {
        let search = req.query.search
        const students = await getStudentLists(search) 
        res.send(students)
        
    } catch (error) {
        console.log(error);
        
        res.status(500).json({ message: 'Server Error' });
    }
}


export const changeStudentStatus = async(req : Request,res : Response) :  Promise<void> => {
    try {
        const {id} = req.body;
        const data:any = await changeStudentStatuss(id) 
        res.send(data)
        
    } catch (error) {
        console.log(error);
        
        res.status(500).json({ message: 'Server Error' });
    }
}