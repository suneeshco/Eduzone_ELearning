import React, { useState } from 'react';
import { resetPassword } from '../../../api/axiosPatch';
import { useParams } from 'react-router-dom';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';





const PasswordReset: React.FC = () => {

    const navigate = useNavigate();
    const { userId, token } = useParams();
  const [newPassword, setNewPassword] = useState<string>('');
  const [confirmPassword, setConfirmPassword] = useState<string>('');

  const handleNewPasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNewPassword(event.target.value);
  };

  const handleConfirmPasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setConfirmPassword(event.target.value);
  };

  const handleReset = () => {
    const response = resetPassword(userId,token,newPassword)
    toast.success("Password Changed Successfully. Please Login !")
    navigate('/student/login')
  };

  return (
    <div className="max-w-md mx-auto m-4 bg-white p-8 border border-gray-300 rounded-md shadow-md">
      <h2 className="text-2xl font-semibold mb-4">Reset Password</h2>
      <div className="mb-4">
        <label htmlFor="newPassword" className="block font-medium text-gray-700 mb-2">New Password</label>
        <input
          type="password"
          id="newPassword"
          className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:border-blue-300"
          value={newPassword}
          onChange={handleNewPasswordChange}
        />
      </div>
      <div className="mb-4">
        <label htmlFor="confirmPassword" className="block font-medium text-gray-700 mb-2">Confirm Password</label>
        <input
          type="password"
          id="confirmPassword"
          className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:border-blue-300"
          value={confirmPassword}
          onChange={handleConfirmPasswordChange}
        />
      </div>
      <button
        className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition duration-200"
        onClick={handleReset}
      >
        Reset Password
      </button>
    </div>
  );
};

export default PasswordReset;
