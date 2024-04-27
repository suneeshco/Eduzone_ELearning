import fs from 'fs'
import PDFDocument from 'pdfkit'
import { Course } from "../models/course.model";
import { OrderDocument } from "../models/order.model";
import { getAllCourse, getAllCourseAd } from "../repositories/course.repository";
import { getCourse } from "../repositories/instructor.repository";
import { createOrders, getOrderDetails , getSalesData, getTotalAmount , getTotalAmountInstructor, getTotalStudentInstructor , getCourseByRatingInstructor, getSalesDataForInstructor , getAllEnrolledStudents} from "../repositories/order.repository";
import { getInstructorList, getStudentList } from "../repositories/user.repository";

export const createOrder = async ( data : Partial<OrderDocument> )=> {
    try {
      const timestamp = Date.now(); 
      const orderId = `ORD-${timestamp}`;
    const orderDataWithId = { ...data, orderId }; 
      const order = await createOrders(orderDataWithId);
      return order;
    } catch (error) {
      throw error;
    }
  };


  export const getOrderDetailss = async (instructorId:any , search : string)=>{
    try {
        let students = await getOrderDetails(instructorId,search)
        return students
    } catch (error) {
        throw error
    }
}


export const getSalesDatas = async ()=>{
  try {
      let {salesData,ordersCount} = await getSalesData()
      let totalAmount = await getTotalAmount()
      let totalCourses = await getAllCourseAd('')
      let totalStudents = await getStudentList('')
      let topCourses = await getAllCourse('','rating','')
      return { salesData, totalAmount, totalCourses, totalStudents, ordersCount,topCourses };
  } catch (error) {
      throw error
  }
}



export const getSalesDatasInstructor = async (id:any)=>{
  try {
      let {salesData,ordersCount} = await getSalesDataForInstructor(id)
      let totalAmount = await getTotalAmountInstructor(id)
      let totalCourses = await getCourse(id)
      let totalStudents = await getTotalStudentInstructor(id)
      let topCourses = await getCourseByRatingInstructor(id)
      return { salesData, totalAmount, totalCourses, totalStudents, ordersCount,topCourses };
  } catch (error) {
      throw error
  }
}



export const getAllEnrolledStudentss = async (courseId:any)=>{
  try {
      let students = await getAllEnrolledStudents(courseId)
      return students
  } catch (error) {
      throw error
  }
}