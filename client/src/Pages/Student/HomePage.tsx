import Navbar from "../../Components/Student/Header/Navbar";


import React from 'react'
import HomeComponent from "../../Components/Student/HomePage/HomeComponent";
import TrustedComponent from "../../Components/Student/HomePage/TrustedComponent";
import BestSeller from "../../Components/Student/HomePage/BestSeller";
import Testimonial from "../../Components/Student/HomePage/Testimonial";
import TopCategories from "../../Components/Student/HomePage/TopCategories";
import Footer from "../../Components/Student/Header/Footer";

const HomePage = () => {
  return (
    <div >
      <Navbar/>
      <div className="bg-indigo-950">
      <HomeComponent/>
      <TrustedComponent/>
      <BestSeller/>
      <Testimonial/>
      <Footer/>
      </div>
      
    </div>
  )
}

export default HomePage
 