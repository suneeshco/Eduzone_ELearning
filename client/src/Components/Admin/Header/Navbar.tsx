import React from 'react';
import { Link } from 'react-router-dom';
import LogoImage from '../../../assets/images/Logos/Eduzone_logo1.png';
import { useDispatch , useSelector } from 'react-redux';
import { RootState } from '../../../Redux/RootState/RootState';
import { adminLogout } from '../../../Redux/Slices/AdminAuth';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

const Navbar: React.FC = () => {

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const {adminInfo} = useSelector((state:RootState)=>state.adminAuth)

  const handleLogout = () => {
    dispatch(adminLogout({}));
    toast.success('Logged Out Successfully')
    navigate("/admin")
  };

  return (
    <nav className="bg-white-800">
      <div className="max-w-7.5xl mx-auto px-2 py-2 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex-shrink-0">
            <Link to="/instructor" className="flex items-center">
              <img src={LogoImage} alt="Logo" className="h-10"/> 
            </Link>
          </div>
          <div className="hidden sm:block ml-16"> 
            <div className="flex space-x-4">
              
            </div>
          </div>
          <div className="hidden sm:block ml-auto">
            {adminInfo ? (
              <button onClick={handleLogout} className="text-black-300 bg-red-300 hover:bg-gray-700 px-3 py-2 rounded-md font-medium">Logout</button>
            ) : (
              <Link to="/admin/login" className="text-black-300 bg-green-300 hover:bg-gray-700 px-3 py-2 rounded-md font-medium">Login</Link>
            )}
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
