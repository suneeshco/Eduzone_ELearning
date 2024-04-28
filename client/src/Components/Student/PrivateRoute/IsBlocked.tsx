import  { useEffect, useState } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from '../../../Redux/RootState/RootState';
import { studentApiRequest } from '../../../api/axios';
import toast from 'react-hot-toast';

export const StudentIsBlocked = () => {
  const { userInfo } = useSelector((state: RootState) => state.studentAuth);
  const [isBlocked, setIsBlocked] = useState(false);

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
        }
      }
    };

    checkUserStatus();
  }, [userInfo]);

  return isBlocked ? <Navigate to="/student/login" replace /> : <Outlet />;
};
