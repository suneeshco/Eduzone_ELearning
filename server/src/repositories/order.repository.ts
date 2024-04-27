import Order,{ OrderDocument } from "../models/order.model";
import Course, { CourseDocument } from '../models/course.model';
import mongoose from "mongoose";

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
  


  export const getSalesData = async () => {
    try {
      const currentYear = new Date().getFullYear();
      const startOfYear = new Date(currentYear, 0, 1); 
      const endOfYear = new Date(currentYear, 11, 31, 23, 59, 59); 
      const ordersCount = await Order.countDocuments({})
      

      const orders = await Order.aggregate([
          {
              $match: {
                  createdAt: { $gte: startOfYear, $lte: endOfYear } 
              }
          },
          {
              $group: {
                  _id: { $month: "$createdAt" }, 
                  count: { $sum: 1 } 
              }
          },
          {
              $sort: { "_id": 1 } 
          }
      ]);
      const salesData = Array.from({ length: 12 }, (_, index) => {
          const monthOrder = orders.find(order => order._id === index + 1);
          return monthOrder ? monthOrder.count : 0;
      });

      return {salesData,ordersCount};
  } catch (error) {
      throw error;
  }
  };


  export const getTotalAmount = async () => {
    try {
        const totalAmount = await Order.aggregate([
            {
                $group: {
                    _id: null,
                    totalAmount: { $sum: "$amount" }
                }
            }
        ]);
        return totalAmount.length > 0 ? totalAmount[0].totalAmount : 0;
    } catch (error) {
        throw error;
    }
};



export const getTotalAmountInstructor = async (id: any) => {
  try {
    const objectId = new mongoose.Types.ObjectId(id);
      const pipeline = [
          {
              $match: {
                  instructorId: objectId
              }
          },
          {
              $group: {
                  _id: null,
                  totalAmount: { $sum: "$amount" }
              }
          }
      ];

      const totalAmount = await Order.aggregate(pipeline);
      console.log('total',totalAmount);
      
      return totalAmount.length > 0 ? totalAmount[0].totalAmount : 0;
  } catch (error) {
      throw error;
  }
};

export const getTotalStudentInstructor = async (id: any) => {
  const objectId = new mongoose.Types.ObjectId(id);
  try {
    const totalAmount = await Order.aggregate([
      {
        $match: {
          instructorId: objectId 
        }
      },
      {
        $group: {
          _id: "$studentId", 
          count: { $sum: 1 } 
        }
      },
      {
        $group: {
          _id: null,
          totalStudents: { $sum: 1 } 
        }
      }
    ]);
    
    return totalAmount.length > 0 ? totalAmount[0].totalStudents : 0;
  } catch (error) {
    throw error;
  }

}



export const getCourseByRatingInstructor = async (id:any) =>{
  const objectId = new mongoose.Types.ObjectId(id);
  try {
    const courses = await Course.find({ instructorId:objectId }).sort({ rating: -1 })
    return courses;
} catch (error) {
    throw error;
}
}




export const getSalesDataForInstructor = async (id:any) => {
  try {
      const currentYear = new Date().getFullYear();
      const startOfYear = new Date(currentYear, 0, 1);
      const endOfYear = new Date(currentYear, 11, 31, 23, 59, 59);
      const ordersCount = await Order.countDocuments({
          instructorId: new mongoose.Types.ObjectId(id)
      });

      const orders = await Order.aggregate([
          {
              $match: {
                  instructorId: new mongoose.Types.ObjectId(id),
                  createdAt: { $gte: startOfYear, $lte: endOfYear }
              }
          },
          {
              $group: {
                  _id: { $month: "$createdAt" }, 
                  count: { $sum: 1 } 
              }
          },
          {
              $sort: { "_id": 1 } 
          }
      ]);

     
      const salesData = Array.from({ length: 12 }, (_, index) => {
          const monthOrder = orders.find(order => order._id === index + 1);
          return monthOrder ? monthOrder.count : 0;
      });

      return { salesData, ordersCount };
  } catch (error) {
      throw error;
  }
};





export const getAllEnrolledStudents = async (courseId : any) => {
  try {
    let query = { courseId: courseId };
    
      const orders = await Order.find(query).populate('studentId').sort({ createdAt: -1 });
      return orders;
    
  } catch (error) {
    throw error;
  }
};
