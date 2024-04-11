import { Request, Response } from 'express';
import { getAllCoursesAdmin } from '../../services/course.service';
import { changeCourseStatuss } from '../../services/admin.service';

export const getAllCoursesAd = async (req : Request,res : Response) : Promise<void> => {
    try {
        let search = req.query.search
        
        
        const courses = await getAllCoursesAdmin(search);
        res.send(courses);
    } catch (error) {
        console.error(error); 
        res.status(500).send({ message: "Error adding course" });
    }
}


export const changeCourseStatus = async(req : Request,res : Response) :  Promise<void> => {
    try {
        const {id} = req.body;
        const data:any = await changeCourseStatuss(id) 
        res.send(data)
        
    } catch (error) {
        console.log(error);
        
        res.status(500).json({ message: 'Server Error' });
    }
}