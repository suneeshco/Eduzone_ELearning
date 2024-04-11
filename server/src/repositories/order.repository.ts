import Order,{ OrderDocument } from "../models/order.model";
import Course, { CourseDocument } from '../models/course.model';

export const createOrders = async (data: Partial<OrderDocument>) => {
    try {
        console.log(data);
       const existingOrder = await Order.findOne({studentId : data.studentId,courseId : data.courseId})
        if(!existingOrder){
          const order = await Order.create({
            studentId : data.studentId,
            instructorId : data.instructorId,
            courseId : data.courseId,
            amount : data.amount,
            orderId : data.orderId
          });
          await order.save();

          const course = await Course.findByIdAndUpdate(data.courseId,{
            $push: { students: data.studentId }
          })
        }
        

    } catch (error) {
      throw error;
    }
  } 



  export const getOrderDetails = async (instructorId : any, search : string) => {
    try {
      let query = { instructorId: instructorId };
      if (search && search.trim() !== '') {
        const searchRegex = new RegExp(search.trim(), 'i');
        const orders = await Order.find(query).populate('studentId').populate('courseId').sort({ createdAt: -1 });
        const filteredOrders = orders.filter(order => order?.courseId?.courseName.match(searchRegex));
        return filteredOrders;
      } else {
        const orders = await Order.find(query).populate('studentId').populate('courseId').sort({ createdAt: -1 });
        return orders;
      }
    } catch (error) {
      throw error;
    }
  };



  export const getStudentOrderDetails = async (studentId : any) => {
    try {
      let query = { studentId: studentId };
      
        const orders = await Order.find(query).populate('studentId').populate('courseId').populate('instructorId').sort({ createdAt: -1 });
        return orders;
      
    } catch (error) {
      throw error;
    }
  };
  