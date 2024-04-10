import { Course } from "../models/course.model";
import { OrderDocument } from "../models/order.model";
import { createOrders, getOrderDetails } from "../repositories/order.repository";

export const createOrder = async ( data : Partial<OrderDocument> )=> {
    try {
      const order = await createOrders(data);
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