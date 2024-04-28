
import {
  ShoppingBagIcon,
  UserCircleIcon,
} from "@heroicons/react/24/solid";





import React from 'react';

import { Link, useLocation } from 'react-router-dom';


export const AdminSidebar: React.FC = () => {

  const location = useLocation()


  return (


    <>


      <div className="h-full pl-8 pt-14 p-3 space-y-2 w-full bg-white border-e border-2 border-black  dark:text-gray-800 ">

        <div className="divide-y dark:divide-gray-300">
          <ul className="pt-2 pb-4 my-2 space-y-2 text-sm">
            <Link to={'/admin'}><li className={` my-2 `}>
              <a rel="noopener noreferrer" className={`flex items-center px-3 w-[90%] py-2.5  ${location.pathname === '/admin' ? 'bg-indigo-300  border-black font-bold' : 'bg-white hover:bg-indigo-50'}   `}>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" className="w-5 h-5 fill-current dark:text-gray-600">
                  <path d="M68.983,382.642l171.35,98.928a32.082,32.082,0,0,0,32,0l171.352-98.929a32.093,32.093,0,0,0,16-27.713V157.071a32.092,32.092,0,0,0-16-27.713L272.334,30.429a32.086,32.086,0,0,0-32,0L68.983,129.358a32.09,32.09,0,0,0-16,27.713V354.929A32.09,32.09,0,0,0,68.983,382.642ZM272.333,67.38l155.351,89.691V334.449L272.333,246.642ZM256.282,274.327l157.155,88.828-157.1,90.7L99.179,363.125ZM84.983,157.071,240.333,67.38v179.2L84.983,334.39Z"></path>
                </svg>
                <span className='pl-3'>Dashboard</span>
              </a>
            </li></Link>
            <Link to={'/admin/category'}><li className=" my-2">
              <a rel="noopener noreferrer" href="#" className={`flex w-[90%] items-center px-3 py-2.5  ${location.pathname === '/admin/category' ? 'bg-indigo-300  border-black font-bold' : 'bg-white hover:bg-indigo-50'}  `}>
                <ShoppingBagIcon className="h-5 w-5" />
                <span className='pl-3'>Categories</span>
              </a>
            </li></Link>
            <Link to={'/admin/studentList'}><li className=" my-2">
              <a rel="noopener noreferrer" href="#" className={`flex items-center w-[90%] px-3 py-2.5 ${location.pathname === '/admin/studentList' ? 'bg-indigo-300 font-bold' : 'bg-white hover:bg-indigo-50'} `}>
                <UserCircleIcon className="h-5 w-5" />
                <span className='pl-3'>Student List</span>
              </a>
            </li></Link>
            <Link to={'/admin/instructorList'}>< li className=" my-2">
              <a rel="noopener noreferrer" href="#" className={`flex items-center w-[90%] px-3 py-2.5  ${location.pathname === '/admin/instructorList' ? 'bg-indigo-300 font-bold' : 'bg-white hover:bg-indigo-50'}  `}>
                <UserCircleIcon className="h-5 w-5" />
                <span className='pl-3'>Instructor List</span>
              </a>
            </li></Link>
            <Link to={'/admin/courseList'}><li>
              <a rel="noopener noreferrer" href="#" className={`flex items-center w-[90%] px-3 py-2.5  ${location.pathname === '/admin/courseList' ? 'bg-indigo-300 font-bold' : 'bg-white hover:bg-indigo-50'}  `}>
                <ShoppingBagIcon className="h-5 w-5" />
                <span className='pl-3'>Courses</span>
              </a>
            </li></Link>
            <Link to={'/admin/notifications'}><li className={` my-2 `}>
              <a rel="noopener noreferrer" className={`flex items-center px-3 w-[90%] py-2.5  ${location.pathname === '/admin/notifications' ? 'bg-indigo-300  border-black font-bold' : 'bg-white hover:bg-indigo-50'}   `}>
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                  <path d="M12 2C11.45 2 11 2.45 11 3V4.15C7.39 4.58 4.58 7.37 4.15 11H3C2.45 11 2 11.45 2 12C2 12.55 2.45 13 3 13H4.15C4.58 16.63 7.39 19.42 11 19.85V21C11 21.55 11.45 22 12 22C12.55 22 13 21.55 13 21V19.85C16.61 19.42 19.42 16.63 19.85 13H21C21.55 13 22 12.55 22 12C22 11.45 21.55 11 21 11H19.85C19.42 7.37 16.61 4.58 13 4.15V3C13 2.45 12.55 2 12 2ZM12 6C14.76 6 17 8.24 17 11C17 13.76 14.76 16 12 16C9.24 16 7 13.76 7 11C7 8.24 9.24 6 12 6ZM16.5 13.5C16.5 12.67 15.83 12 15 12C14.17 12 13.5 12.67 13.5 13.5C13.5 14.33 14.17 15 15 15C15.83 15 16.5 14.33 16.5 13.5Z" fill="currentColor" />
                </svg>
                <span className='pl-3'>Notifications</span>
              </a>
            </li></Link>
          </ul>
          <ul className="pt-4 pb-2 space-y-1 text-sm">

            <li>
              <a rel="noopener noreferrer" href="#" className="flex items-center w-[90%] p-2 space-x-3 rounded-full hover:bg-red-400 hover:border-2 hover:border-black">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" className="w-5 h-5 fill-current  dark:text-gray-600">
                  <path d="M440,424V88H352V13.005L88,58.522V424H16v32h86.9L352,490.358V120h56V456h88V424ZM320,453.642,120,426.056V85.478L320,51Z"></path>
                  <rect width="32" height="64" x="256" y="232"></rect>
                </svg>
                <span>Logout</span>
              </a>
            </li>
          </ul>
        </div>
      </div>

    </>


  );
};
