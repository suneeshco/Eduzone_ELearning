import { Navigate,Outlet } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "../../../Redux/RootState/RootState";

import React from 'react'

export const  PrivateRoute = () => {

    const {instructorInfo} = useSelector((state:RootState)=>state.instructorAuth)
  return instructorInfo ? <Outlet/> : <Navigate to='/instructor/login' replace />
}


export const  NotPrivateRoute = () => {

    const {instructorInfo} = useSelector((state:RootState)=>state.instructorAuth)
  return instructorInfo ? <Navigate to='/instructor' replace /> : <Outlet/> 
}

