import React from 'react'
import Navbar from '../../Components/Instructor/Header/Navbar';
import { InstructorSidebar } from '../../Components/Instructor/Sidebar/InstructorSidebar';
import AddCourse from '../../Components/Instructor/AddCourse/AddCourse';

const AddCoursePage = () => {
  return (
    <div  >
       <div className='fixed top-0 left-0 w-full'>
        <Navbar />
      </div>
     
      <div className="mt-20"> 
        <AddCourse />
      </div>
      
    </div>
  )
}

export default AddCoursePage
