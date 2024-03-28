import Navbar from "../../Components/Student/Header/Navbar";


import React from 'react'
import CourseList from "../../Components/Student/HomePage/CourseList";
import Footer from "../../Components/Student/Header/Footer";

const CourseListPage = () => {
  return (
    <div>
      <Navbar/>
      <CourseList/>
      <Footer/>
    </div>
  )
}

export default CourseListPage
