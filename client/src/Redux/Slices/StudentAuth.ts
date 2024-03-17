import { createSlice } from "@reduxjs/toolkit";
import { UserData } from "../../utils/apiTypes/ApiTypes";


export interface UserState{
    userInfo : UserData | null;
}

const initialState: UserState = {
    userInfo: localStorage.getItem('userInfo')  
      ? JSON.parse(localStorage.getItem('userInfo')!) // Using the non-null assertion operator (!)
      : null,
  };
  


const authSlice= createSlice({
    name: 'studentAuth',
    initialState,
    reducers: {
        setStudentCredentials : (state,action)=>{
            state.userInfo=action.payload;
            localStorage.setItem('userInfo',JSON.stringify(action.payload))
        },
        studentLogout: (state,action)=>{
            state.userInfo=null;
            localStorage.removeItem('userInfo')
            localStorage.removeItem('studentToken')
        }
    }
})


export const {setStudentCredentials,studentLogout} = authSlice.actions;

export default authSlice.reducer;