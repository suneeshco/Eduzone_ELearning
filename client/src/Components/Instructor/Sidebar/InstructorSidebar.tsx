import React from 'react';
import { Link } from 'react-router-dom';

export const InstructorSidebar = () => {
 return (
    <div className="w-64 bg-gray-800 text-white h-screen">
      <div className="p-6">
        <h2 className="text-2xl mb-4">Instructor Dashboard</h2>
        {/* Links */}
        <ul>
          <li className="mb-3 bg-gray-700 rounded-lg p-2 mx-2">
            <Link to="/instructor" className="flex items-center space-x-2">
              <span>Dashboard</span>
            </Link>
          </li>
          <li className="mb-3 bg-gray-700 rounded-lg p-2 mx-2">
            <Link to="/instructor/myCourses" className="flex items-center space-x-2">
              <span>My Courses</span>
            </Link>
          </li>
          <li className="mb-3 bg-gray-700 rounded-lg p-2 mx-2">
            <Link to="/instructor/addCourse" className="flex items-center space-x-2">
              <span>Add New Course</span>
            </Link>
          </li>
          
        </ul>
      </div>
    </div>
 );
};
