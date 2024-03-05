import { Navigate,Outlet } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "../../../Redux/RootState/RootState";

import React from 'react'

export const  StudentPrivateRoute = () => {

    const {userInfo} = useSelector((state:RootState)=>state.studentAuth)
  return userInfo ? <Outlet/> : <Navigate to='/student/login' replace />
}


export const  StudentNotPrivateRoute = () => {

    const {userInfo} = useSelector((state:RootState)=>state.studentAuth)
    return userInfo ? <Navigate to='/' replace /> : <Outlet/> 
}

