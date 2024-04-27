import { getNotificationss } from "../repositories/notification.repository";



export const getNotifications = async(id:any) =>{
    try {
        const notifications = await getNotificationss(id)
        return notifications
    } catch (error) {
        console.log(error);
        
    }
}