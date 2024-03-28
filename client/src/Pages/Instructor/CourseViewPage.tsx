import React from 'react'
import Navbar from '../../Components/Instructor/Header/Navbar';
import { InstructorSidebar } from '../../Components/Instructor/Sidebar/InstructorSidebar';
import CourseView from '../../Components/Instructor/AddCourse/CourseView';

const CourseViewPage = () => {
  return (
    <div>
      <Navbar/>
    <div className="flex bg-gray-100 min-h-screen">
      
      <InstructorSidebar/>
      
      
      <CourseView/>
      
    </div>
    </div>
  )
}

export default CourseViewPage