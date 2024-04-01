import { Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "../../../Redux/RootState/RootState";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import Denied from "../../Student/PrivateRoute/Denied";
import React, { useEffect } from 'react';
import { studentApiRequest } from "../../../api/axios";
import { studentLogout } from "../../../Redux/Slices/StudentAuth";

export const AdminPrivateRoute: React.FC = () => {
 const navigate = useNavigate();
 const { userInfo } = useSelector((state: RootState) => state.studentAuth);
 const dispatch = useDispatch();

 useEffect(() => {
    const checkUserStatus = async () => {
      if (userInfo) {
        const response = await studentApiRequest({
          method: 'get',
          url: `/getStudentDetails/${userInfo._id}`,
        });
      } else {
        navigate('/student/login');
      }
    };

    checkUserStatus();
 }, [userInfo, studentLogout]);

 return !userInfo ? <Navigate to="/student/login" replace /> : (userInfo?.role === 'admin' ? <Outlet /> : <Denied />);
};

export const AdminNotPrivateRoute: React.FC = () => {
 const { adminInfo } = useSelector((state: RootState) => state.adminAuth);
 return adminInfo ? <Navigate to='/admin' replace /> : <Outlet />;
};
