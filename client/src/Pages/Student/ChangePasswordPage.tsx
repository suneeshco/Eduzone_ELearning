import Navbar from "../../Components/Student/Header/Navbar";


import React from 'react'
import ChangePassword from "../../Components/Student/StudentProfile/ChangePassword";

const ChangePasswordPage:React.FC = () => {
  return (
    <div>
      <Navbar/>
      <ChangePassword/>
    </div>
  )
}

export default ChangePasswordPage