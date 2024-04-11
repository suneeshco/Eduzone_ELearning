import { Course } from "../models/course.model";
import { OrderDocument } from "../models/order.model";
import { createOrders, getOrderDetails } from "../repositories/order.repository";

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