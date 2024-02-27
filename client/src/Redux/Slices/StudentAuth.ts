import { createSlice } from "@reduxjs/toolkit";

export interface UserData{
  firstname: string;
  lastname: string;
  email: string;
  mobile: number;
  password: string;
}

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
        }
    }
})


export const {setStudentCredentials,studentLogout} = authSlice.actions;

export default authSlice.reducer;