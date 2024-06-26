import React from 'react'
import Navbar from "../../Components/Instructor/Header/Navbar";
import EditInstructorProfile from '../../Components/Instructor/InstructorProfile/EditInstructorProfile';

const EditInstructorProfilePage: React.FC = () => {
  return (
    <div>
      <Navbar/>
      <EditInstructorProfile/>
    </div>
  )
}

export default EditInstructorProfilePage