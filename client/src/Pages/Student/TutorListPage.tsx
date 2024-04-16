import React from 'react'
import Navbar from "../../Components/Student/Header/Navbar";
import Footer from "../../Components/Student/Header/Footer";
import TutorList from '../../Components/Student/HomePage/TutorList';

const TutorListPage:React.FC = () => {
    return (
        <div>
          <Navbar/>
          <TutorList/>
          <Footer/>
        </div>
      )
}

export default TutorListPage
