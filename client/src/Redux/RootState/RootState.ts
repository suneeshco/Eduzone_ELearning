import { AdminData, InstructorData, UserData } from "../../utils/apiTypes/ApiTypes";


// Define the shape of your Redux state
export interface RootState {
    studentAuth: {
      userInfo: UserData | null;
    };
    instructorAuth : {
      instructorInfo : InstructorData | null;
    };
    adminAuth : {
      adminInfo : AdminData | null;
    }
    // Add other slices of state here
  }
  