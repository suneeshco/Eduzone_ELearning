// import React from 'react';
// import { Link } from 'react-router-dom';
// import {
//   Card,
//   Typography,
//   List,
//   ListItem,
//   ListItemPrefix,
//   ListItemSuffix,
//   Chip,
// } from "@material-tailwind/react";
import {
  PresentationChartBarIcon,
  ShoppingBagIcon,
  UserCircleIcon,
  Cog6ToothIcon,
  InboxIcon,
  PowerIcon,
} from "@heroicons/react/24/solid";

// export const AdminSidebar = () => {
//  return (

//     <>
// <Card className="h-screen md:h-[calc(100vh-2rem)] w-full md:max-w-[16rem] p-4 shadow-xl shadow-blue-gray-900/5"  placeholder={undefined}>
//   <List  placeholder={undefined}>
//     <Link to={'/admin'}>
//       <ListItem className='text-black'  placeholder={undefined}>
//         <ListItemPrefix  placeholder={undefined}>
//           <PresentationChartBarIcon className="h-5 w-5" />
//         </ListItemPrefix>
//         Dashboard
//       </ListItem>
//     </Link>
//     <Link to={'/admin/category'}>
//       <ListItem className='text-black'  placeholder={undefined}>
//         <ListItemPrefix  placeholder={undefined}>
//           <ShoppingBagIcon className="h-5 w-5" />
//         </ListItemPrefix>
//         Category Management
//       </ListItem>
//     </Link>
//     <Link to={'/admin/studentList'}>
//       <ListItem className='text-black'  placeholder={undefined}>
//         <ListItemPrefix  placeholder={undefined}>
//           <UserCircleIcon className="h-5 w-5" />
//         </ListItemPrefix>
//         Student List
//       </ListItem>
//     </Link>
//     <Link to={'/admin/instructorList'}>
//       <ListItem className='text-black'  placeholder={undefined}>
//         <ListItemPrefix  placeholder={undefined}>
//           <UserCircleIcon className="h-5 w-5" />
//         </ListItemPrefix>
//         Instructor List
//       </ListItem>
//     </Link>
//     <Link to={'/admin/courseList'}>
//       <ListItem className='text-black'  placeholder={undefined}>
//         <ListItemPrefix  placeholder={undefined}>
//           <ShoppingBagIcon className="h-5 w-5" />
//         </ListItemPrefix>
//         Course List
//       </ListItem>
//     </Link>
//     <ListItem className='text-black'  placeholder={undefined}>
//       <ListItemPrefix  placeholder={undefined}>
//         <PowerIcon className="h-5 w-5" />
//       </ListItemPrefix>
//       Log Out
//     </ListItem>
//   </List>
// </Card>

// </>
//  );
// };



import React, { useState } from 'react';

import { Link,useLocation } from 'react-router-dom';


export const AdminSidebar: React.FC = () => {
 
  const location = useLocation()


  return (
    

    <>


      <div className="h-full pl-8 pt-28 p-3 space-y-2 w-full bg-white border-e border-2 border-black  dark:text-gray-800 ">
        
        <div className="divide-y dark:divide-gray-300">
          <ul className="pt-2 pb-4 my-2 space-y-2 text-sm">
            <Link to={'/admin'}><li className={` my-2 `}>
              <a rel="noopener noreferrer" className={`flex items-center px-3 w-[90%] py-2.5 font-bold ${location.pathname === '/admin' ? 'bg-indigo-300 border-2 border-black' : 'bg-white'}   border rounded-full`}>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" className="w-5 h-5 fill-current dark:text-gray-600">
                  <path d="M68.983,382.642l171.35,98.928a32.082,32.082,0,0,0,32,0l171.352-98.929a32.093,32.093,0,0,0,16-27.713V157.071a32.092,32.092,0,0,0-16-27.713L272.334,30.429a32.086,32.086,0,0,0-32,0L68.983,129.358a32.09,32.09,0,0,0-16,27.713V354.929A32.09,32.09,0,0,0,68.983,382.642ZM272.333,67.38l155.351,89.691V334.449L272.333,246.642ZM256.282,274.327l157.155,88.828-157.1,90.7L99.179,363.125ZM84.983,157.071,240.333,67.38v179.2L84.983,334.39Z"></path>
                </svg>
                <span>Dashboard</span>
              </a>
            </li></Link>
            <Link to={'/admin/category'}><li className=" my-2">
              <a rel="noopener noreferrer" href="#" className={`flex w-[90%] items-center px-3 py-2.5 font-bold ${location.pathname === '/admin/category' ? 'bg-indigo-300 border-2 border-black' : 'bg-white'}  border rounded-full`}>
              <ShoppingBagIcon className="h-5 w-5" />
                <span>Categories</span>
              </a>
            </li></Link>
            <Link to={'/admin/studentList'}><li className=" my-2">
              <a rel="noopener noreferrer" href="#" className={`flex items-center w-[90%] px-3 py-2.5 font-bold ${location.pathname === '/admin/studentList' ? 'bg-indigo-300 border-2 border-black' : 'bg-white'}  border rounded-full`}>
              <UserCircleIcon className="h-5 w-5" />
                <span>Student List</span>
              </a>
            </li></Link>
            <Link to={'/admin/instructorList'}>< li className=" my-2">
              <a rel="noopener noreferrer" href="#" className={`flex items-center w-[90%] px-3 py-2.5 font-bold ${location.pathname === '/admin/instructorList' ? 'bg-indigo-300 border-2 border-black' : 'bg-white'}  border rounded-full`}>
              <UserCircleIcon className="h-5 w-5" />
                <span>Instructor List</span>
              </a>
            </li></Link>
            <Link to={'/admin/courseList'}><li>
              <a rel="noopener noreferrer" href="#" className={`flex items-center w-[90%] px-3 py-2.5 font-bold ${location.pathname === '/admin/courseList' ? 'bg-indigo-300 border-2 border-black' : 'bg-white'}  border rounded-full`}>
              <ShoppingBagIcon className="h-5 w-5" />
                <span>Courses</span>
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
