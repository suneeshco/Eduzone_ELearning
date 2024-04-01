import React from 'react'
import Navbar from '../../Components/Instructor/Header/Navbar'
import { InstructorSidebar } from '../../Components/Instructor/Sidebar/InstructorSidebar';
import MyCourses from '../../Components/Instructor/AddCourse/MyCourses';

const InstructorMyCoursesPage = () => {
  return (
    <div>
      <div className='fixed top-0 left-0 w-full'>
        <Navbar />
      </div>
      <div className="mt-20">
      <MyCourses/>
      </div>
    
    </div>
  )
}

export default InstructorMyCoursesPage
