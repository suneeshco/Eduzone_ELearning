import { apiInstance } from "./config/axiosConfig";

export const editCourse = async (data:any) => {
    try {
        return await apiInstance.put("/instructor/editCourse",{data})
    } catch (error) {
      throw error;
    }
  };



  export const studentProfileUpdate = async (firstname:any,lastname:any,email:any,mobile:any,id:any) => {
    try {
        return await apiInstance.put("/student/updateProfile",{firstname,lastname,email,mobile,id})
    } catch (error) {
      console.log(error);
      
      throw error;
    }
  };