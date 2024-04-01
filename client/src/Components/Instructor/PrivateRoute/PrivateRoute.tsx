import { Navigate,Outlet } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../Redux/RootState/RootState";
import Denied from "../../Student/PrivateRoute/Denied";

import React, { useEffect, useState } from 'react'
import { adminApiRequest, instructorApiRequest, studentApiRequest } from "../../../api/axios";
import toast from "react-hot-toast";
import { instructorLogout } from "../../../Redux/Slices/InstructorAuth";
import { useNavigate } from "react-router-dom";
import { studentLogout } from "../../../Redux/Slices/StudentAuth";


export const  PrivateRoute: React.FC = () => {


  const navigate = useNavigate()
    const {userInfo} = useSelector((state:RootState)=>state.studentAuth)

    const [isBlocked, setIsBlocked] = useState<boolean>(false);
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
            navigate('/student/login')
          }
        }else{
          navigate('/student/login')
        }
      };
  
      checkUserStatus();
    }, [userInfo,studentLogout]);
  
    return isBlocked ? <Navigate to="/student/login" replace /> : ( userInfo?.role === 'instructor' ? <Outlet /> : <Denied/>);
}


export const  NotPrivateRoute = () => {

  const {userInfo} = useSelector((state:RootState)=>state.studentAuth)
  return userInfo?.role==='student' ? <Navigate to='/' replace /> : userInfo?.role==='instructor' ? <Navigate to='/instructor' replace /> : <Outlet/> 
}

