import { Request, Response } from 'express';
import { getAllCoursess } from '../../services/course.service';
import { updateProfiles , getStudentDetailss , studentChangeImages} from '../../services/student.services';

export const getAllCourses = async (req : Request,res : Response) : Promise<void> => {
    try {
        let search = req.query.search
        let sort =req.query.sort
        let categories = req.query.categories
        console.log(sort);
        
        
        const courses = await getAllCoursess(search,sort,categories);
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


export const studentChangeImage = async (req : Request,res : Response) : Promise<void> => {
    try {
        const { photo , userId } = req.body;
        const user = await studentChangeImages(photo , userId);
        res.send({user})
      } catch (error) {
        console.log("error",error);
        res.status(500).send({ message: 'Server Error' });
      }
}