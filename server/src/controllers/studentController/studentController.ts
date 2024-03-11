import { Request, Response } from 'express';
import { getAllCoursess } from '../../services/course.service';

export const getAllCourses = async (req : Request,res : Response) : Promise<void> => {
    try {
        
        const courses = await getAllCoursess();
        res.send(courses);
    } catch (error) {
        console.error(error); 
        res.status(500).send({ message: "Error adding course" });
    }
}