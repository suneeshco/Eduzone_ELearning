import User,{ UserDocument } from '../models/user.model';
import { findUserById ,updateProfile} from '../repositories/user.repository';



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