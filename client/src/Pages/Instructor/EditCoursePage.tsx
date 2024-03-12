import React from 'react'
import Navbar from '../../Components/Instructor/Header/Navbar';
import { InstructorSidebar } from '../../Components/Instructor/Sidebar/InstructorSidebar';
import EditCourse from '../../Components/Instructor/AddCourse/EditCourse';

const AddCoursePage = () => {
  return (
    <div>
      <Navbar/>
    <div className="flex bg-gray-100 min-h-screen">
      
      <InstructorSidebar/>
      <EditCourse/>
    </div>
    </div>
  )
}

export default AddCoursePage
