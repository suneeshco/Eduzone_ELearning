import { Request, Response } from 'express';
import { getActiveCategory } from '../../services/category.service';
import { addCourses ,getCoursess , getSingleCoursess , addLessons , getLessonss } from '../../services/instructor.service';

// export const addCourse = async (req : Request,res : Response) :  Promise<void>  => {
//     try {
//         let {data} = req.body;
//         const course = addCourses(data)
//         res.send(course)
//     } catch (error) {
//         console.log(error); 
//     }
    
// }



export const addCourse = async (req : Request,res : Response) : Promise<void> => {
    try {
        // Directly use req.body instead of req.body.data
        const courseData = req.body.data;
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
        // Directly use req.body instead of req.body.data
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
        // Directly use req.body instead of req.body.data
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
        // Directly use req.body instead of req.body.data
        const lessonData = req.body.data;
        console.log(req.body.data);
        
        const lesson = await addLessons(lessonData);
        res.send(lesson);
    } catch (error) {
        console.error(error); 
        res.status(500).send({ message: "Error adding lesson" });
    }
}



export const getLessons = async (req : Request,res : Response) : Promise<void> => {
    try {
        // Directly use req.body instead of req.body.data
        const id = req.params.id;
        console.log(id);
        
        const lessons = await getLessonss(id);
        res.send(lessons);
    } catch (error) {
        console.error(error); 
        res.status(500).send({ message: "Error adding course" });
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

