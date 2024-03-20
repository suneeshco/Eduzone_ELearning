
import User, { UserDocument } from '../models/user.model';

export const createUser = async (userData: Partial<UserDocument>): Promise<UserDocument> => {
  try {
    console.log(userData);
    
    return await User.create(userData);
  } catch (error) {
    throw error;
  }
};

export const findUserByEmail = async (email: string): Promise<UserDocument | null> => {
  try {
    return await User.findOne({ email });
  } catch (error) {
    throw error;
  }
};

export const findUserById = async (id: string): Promise<UserDocument | null> => {
  try {
    return await User.findOne({ _id : id });
  } catch (error) {
    throw error;
  }
};


export const updateProfile = async (firstname:any,lastname:any,email:any,mobile :any,id: string) => {
  try {
    const updatedProfile = await User.findByIdAndUpdate(id, {
      firstname,
      lastname,
      email,
      mobile
    }, { new: true });
    return updatedProfile
  } catch (error) {
    throw error;
  }
};


export const updatePhoto = async (photo : string , userId:string) => {
  try {
    const updatedProfile = await User.findByIdAndUpdate(userId, {
      photo : photo
    }, { new: true });
    return updatedProfile
  } catch (error) {
    throw error;
  }
};



export const getStudentList = async () =>{
  try {
    const students = await User.find({})
    return students
  } catch (error) {
    throw error
  }
}


export const changeStudentStatus = async (id: string) => {
  try {
     const student = await User.findOne({ _id: id });
     if (!student) {
       throw new Error('Student not found'); 
     }
     student.status = !student.status
     await student.save();
     return student;
  } catch (error) {
     throw error; 
  }
 };



