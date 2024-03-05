import Navbar from "../../Components/Instructor/Header/Navbar";


import React from 'react'
import HomeComponent from "../../Components/Instructor/HomePage/InstructorHomeComponent";
import { InstructorSidebar } from "../../Components/Instructor/Sidebar/InstructorSidebar";

const HomePage = () => {
  return (
    <div>
      <Navbar/>
    <div className="flex bg-gray-100 min-h-screen">
      
      <InstructorSidebar/>
      <HomeComponent/>
    </div>
    </div>
  )
}

export default HomePage
