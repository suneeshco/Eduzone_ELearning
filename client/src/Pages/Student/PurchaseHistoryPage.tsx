import React from 'react'
import Navbar from "../../Components/Student/Header/Navbar";
import Footer from "../../Components/Student/Header/Footer";
import PurchaseHistory from '../../Components/Student/Courses/PurchaseHistory';

const PurchaseHistoryPage:React.FC = () => {
    return (
        <div>
          <Navbar/>
          <PurchaseHistory/>
          <Footer/>
        </div>
      )
}

export default PurchaseHistoryPage
