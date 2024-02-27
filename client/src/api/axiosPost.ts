import { apiInstance } from "./config/axiosConfig";


export const studentLogin = async (email:any,password:any) => {
    
  
    try {
        return await apiInstance.post("/auth/login",{email,password})
    } catch (error) {
      throw error;
    }
  };