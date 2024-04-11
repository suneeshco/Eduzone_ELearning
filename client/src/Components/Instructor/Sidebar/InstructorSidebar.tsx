import React, { useState } from 'react';
import ProfileImage from '../../../assets/images/DefaultImages/Profile.png'
import { Link,useLocation } from 'react-router-dom';

import { useSelector } from 'react-redux';
import { RootState } from '../../../Redux/RootState/RootState';

export const InstructorSidebar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  let { userInfo } = useSelector((state: RootState) => state.studentAuth)
  const location = useLocation()


  return (
    

    <>


      <div className="h-full pl-8 pt-28 p-3 space-y-2 w-full bg-white   dark:text-gray-800 ">
        <div className="flex items-center p-2 space-x-4">
          <img src={userInfo?.photo || ProfileImage} alt="" className="w-12 h-12 rounded-full dark:bg-gray-500" />
          <div>
            <h2 className="text-lg font-semibold">{userInfo?.firstname}</h2>
            <span className="flex items-center space-x-1">
              <Link to={'/instructor/profile'}><a rel="noopener noreferrer" className="text-xs hover:underline dark:text-gray-600">View profile</a></Link>
            </span>
          </div>
        </div>
        <div className="divide-y dark:divide-gray-300">
          <ul className="pt-2 pb-4 my-2 space-y-2 text-sm">
            <Link to={'/instructor'}><li className={` my-2 `}>
              <a rel="noopener noreferrer" className={`flex w-[95%] items-center px-3 py-2.5 font-bold ${location.pathname === '/instructor' ? 'bg-indigo-300 border-2 border-black' : 'bg-white'}   border rounded-full`}>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" className="w-5 h-5 fill-current dark:text-gray-600">
                  <path d="M68.983,382.642l171.35,98.928a32.082,32.082,0,0,0,32,0l171.352-98.929a32.093,32.093,0,0,0,16-27.713V157.071a32.092,32.092,0,0,0-16-27.713L272.334,30.429a32.086,32.086,0,0,0-32,0L68.983,129.358a32.09,32.09,0,0,0-16,27.713V354.929A32.09,32.09,0,0,0,68.983,382.642ZM272.333,67.38l155.351,89.691V334.449L272.333,246.642ZM256.282,274.327l157.155,88.828-157.1,90.7L99.179,363.125ZM84.983,157.071,240.333,67.38v179.2L84.983,334.39Z"></path>
                </svg>
                <span>Dashboard</span>
              </a>
            </li></Link>
            <Link to={'/instructor/myCourses'}><li className=" my-2">
              <a rel="noopener noreferrer" href="#" className={`flex w-[95%] items-center px-3 py-2.5 font-bold ${location.pathname === '/instructor/myCourses' ? 'bg-indigo-300 border-2 border-black' : 'bg-white'}  border rounded-full`}>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" className="w-5 h-5 fill-current dark:text-gray-600">
                  <path d="M479.6,399.716l-81.084-81.084-62.368-25.767A175.014,175.014,0,0,0,368,192c0-97.047-78.953-176-176-176S16,94.953,16,192,94.953,368,192,368a175.034,175.034,0,0,0,101.619-32.377l25.7,62.2L400.4,478.911a56,56,0,1,0,79.2-79.195ZM48,192c0-79.4,64.6-144,144-144s144,64.6,144,144S271.4,336,192,336,48,271.4,48,192ZM456.971,456.284a24.028,24.028,0,0,1-33.942,0l-76.572-76.572-23.894-57.835L380.4,345.771l76.573,76.572A24.028,24.028,0,0,1,456.971,456.284Z"></path>
                </svg>
                <span>My Courses</span>
              </a>
            </li></Link>
            <Link to={'/instructor/chat'}><li className=" my-2">
              <a rel="noopener noreferrer" href="#" className={`flex w-[95%] items-center px-3 py-2.5 font-bold ${location.pathname === '/instructor/chat' ? 'bg-indigo-300 border-2 border-black' : 'bg-white'}  border rounded-full`}>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" className="w-5 h-5 fill-current dark:text-gray-600">
                  <path d="M448.205,392.507c30.519-27.2,47.8-63.455,47.8-101.078,0-39.984-18.718-77.378-52.707-105.3C410.218,158.963,366.432,144,320,144s-90.218,14.963-123.293,42.131C162.718,214.051,144,251.445,144,291.429s18.718,77.378,52.707,105.3c33.075,27.168,76.861,42.13,123.293,42.13,6.187,0,12.412-.273,18.585-.816l10.546,9.141A199.849,199.849,0,0,0,480,496h16V461.943l-4.686-4.685A199.17,199.17,0,0,1,448.205,392.507ZM370.089,423l-21.161-18.341-7.056.865A180.275,180.275,0,0,1,320,406.857c-79.4,0-144-51.781-144-115.428S240.6,176,320,176s144,51.781,144,115.429c0,31.71-15.82,61.314-44.546,83.358l-9.215,7.071,4.252,12.035a231.287,231.287,0,0,0,37.882,67.817A167.839,167.839,0,0,1,370.089,423Z"></path>
                  <path d="M60.185,317.476a220.491,220.491,0,0,0,34.808-63.023l4.22-11.975-9.207-7.066C62.918,214.626,48,186.728,48,156.857,48,96.833,109.009,48,184,48c55.168,0,102.767,26.43,124.077,64.3,3.957-.192,7.931-.3,11.923-.3q12.027,0,23.834,1.167c-8.235-21.335-22.537-40.811-42.2-56.961C270.072,30.279,228.3,16,184,16S97.928,30.279,66.364,56.206C33.886,82.885,16,118.63,16,156.857c0,35.8,16.352,70.295,45.25,96.243a188.4,188.4,0,0,1-40.563,60.729L16,318.515V352H32a190.643,190.643,0,0,0,85.231-20.125,157.3,157.3,0,0,1-5.071-33.645A158.729,158.729,0,0,1,60.185,317.476Z"></path>
                </svg>
                <span>Chat</span>
              </a>
            </li></Link>
            <Link to={'/instructor/purchaseHistory'}>< li className=" my-2">
              <a rel="noopener noreferrer" href="#" className={`flex w-[95%] items-center px-3 py-2.5 font-bold ${location.pathname === '/instructor/purchaseHistory' ? 'bg-indigo-300 border-2 border-black' : 'bg-white'}  border rounded-full`}>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" className="w-5 h-5 fill-current dark:text-gray-600">
                  <path d="M203.247,386.414,208,381.185V355.4L130.125,191H93.875L16,355.4v27.042l4.234,4.595a124.347,124.347,0,0,0,91.224,39.982h.42A124.343,124.343,0,0,0,203.247,386.414ZM176,368.608a90.924,90.924,0,0,1-64.231,26.413h-.33A90.907,90.907,0,0,1,48,369.667V362.6l64-135.112L176,362.6Z"></path>
                  <path d="M418.125,191h-36.25L304,355.4v27.042l4.234,4.595a124.347,124.347,0,0,0,91.224,39.982h.42a124.343,124.343,0,0,0,91.369-40.607L496,381.185V355.4ZM464,368.608a90.924,90.924,0,0,1-64.231,26.413h-.33A90.907,90.907,0,0,1,336,369.667V362.6l64-135.112L464,362.6Z"></path>
                  <path d="M272,196.659A56.223,56.223,0,0,0,309.659,159H416V127H309.659a55.991,55.991,0,0,0-107.318,0H96v32H202.341A56.223,56.223,0,0,0,240,196.659V463H136v32H376V463H272ZM232,143a24,24,0,1,1,24,24A24,24,0,0,1,232,143Z"></path>
                </svg>
                <span>Purchase History</span>
              </a>
            </li></Link>
            <Link to={'/instructor/addCourse'}><li>
              <a rel="noopener noreferrer" href="#" className={`flex w-[95%] items-center px-3 py-2.5 font-bold ${location.pathname === '/instructor/addCourse' ? 'bg-indigo-300 border-2 border-black' : 'bg-white'}  border rounded-full`}>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="w-5 h-5 fill-current dark:text-gray-600">
                  <path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10 10-4.5 10-10S17.5 2 12 2zm5 11h-4v4c0 .6-.4 1-1 1s-1-.4-1-1v-4H7c-.6 0-1-.4-1-1s.4-1 1-1h4V7c0-.6.4-1 1-1s1 .4 1 1v4h4c.6 0 1 .4 1 1s-.4 1-1 1z" />
                </svg>
                <span>New Course</span>
              </a>
            </li></Link>
          </ul>
          <ul className="pt-4 pb-2 space-y-1 text-sm">
            
            <li>
              <a rel="noopener noreferrer" href="#" className="flex items-center p-2 space-x-3 rounded-full hover:bg-red-400 hover:border-2 hover:border-black">
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
