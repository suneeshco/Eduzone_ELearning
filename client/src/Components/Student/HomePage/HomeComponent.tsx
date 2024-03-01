import React from 'react';

const HomeComponent = () => {
 return (
    <div className="flex items-center h-screen bg-gray-200">
      <div className="max-w-md mx-auto bg-white rounded-xl shadow-md overflow-hidden md:max-w-2xl">
        <div className="md:flex">
          
          <div className="p-8">
            {/* Text content goes here */}
            <div className="uppercase tracking-wide text-sm text-indigo-500 font-semibold">Your Title Here</div>
            <p className="mt-2 text-gray-500">Your detailed text goes here. It can be a description or any other relevant information you want to display.</p>
          </div>
          <div className="md:flex-shrink-0">
            {/* This is the oval-shaped image */}
            <img className="h-48 w-full object-cover md:w-48" src="your-image-url-here" alt="An oval-shaped image" />
          </div>
        </div>
      </div>
    </div>
 );
};

export default HomeComponent;
