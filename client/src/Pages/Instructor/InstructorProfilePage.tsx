import Navbar from "../../Components/Instructor/Header/Navbar";


import React from 'react'
import InstructorProfile from "../../Components/Instructor/InstructorProfile/InstructorProfile";

const InstructorProfilePage : React.FC= () => {
  return (
    <div>
      <Navbar/>
      <InstructorProfile/>
    </div>
  )
}

export default InstructorProfilePage
