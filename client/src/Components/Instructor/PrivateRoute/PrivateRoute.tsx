import { Navigate,Outlet } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../Redux/RootState/RootState";

import React, { useEffect, useState } from 'react'
import { adminApiRequest, instructorApiRequest } from "../../../api/axios";
import toast from "react-hot-toast";
import { instructorLogout } from "../../../Redux/Slices/InstructorAuth";

export const  PrivateRoute = () => {

    const {instructorInfo} = useSelector((state:RootState)=>state.instructorAuth)

    const [isBlocked, setIsBlocked] = useState(false);
    const dispatch = useDispatch()
  
    useEffect(() => {
      const checkUserStatus = async () => {
        if (instructorInfo) {
          const response = await instructorApiRequest({
            method: 'get',
            url: `/getInstructorDetails/${instructorInfo._id}`,
          });
  
          if (!response.status) {
            toast.error('Your Account Has Been Blocked');
            setIsBlocked(true);
            dispatch(instructorLogout({}))
          }
        }
      };
  
      checkUserStatus();
    }, [instructorInfo,instructorLogout]);
  
    return isBlocked ? <Navigate to="/instructor/login" replace /> : <Outlet />;
}


export const  NotPrivateRoute = () => {

    const {instructorInfo} = useSelector((state:RootState)=>state.instructorAuth)
  return instructorInfo ? <Navigate to='/instructor' replace /> : <Outlet/> 
}

