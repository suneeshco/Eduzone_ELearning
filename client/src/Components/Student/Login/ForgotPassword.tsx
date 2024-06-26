import React, { useState } from 'react';
import { apiRequest } from '../../../api/axios';
import toast from 'react-hot-toast';

const ForgotPassword : React.FC= () => {
  const [email, setEmail] = useState('');
  // const [message, setMessage] = useState('');

  const handleResetPassword = async () => {
    try {
      const response = await apiRequest({
        method: 'post',
        url: '/studentForgot',
        data: {
            email: email
        }
    });
    
      if(response.message.success){
        toast.success("Email Sent !")
        setEmail("")
      }
      if(response.message.error){
        toast.error(response.message.error)
      }
      
      
    } catch (err) {
      console.error(err);
      
    }
  };

  return (
    <div className="max-w-md mx-auto m-4 mt-40 bg-white p-8 border border-gray-300 rounded-md shadow-md">
      <h2 className="text-2xl font-semibold mb-4">Forgot Password</h2>
      <div className="mb-4">
        <input
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:border-blue-300"
        />
      </div>
      <button
        onClick={handleResetPassword}
        className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition duration-200"
      >
        Reset Password
      </button>
      {/* {message && <p className='text-sm mt-2'>{message}</p>} */}
    </div>
  );
};

export default ForgotPassword;
