import { Request, Response } from 'express';
import { getOrderDetailss , getSalesDatas , getSalesDatasInstructor , getAllEnrolledStudentss } from '../../services/order.service';

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

export const getSalesData = async(req : Request,res : Response) :  Promise<void> => {
    try {
        console.log("hai");
        
        const {salesData,totalAmount,totalCourses,totalStudents , ordersCount , topCourses} = await getSalesDatas()
        
        let totalCourse= totalCourses.length
        let totalStudent=totalStudents.length
        let topCourse = topCourses
        if(topCourses.length>5){
            topCourse = topCourses.slice(0,5)
        }
        const b={
            salesData, totalAmount , totalCourse,totalStudent ,ordersCount , topCourse
        }
        console.log(b);
        
        
        res.send({ salesData, totalAmount , totalCourse,totalStudent ,ordersCount , topCourse})
        
    } catch (error) {
        console.log(error);
        
        res.status(500).json({ message: 'Server Error' });
    }
}



export const getSalesDataInstructor = async(req : Request,res : Response) :  Promise<void> => {
    try {
        const id = req.params.id
        const {salesData,totalAmount,totalCourses,totalStudents , ordersCount , topCourses} = await getSalesDatasInstructor(id)
        let totalCourse= totalCourses.length
        let totalStudent=totalStudents
        let topCourse = topCourses
        if(topCourses.length>5){
            topCourse = topCourses.slice(0,5)
        }
        
        res.send({ salesData, totalAmount , totalCourse,totalStudent ,ordersCount , topCourse})
        
    } catch (error) {
        console.log(error);
        
        res.status(500).json({ message: 'Server Error' });
    }
}




export const getAllEnrolledStudents = async(req : Request,res : Response) :  Promise<void> => {
    try {
        let courseId = req.query.courseId as string; 
        const data = await getAllEnrolledStudentss(courseId)
        res.send(data)
        
    } catch (error) {
        console.log(error);
        
        res.status(500).json({ message: 'Server Error' });
    }
}