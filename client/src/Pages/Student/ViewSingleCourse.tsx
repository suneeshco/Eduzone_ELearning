import Navbar from "../../Components/Student/Header/Navbar";


import React from 'react'
import Footer from "../../Components/Student/Header/Footer";
import ViewCourse from "../../Components/Student/HomePage/ViewCourse";

const ViewSingleCourse = () => {
  return (
    <div>
      <Navbar/>
      <ViewCourse/>
      <Footer/>
    </div>
  )
}

export default ViewSingleCourse
