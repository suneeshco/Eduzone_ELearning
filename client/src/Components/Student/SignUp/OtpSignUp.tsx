import React, { useState , useEffect } from 'react';
import { apiRequest } from '../../../api/axios';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { Input } from "@material-tailwind/react";

const OtpSignUp : React.FC = () => {
    const navigate = useNavigate()
  const [otp, setOtp] = useState('');
  const [message, setMessage] = useState('');
  const [timer, setTimer] = useState(90); 
  const [isTimerActive, setIsTimerActive] = useState(true);



  useEffect(() => {
    const countdown = setInterval(() => {
       if (isTimerActive) {
         setTimer((prevTimer) => {
           if (prevTimer > 0) {
             return prevTimer - 1;
           } else {
             setIsTimerActive(false); // Set isTimerActive to false when timer reaches zero
             return 0;
           }
         });
       }
    }, 1000);
   
    return () => clearInterval(countdown);
   }, [isTimerActive]);

  useEffect(() => {
    startTimer();
  }, []);

  const startTimer = () => {
    setTimer(90);
    setIsTimerActive(true);
  };


  const handleResendOtp = async () => {
    const response = await apiRequest({
      method: 'get',
      url: '/studentResendOtp',
      
  });
  if(response.success){
    toast.success(response.success)
  }else if(response.error){
    toast.error(response.error)
  }

  }


  const handleVerifyOtp = async () => {
    if(otp.length<4 ){
        toast.error("Should Contain 4 digits")
    }else{

        try {
            const response = await apiRequest({
              method: 'post',
              url: '/studentOtp',
              data: {
                  otp: otp
              }
          });
            console.log(response);
            if(response.error){
              setMessage(response.error);
              toast.error(response.error)
            }else if (response.user){
              toast.success("User Registered Successfully!")
              navigate('/student/login')
            }else if(response.expired){
              toast.error("Otp Expired")
            }
            
            
          } catch (err) {
            console.error(err);
            setMessage('Failed to send reset email');
          }
    }
   
  };

  return (
    <div className="max-w-md mx-auto m-4 mt-40 bg-white p-8 border border-gray-300 rounded-md shadow-md">
      <h2 className="text-2xl font-semibold mb-4">Verify Otp</h2>
      <div className="relative flex w-full max-w-[24rem]">
      <Input
          type="email"
          value={otp}
          onChange={(e) => setOtp(e.target.value)}
          className="pr-20"
          containerProps={{
            className: "min-w-0",
          }} crossOrigin={undefined}      />
      <button
 className={`bg-white border border-gray-300 text-sm py-1 px-3 rounded ${isTimerActive ? 'text-gray-500 cursor-not-allowed' : 'text-black hover:bg-blue-200 hover:border-gray-400'}`}
 disabled={isTimerActive}
 onClick={handleResendOtp}
>
 Resend
</button>
    </div>
    <br /><br />
    <p className="text-sm" style={{ color: "red" ,marginTop:-10}}>
              Resend OTP in {timer}s
            </p>
      <button
        onClick={handleVerifyOtp}
        className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition duration-200"
      >
        Verify
      </button>
      {message && <p className='text-sm mt-2'>{message}</p>}
    </div>
  );
};

export default OtpSignUp;
