import React from 'react'
import Navbar from '../../Components/Instructor/Header/Navbar';
import { InstructorSidebar } from '../../Components/Instructor/Sidebar/InstructorSidebar';
import AddCourse from '../../Components/Instructor/AddCourse/AddCourse';

const AddCoursePage = () => {
  return (
    <div>
      <Navbar/>
    <div className="flex bg-gray-100 min-h-screen">
      
      <InstructorSidebar/>
      <AddCourse/>
    </div>
    </div>
  )
}

export default AddCoursePage
