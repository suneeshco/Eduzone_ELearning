import mongoose from "mongoose";
import Notification , { NotificationDocument } from "../models/notification.model";

export const addNotification = async (senderId:string,receiverId :string,  message:string , category : string) => {
    try {
        
      const notification = await Notification.create({
       receiverId : receiverId,
        senderId:senderId,
        message : message,
        category : category
      });
      await notification.save();

        return notification;
        
      } catch (error) {
        throw error;
      }
  }



export const getNotificationss = async (id : any) =>{
    const ObjectId = new mongoose.Types.ObjectId(id);
    console.log(id);
    
    try {
        const notifications = await Notification.find({ receiverId: ObjectId , isRead : false}).sort({createdAt:-1})
        console.log(notifications);
        
        return notifications
    } catch (error) {
        throw error
    }
}



export const changeIsReadStatus = async (id : any) =>{
    
    try {
        const notifications = await Notification.updateOne({ _id: id},{ $set: { isRead: true } })
        
        return notifications
    } catch (error) {
        throw error
    }
}