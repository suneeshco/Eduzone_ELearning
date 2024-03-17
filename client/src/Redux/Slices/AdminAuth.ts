import { createSlice } from "@reduxjs/toolkit";
import { AdminData } from "../../utils/apiTypes/ApiTypes";


export interface UserState{
    adminInfo : AdminData | null;
}

const initialState: UserState = {
    adminInfo: localStorage.getItem('adminInfo')  
      ? JSON.parse(localStorage.getItem('adminInfo')!) // Using the non-null assertion operator (!)
      : null,
  };
  


const adminAuthSlice= createSlice({
    name: 'adminAuth',
    initialState,
    reducers: {
        setAdminCredentials : (state,action)=>{
            state.adminInfo=action.payload;
            localStorage.setItem('adminInfo',JSON.stringify(action.payload))
        },
        adminLogout: (state,action)=>{
            state.adminInfo=null;
            localStorage.removeItem('adminInfo')
            localStorage.removeItem('adminToken')
        }
    }
})


export const {setAdminCredentials,adminLogout} = adminAuthSlice.actions;

export default adminAuthSlice.reducer;