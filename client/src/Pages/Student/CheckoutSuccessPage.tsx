import Navbar from "../../Components/Student/Header/Navbar";


import React from 'react'
import Footer from "../../Components/Student/Header/Footer";
import CheckoutSuccess from "../../Components/Student/Payment/CheckoutSuccess";

const CheckoutSuccessPage:React.FC = () => {
  return (
    <div>
      <Navbar/>
      <CheckoutSuccess/>
      <Footer/>
    </div>
  )
}

export default CheckoutSuccessPage
