import React from 'react'
import Navbar from '../../Components/Instructor/Header/Navbar'
import { InstructorSidebar } from '../../Components/Instructor/Sidebar/InstructorSidebar';
import MyCourses from '../../Components/Instructor/AddCourse/MyCourses';

const InstructorMyCoursesPage = () => {
  return (
    <div>
      <Navbar/>
      <div className="flex bg-gray-100 min-h-screen">
      
      <InstructorSidebar/>
      <MyCourses/>
    </div>
    </div>
  )
}

export default InstructorMyCoursesPage
