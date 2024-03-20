import User,{ UserDocument } from '../models/user.model';
import { findUserById ,updateProfile , updatePhoto} from '../repositories/user.repository';



export const updateProfiles = async (firstname: string,lastname:string, email: string, mobile:string, id: string)=> {
    try {
      const user = await findUserById(id);
      if (!user) {
        throw new Error('User not exists');
      }
  
     const updatedUser = updateProfile(firstname,lastname,email,mobile,id)
      return updatedUser;
    } catch (error) {
      throw error;
    }
  };


  export const getStudentDetailss = async ( id: string)=> {
    try {
      const user = await findUserById(id);
      if (!user) {
        throw new Error('User not exists');
      }
  
    
      return user;
    } catch (error) {
      throw error;
    }
  };




  export const studentChangeImages = async (photo : string , userId : string)=> {
    try {
      const user = await findUserById(userId);
      if (!user) {
        throw new Error('User not exists');
      }
  
     const updatedUser = updatePhoto(photo , userId)
      return updatedUser;
    } catch (error) {
      throw error;
    }
  };