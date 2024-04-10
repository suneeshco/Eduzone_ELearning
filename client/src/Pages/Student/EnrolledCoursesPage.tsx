import React from 'react'
import Navbar from "../../Components/Student/Header/Navbar";
import Footer from "../../Components/Student/Header/Footer";
import EnrolledCourses from '../../Components/Student/Courses/EnrolledCourses';

const EnrolledCoursesPage:React.FC = () => {
    return (
        <div>
          <Navbar/>
          <EnrolledCourses/>
          <Footer/>
        </div>
      )
}

export default EnrolledCoursesPage
