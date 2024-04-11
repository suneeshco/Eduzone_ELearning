import React from 'react'
import Navbar from '../../Components/Instructor/Header/Navbar';
import { InstructorSidebar } from '../../Components/Instructor/Sidebar/InstructorSidebar';
import CourseView from '../../Components/Instructor/AddCourse/CourseView';
import EditLesson from '../../Components/Instructor/AddCourse/EditLesson';

const EditLessonPage = () => {
  return (
    <div>
      <div className='fixed z-50 top-0 left-0 w-full'>
        <Navbar />
      </div>
      <div className="flex flex-col md:flex-row bg-gray-100 ">
        <div className="md:w-1/5">
          <InstructorSidebar />
        </div>

        <div className="md:w-4/5 h-full ">
          <EditLesson />
        </div>
      </div>
    </div>
  )
}

export default EditLessonPage