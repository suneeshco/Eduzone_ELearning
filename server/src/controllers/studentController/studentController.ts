import { Request, Response } from 'express';
import { getAllCoursess } from '../../services/course.service';
import { updateProfiles , getStudentDetailss} from '../../services/student.services';

export const getAllCourses = async (req : Request,res : Response) : Promise<void> => {
    try {
        
        const courses = await getAllCoursess();
        res.send(courses);
    } catch (error) {
        console.error(error); 
        res.status(500).send({ message: "Error adding course" });
    }
}


export const updateProfile = async (req : Request,res : Response) : Promise<void> => {
    try {
        const { firstname, lastname, email, mobile ,id } = req.body;
        const user = await updateProfiles(firstname, lastname, email, mobile, id);
        res.send({user})
      } catch (error) {
        console.log("error",error);
        res.status(500).send({ message: 'Server Error' });
      }
}


export const getStudentDetails = async (req : Request,res : Response) : Promise<void> => {
    try {
        const id = req.params.id
        const details = await getStudentDetailss(id);
        res.send(details);
    } catch (error) {
        console.error(error); 
        res.status(500).send({ message: "Error adding course" });
    }
}