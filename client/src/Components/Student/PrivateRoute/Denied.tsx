import React from 'react';

const Denied = () => {
  return (
    <div className="flex justify-center items-center h-screen">
      <div className="bg-gray-200 p-8 rounded-lg shadow-md">
        <h1 className="text-2xl font-bold text-center text-gray-800">
          You are not allowed to enter this page
        </h1>
      </div>
    </div>
  );
};

export default Denied;

