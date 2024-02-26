import React from 'react';
import { Link } from 'react-router-dom';
import LogoImage from '../../../assets/images/Logos/Eduzone_logo1.png';

const Navbar: React.FC = () => {

  return (
    <nav className="bg-white-800">
      <div className="max-w-7.5xl mx-auto px-2 py-2 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link to="/" className="flex items-center">
              {/* Insert your logo here */}
              <img src={LogoImage} alt="Logo" className="h-10"/> {/* Increase height here */}
            </Link>
          </div>
          {/* Navigation links */}
          <div className="hidden sm:block ml-16"> {/* Adjusted ml to ml-4 */}
            <div className="flex space-x-4">
              <Link to="/" className="text-black-300 hover:bg-gray-700 px-3 py-2 rounded-md  font-bold">Home</Link>
              <Link to="/about" className="text-black-300 hover:bg-gray-700 px-3 py-2 rounded-md  font-bold">Courses</Link>
              <Link to="/services" className="text-black-300 hover:bg-gray-700 px-3 py-2 rounded-md  font-bold">Tutors</Link>
              <Link to="/contact" className="text-black-300 hover:bg-gray-700 px-3 py-2 rounded-md  font-bold">About</Link>
            </div>
          </div>
          {/* Login button */}
          <div className="hidden sm:block ml-auto">
            <Link to="/student/login" className="text-black-300 bg-green-300 hover:bg-gray-700 px-3 py-2 rounded-md  font-medium">Login</Link>
          </div>
          {/* Mobile menu button */}
          <div className="flex md:hidden">
            <button className="text-gray-300 hover:bg-gray-700 px-3 py-2 rounded-md text-sm font-medium focus:outline-none focus:ring">
              {/* Mobile menu icon */}
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
