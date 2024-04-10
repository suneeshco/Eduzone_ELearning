import React from 'react'
import { useSelector } from 'react-redux';
import { RootState } from '../../../Redux/RootState/RootState';
import { studentApiRequest } from '../../../api/axios';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Course } from '../../../utils/apiTypes/ApiTypes';

interface PayButtonProps {
    courseDetails: Partial<Course>|null; 
}

const PayButton:React.FC<PayButtonProps> = ({courseDetails}) => {
    const navigate = useNavigate()
    let { userInfo } = useSelector((state: RootState) => state.studentAuth);
    const handleCheckout = async() =>{
      
        const response = await studentApiRequest({
            method: 'post',
            url: '/stripe/create-checkout-session',
            data: {
              courseDetails : courseDetails,
              userEmail : userInfo?.email,
              userId : userInfo?._id
            }
          });
          console.log("fifififi",response);
          
          if(response.url){
            window.location.href=response.url
          }
         
          
          
        
    }
  return (
    <>
    {userInfo?.role==='student'?(
      <button
      className=" w-3/5 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white font-semibold py-3 px-6 rounded-full shadow-lg transform hover:scale-105 transition duration-300 ease-in-out"
      onClick={()=>handleCheckout()}>
      Buy Now
    </button>
    ):(
      <button
              className=" w-3/5 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white font-semibold py-3 px-6 rounded-full shadow-lg transform hover:scale-105 transition duration-300 ease-in-out"
              onClick={()=>navigate('/student/login')}>
              Buy Now
            </button>
    )}
        
      
    </>
  )
}

export default PayButton
