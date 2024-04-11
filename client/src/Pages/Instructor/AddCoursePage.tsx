import React from 'react'
import Navbar from '../../Components/Instructor/Header/Navbar';
import { InstructorSidebar } from '../../Components/Instructor/Sidebar/InstructorSidebar';
import AddCourse from '../../Components/Instructor/AddCourse/AddCourse';

const AddCoursePage = () => {
  return (
    <div>
      <div className='fixed z-50 top-0 left-0 w-full'>
        <Navbar />
      </div>
      <div className="flex flex-col md:flex-row  ">
        <div className="md:w-1/5">
          <InstructorSidebar />
        </div>

         <div className="md:w-4/5 h-full ">
          <AddCourse />
        </div>
      </div>
    </div>
  )
}

export default AddCoursePage
