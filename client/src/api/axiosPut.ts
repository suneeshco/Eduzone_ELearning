import { apiInstance } from "./config/axiosConfig";

export const editCourse = async (data:any) => {
    try {
        return await apiInstance.put("/instructor/editCourse",{data})
    } catch (error) {
      throw error;
    }
  };