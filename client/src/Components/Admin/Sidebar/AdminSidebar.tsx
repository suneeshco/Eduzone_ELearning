import React from 'react';
import { Link } from 'react-router-dom';

export const AdminSidebar = () => {
 return (
    <div className="w-64 bg-gray-800 text-white h-screen">
      <div className="p-6">
        <h2 className="text-2xl mb-4">Admin Dashboard</h2>
        
        <ul>
          <li className="mb-3 bg-gray-700 rounded-lg p-2 mx-2">
            <Link to="/admin" className="flex items-center space-x-2">
              <span>Dashboard</span>
            </Link>
          </li>
          <li className="mb-3 bg-gray-700 rounded-lg p-2 mx-2">
            <Link to="/admin/category" className="flex items-center space-x-2">
              <span>Category Management</span>
            </Link>
          </li>
          <li className="mb-3 bg-gray-700 rounded-lg p-2 mx-2">
            <Link to="/student-list" className="flex items-center space-x-2">
              <span>Student List</span>
            </Link>
          </li>
        </ul>
      </div>
    </div>
 );
};
