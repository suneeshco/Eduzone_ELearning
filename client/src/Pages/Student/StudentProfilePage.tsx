import Navbar from "../../Components/Student/Header/Navbar";


import React from 'react'
import StudentProfile from "../../Components/Student/StudentProfile/StudentProfile";

const StudentProfilePage: React.FC = () => {
  return (
    <div>
      <Navbar/>
      <StudentProfile/>
    </div>
  )
}

export default StudentProfilePage
