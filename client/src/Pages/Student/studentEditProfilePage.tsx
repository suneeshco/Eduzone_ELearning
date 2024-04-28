import Navbar from "../../Components/Student/Header/Navbar";


import React from 'react'
import StudentEditProfile from "../../Components/Student/StudentProfile/StudentEditProfile";

const StudentEditProfilePage: React.FC = () => {
  return (
    <div>
      <Navbar/>
      <StudentEditProfile/>
    </div>
  )
}

export default StudentEditProfilePage
