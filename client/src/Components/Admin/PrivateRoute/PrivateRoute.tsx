import { Navigate,Outlet } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "../../../Redux/RootState/RootState";

import React from 'react'

export const  AdminPrivateRoute = () => {

    const {adminInfo} = useSelector((state:RootState)=>state.adminAuth)
  return adminInfo ? <Outlet/> : <Navigate to='/admin/login' replace />
}


export const  AdminNotPrivateRoute = () => {

    const {adminInfo} = useSelector((state:RootState)=>state.adminAuth)
    return adminInfo ? <Navigate to='/admin' replace /> : <Outlet/> 
}

