import { Navigate,Outlet, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../Redux/RootState/RootState";

import React, { useEffect, useState } from 'react'
import { studentApiRequest } from "../../../api/axios";
import toast from "react-hot-toast";
import { setStudentCredentials, studentLogout } from "../../../Redux/Slices/StudentAuth";

export const StudentPrivateRoute = () => {
  const { userInfo } = useSelector((state: RootState) => state.studentAuth);
  const [isBlocked, setIsBlocked] = useState(false);
  const dispatch = useDispatch()

  useEffect(() => {
    const checkUserStatus = async () => {
      if (userInfo) {
        const response = await studentApiRequest({
          method: 'get',
          url: `/getStudentDetails/${userInfo._id}`,
        });

        if (!response.status) {
          toast.error('Your Account Has Been Blocked');
          setIsBlocked(true);
          dispatch(studentLogout({}))
        }
      }
    };

    checkUserStatus();
  }, [userInfo,studentLogout]);

  return isBlocked ? <Navigate to="/student/login" replace /> : <Outlet />;
};


export const  StudentNotPrivateRoute = () => {

    const {userInfo} = useSelector((state:RootState)=>state.studentAuth)
    return userInfo ? <Navigate to='/' replace /> : <Outlet/> 
}



