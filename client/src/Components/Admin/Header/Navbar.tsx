import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import LogoImage from '../../../assets/images/Logos/Eduzone_logo1.png';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../../Redux/RootState/RootState';
import { adminLogout } from '../../../Redux/Slices/AdminAuth';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { studentLogout } from '../../../Redux/Slices/StudentAuth';

const Navbar: React.FC = () => {
 const navigate = useNavigate();
 const dispatch = useDispatch();
 const [showLogout, setShowLogout] = useState<boolean>(false);

 const { userInfo } = useSelector((state: RootState) => state.studentAuth);

 const handleLogout = () => {
    dispatch(studentLogout({}));
    toast.success('Logged Out Successfully');
    navigate("/student/login");
 };

 const handleToggleClick = () => {
    setShowLogout(!showLogout);
 };

  return (
    <nav className="bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 ">
    <div className="max-w-7.5xl mx-auto px-2 py-2 sm:px-6 lg:px-8">
      <div className="flex items-center justify-between h-10">
        <div className="flex-shrink-0">
          <Link to="/admin" className="flex items-center">
            <h1 className='text-black text-2xl font-bold'>EDUZONE</h1>
          </Link>
        </div>
        <div className="hidden sm:block ml-16">
          <div className="flex space-x-4">
            
          </div>
        </div>
        <div className="hidden sm:block ml-auto"> 
            <button onClick={handleLogout} className="text-black-300 bg-red-300 hover:bg-gray-700 px-3 py-2 rounded-md font-medium">Logout</button>
        </div>
        <div className="flex md:hidden">
          <button onClick={handleToggleClick} className="text-gray-300 hover:bg-gray-700 px-3 py-2 rounded-md text-sm font-medium focus:outline-none focus:ring">
            <svg className="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7"/>
            </svg>
          </button>
        </div>
      </div>
      
      <div className={`sm:hidden ${showLogout ? 'block' : 'hidden'}`}> 
        <div className="flex flex-col mt-2">
          
          {showLogout && ( 
            <button onClick={handleLogout} className="text-black-300 bg-red-300 hover:bg-gray-700 px-3 py-2 rounded-md font-medium">Logout</button>
          )}
        </div>
      </div>
    </div>
  </nav>

  );
};

export default Navbar;
