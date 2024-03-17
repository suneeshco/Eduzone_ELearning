import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import LogoImage from '../../../assets/images/Logos/Eduzone_logo1.png';
import ProfilePhoto from '../../../assets/images/DefaultImages/profileDefault.png'
import { useDispatch , useSelector } from 'react-redux';
import { RootState } from '../../../Redux/RootState/RootState';
import { studentLogout } from '../../../Redux/Slices/StudentAuth';
import toast from 'react-hot-toast';
import { studentApiRequest } from '../../../api/axios';

const Navbar: React.FC = () => {

  

  let {userInfo} = useSelector((state:RootState)=>state.studentAuth)
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
          dispatch(studentLogout({}))
          userInfo = null
        }
      }
    };

    checkUserStatus();
  }, [userInfo,studentLogout]);

  const handleLogout = () => {
    dispatch(studentLogout({}));
    toast.success('Logged Out Successfully')
  };

  return (
    <nav className="bg-white-800">
      <div className="max-w-7.5xl mx-auto px-2 py-2 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex-shrink-0">
            <Link to="/" className="flex items-center">
              <img src={LogoImage} alt="Logo" className="h-10"/> 
            </Link>
          </div>
          <div className="hidden sm:block "> 
            <div className="flex space-x-16 ">
              <Link to="/" className="text-black-300 hover:bg-gray-700 px-5 py-2 rounded-md  font-bold">Home</Link>
              <Link to="/about" className="text-black-300 hover:bg-gray-700 px-5 py-2 rounded-md  font-bold">Courses</Link>
              <Link to="/services" className="text-black-300 hover:bg-gray-700 px-5 py-2 rounded-md  font-bold">Tutors</Link>
              <Link to="/contact" className="text-black-300 hover:bg-gray-700 px-5 py-2 rounded-md  font-bold">About</Link>
            </div>
          </div>
          

          <div className="hidden sm:flex items-center space-x-4">
            {userInfo && (
              <div>
                <Link to="/student/profile"><img src={ProfilePhoto} alt="Profile" className="h-8 w-8 rounded-full" /> </Link>
              </div>
            )}
            <div>
              {userInfo ? (
                <button onClick={handleLogout} className="text-black-300 bg-red-300 hover:bg-gray-700 px-3 py-2 rounded-md font-medium">Logout</button>
              ) : (
                <Link to="/student/login" className="text-black-300 bg-green-300 hover:bg-gray-700 px-3 py-2 rounded-md font-medium">Login</Link>
              )}
            </div>
          </div>
          
          <div className="flex md:hidden">
            <button className="text-gray-300 hover:bg-gray-700 px-3 py-2 rounded-md text-sm font-medium focus:outline-none focus:ring">

              <svg className="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7"/>
              </svg>
            </button>
          </div>
        </div>
      </div>
      
    </nav>
  );
};

export default Navbar;
