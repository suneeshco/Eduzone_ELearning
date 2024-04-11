import { Request, Response } from 'express';
import { getActiveCategory } from '../../services/category.service';
import { addCourses ,getCoursess , getSingleCoursess , addLessons , getLessonss , editCourses, updateProfiles , getInstructorDetailss , getLessonDetail , editLessons , deleteLessonById , instructorChangeImages} from '../../services/instructor.service';




export const addCourse = async (req : Request,res : Response) : Promise<void> => {
    try {
        
        const courseData = req.body;
        console.log(req.body.data);
        
        const course = await addCourses(courseData);
        res.send(course);
    } catch (error) {
        console.error(error); 
        res.status(500).send({ message: "Error adding course" });
    }
}



export const getCourses = async (req : Request,res : Response) : Promise<void> => {
    try {
        
        const id = req.params.id;
        console.log(id);
        
        const courses = await getCoursess(id);
        res.send(courses);
    } catch (error) {
        console.error(error); 
        res.status(500).send({ message: "Error adding course" });
    }
}


export const getSingleCourse = async (req : Request,res : Response) : Promise<void> => {
    try {
       
        const id = req.params.id;
        console.log(id);
        
        const courses = await getSingleCoursess(id);
        res.send(courses);
    } catch (error) {
        console.error(error); 
        res.status(500).send({ message: "Error adding course" });
    }
}




export const addLesson = async (req : Request,res : Response) : Promise<void> => {
    try {
      
        const lessonData = req.body;
        
        const lesson = await addLessons(lessonData);
        res.send(lesson);
    } catch (error) {
        console.error(error); 
        res.status(500).send({ message: "Error adding lesson" });
    }
}



export const getLessons = async (req : Request,res : Response) : Promise<void> => {
    try {
        
        const id = req.params.id;
        
        const lessons = await getLessonss(id);
        
        
        res.send(lessons);
    } catch (error) {
        console.error(error); 
        res.status(500).send({ message: "Error " });
    }
}



export const getActiveCategories = async(req : Request,res : Response) :  Promise<void> => {
    try {
        const categories = await getActiveCategory() 
        res.send(categories)
        
    } catch (error) {
        console.log(error);
        
        res.status(500).json({ message: 'Server Error' });
    }
}


export const editCourse = async (req : Request,res : Response) : Promise<void> => {
    try {
       
        const courseData = req.body;
        console.log(req.body);
        
        const course = await editCourses(courseData);
        res.send(course);
    } catch (error) {
        console.error(error); 
        res.status(500).send({ message: "Error editing course" });
    }
}


export const updateProfile = async (req : Request,res : Response) : Promise<void> => {
    try {
        const { firstname, lastname, mobile ,id } = req.body;
        const user = await updateProfiles(firstname, lastname, mobile, id);
        res.send({user})
      } catch (error) {
        console.log("error",error);
        res.status(500).send({ message: 'Server Error' });
      }
}


export const getInstructorDetails = async (req : Request,res : Response) : Promise<void> => {
    try {
        const id = req.params.id
        const details = await getInstructorDetailss(id);
        res.send(details);
    } catch (error) {
        console.error(error); 
        res.status(500).send({ message: "Error " });
    }
}


export const getLessonDetails = async (req : Request,res : Response) : Promise<void> => {
    try {
       
        const id = req.params.id;
       
        
        const lesson = await getLessonDetail(id);
       
        res.send(lesson);
    } catch (error) {
        console.error(error); 
        res.status(500).send({ message: "Error adding course" });
    }
}



export const editLesson = async (req : Request,res : Response) : Promise<void> => {
    try {
       
        const lessonData = req.body;
        console.log(req.body);
        
        const course = await editLessons(lessonData);
        res.send(course);
    } catch (error) {
        console.error(error); 
        res.status(500).send({ message: "Error editing course" });
    }
}


export const deleteLesson = async (req : Request,res : Response) : Promise<void> => {
    try {
        const lessonId = req.params.id;
        await deleteLessonById(lessonId);
        res.status(200).json({ message: "Lesson deleted successfully" });
    } catch (error) {
        console.error("Error deleting lesson:", error);
        res.status(500).json({ message: "Error deleting lesson" });
    }
}


export const instructorChangeImage = async (req : Request,res : Response) : Promise<void> => {
    try {
        const { photo , userId } = req.body;
        const user = await instructorChangeImages(photo , userId);
        res.send({user})
      } catch (error) {
        console.log("error",error);
        res.status(500).send({ message: 'Server Error' });
      }
}





