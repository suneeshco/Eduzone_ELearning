import { UserData } from "../Slices/StudentAuth";


// Define the shape of your Redux state
export interface RootState {
    studentAuth: {
      userInfo: UserData | null;
    };
    // Add other slices of state here
  }
  