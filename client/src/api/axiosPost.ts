import { apiInstance } from "./config/axiosConfig";


export const studentLogin = async (email:any,password:any) => {
    try {
        return await apiInstance.post("/auth/login",{email,password})
    } catch (error) {
      throw error;
    }
};


export const studentSignUp = async (firstname:any,lastname:any,email:any,mobile:any,password:any,confirmPassword:any) => {
  try {
      return await apiInstance.post("/auth/signup",{firstname,lastname,email,mobile,password,confirmPassword})
  } catch (error) {
    console.log(error);
    
    throw error;
  }
};


export const instructorLogin = async (email:any,password:any) => {
  try {
      return await apiInstance.post("/auth/instructorLogin",{email,password})
  } catch (error) {
    throw error;
  }
};


export const instructorSignUp = async (firstname:any,lastname:any,email:any,mobile:any,password:any,confirmPassword:any) => {
  try {
      return await apiInstance.post("/auth/instructorSignUp",{firstname,lastname,email,mobile,password,confirmPassword})
  } catch (error) {
    console.log(error);
    
    throw error;
  }
};

export const adminLogin = async (email:any,password:any) => {
  try {
      return await apiInstance.post("/auth/adminLogin",{email,password})
  } catch (error) {
    throw error;
  }
};

