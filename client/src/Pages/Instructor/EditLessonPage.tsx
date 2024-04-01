import React from 'react'
import Navbar from '../../Components/Instructor/Header/Navbar';
import { InstructorSidebar } from '../../Components/Instructor/Sidebar/InstructorSidebar';
import CourseView from '../../Components/Instructor/AddCourse/CourseView';
import EditLesson from '../../Components/Instructor/AddCourse/EditLesson';

const EditLessonPage = () => {
  return (
    <div>
      <div className='fixed top-0 left-0 w-full'>
        <Navbar />
      </div>
      <div className="mt-20">
      <EditLesson/>
    </div>
    </div>
  )
}

export default EditLessonPage