import React, {useState,useEffect} from 'react';
import { Link } from 'react-router-dom';

import { RootState } from "../../../Redux/RootState/RootState";
import { useSelector } from "react-redux";

import { instructorApiRequest } from '../../../api/axios';

interface Course {
    _id: string;
    courseName: string;
    courseDescription: string;
    courseDuration: string;
    courseFee:number;
    imageUrl: string;  
    createdAt: string;
    updatedAt: string;
    }

const MyCourses = () => {

    const {instructorInfo} = useSelector((state:RootState)=>state.instructorAuth)

    const [courseDetails, setCourseDetails] = useState<Course[]>([])

    useEffect( ()=>{
        const fetchCourses = async () => {
            if (instructorInfo?._id) {
                try {
                  const response = await instructorApiRequest({
                    method: 'get',
                    url: `/getCourses/${instructorInfo?._id}`,
                });
                    
                    
                    setCourseDetails(response); 
                } catch (error) {
                    console.error("Failed to fetch courses:", error);
                }
            }
        };
        fetchCourses();
       
    },[])

    console.log(courseDetails);



  return (
    <div className="mx-auto px-4 py-4"> 
  <h2 className="text-3xl font-bold mb-8">My Courses</h2>
  <div className="grid grid-cols-1 md:grid-cols-5 gap-10">
    {courseDetails.map((course)=>(
        <div className="bg-gray-200 rounded-lg shadow-lg flex flex-col items-center justify-center p-4"> 
      <div className="w-full mb-2 relative">
        <img src={course.imageUrl} alt="" className="w-full h-auto rounded-lg" />
      </div>
      <div className='relative w-full'>
        
        <h2 className="text-lg font-semibold mb-1">{course.courseName}</h2> 
        <div className="flex items-center mb-1"> 
          
          <p className="text-gray-600 text-xs">{course.courseDescription}</p> 
        </div>
        <h3>Course Duration : {course.courseDuration}</h3>
        <p className="text-gray-600 mb-1">₹{course.courseFee}</p> 
        <div className="flex justify-center w-full">
        <Link to={`/instructor/courseView/${course._id}`}>
                  <button className="bg-yellow-500 text-white px-4 py-2  hover:bg-blue-600 transition duration-300">View Course</button>
                </Link>
        </div>
      </div>
    </div>
    ))}
    
  </div>
</div>
)}

export default MyCourses
