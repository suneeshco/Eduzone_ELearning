import { createSlice } from "@reduxjs/toolkit";
import { InstructorData } from "../../utils/apiTypes/ApiTypes";


export interface UserState{
    instructorInfo : InstructorData | null;
}

const initialState: UserState = {
    instructorInfo: localStorage.getItem('instructorInfo')  
      ? JSON.parse(localStorage.getItem('instructorInfo')!) // Using the non-null assertion operator (!)
      : null,
  };
  


const instructorAuthSlice= createSlice({
    name: 'instructorAuth',
    initialState,
    reducers: {
        setInstructorCredentials : (state,action)=>{
            state.instructorInfo=action.payload;
            localStorage.setItem('instructorInfo',JSON.stringify(action.payload))
        },
        instructorLogout: (state,action)=>{
            state.instructorInfo=null;
            localStorage.removeItem('instructorInfo')
            localStorage.removeItem('instructorToken')
        }
    }
})


export const {setInstructorCredentials,instructorLogout} = instructorAuthSlice.actions;

export default instructorAuthSlice.reducer;