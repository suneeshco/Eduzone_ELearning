import React, {  useState } from 'react';
import landImage from '../../../assets/images/HomePage/Home1.jpg';
import { Link, useNavigate } from 'react-router-dom';
import { Avatar } from "@material-tailwind/react";

const HomeComponent: React.FC = () => {

  const navigate = useNavigate()
  const [searchQuery, setSearchQuery] = useState("");
  const submitSearch = () => {
    navigate(`/courses?s=${searchQuery}`);
 };

 

  return (
    <>
   
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-center pt-24 md:pt-24 px-4 md:px-24 mt-14  ">
        <div>
          <div className="font-bold text-3xl md:text-5xl text-white mb-8">Welcome to Our E-Learning Platform</div>
          <p className="text-white text-base md:text-xl mb-8">
            Enhance your skills, expand your knowledge, and achieve your goals with our comprehensive
            online courses. Whether you're a beginner or an expert, there's something for everyone.
            Start your learning journey today!
          </p>
          <div className="flex flex-wrap gap-2">
            <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700">
              #Education
            </span>
            <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700">
              #OnlineLearning
            </span>
            <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700">
              #SkillsDevelopment
            </span>
          </div>
          <br />
          <div className="flex flex-col md:flex-row w-full md:w-auto items-center">
            <input
              type="text"
              placeholder="What do you want to learn..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="flex-grow px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-400 mb-2 md:mb-0 md:mr-2"
            />
            <button className="bg-slate-900 hover:bg-slate-200 text-white hover:text-black px-3 py-2 rounded-md" onClick={submitSearch}>
              Search
            </button>
          </div>
          <br />
          <br />
          <div className="flex items-center -space-x-4">
      <Avatar
                variant="circular"
                alt="user 1"
                className="border-2 border-white hover:z-10 focus:z-10"
                src="https://images.unsplash.com/photo-1633332755192-727a05c4013d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1480&q=80" placeholder={undefined}      />
      <Avatar
                variant="circular"
                alt="user 2"
                className="border-2 border-white hover:z-10 focus:z-10"
                src="https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1061&q=80" placeholder={undefined}      />
      <Avatar
                variant="circular"
                alt="user 3"
                className="border-2 border-white hover:z-10 focus:z-10"
                src="https://images.unsplash.com/photo-1544005313-94ddf0286df2?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1288&q=80" placeholder={undefined}      />
      <Avatar
                variant="circular"
                alt="user 4"
                className="border-2 border-white hover:z-10 focus:z-10"
                src="https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1287&q=80" placeholder={undefined}      />
      <Avatar
                variant="circular"
                alt="user 5"
                className="border-2 border-white hover:z-10 focus:z-10"
                src="https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1760&q=80" placeholder={undefined}      />
    <span className='pl-10 text-white'>100+ Trusted Users</span>
          </div>
        </div>
        <div className="flex justify-center md:justify-end">
            <div className="rounded-full overflow-hidden">
              <img
                className="max-w-full h-auto"
                src={landImage}
                alt="placeholder"
              />
            </div>
          </div>
      </div>
    
</>
    
  );
};

export default HomeComponent;






