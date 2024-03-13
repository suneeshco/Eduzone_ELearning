import Admin, { AdminDocument } from '../models/admin.model';



export const findAdminByEmail = async (email: string): Promise<AdminDocument | null> => {
  try {
    return await Admin.findOne({ email });
  } catch (error) {
    console.log(error);
    
    throw error;
  }
};



