import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

import { RootState } from "../../../Redux/RootState/RootState";
import { useSelector } from "react-redux";

import { instructorApiRequest } from '../../../api/axios';
import { FaStar, FaRegStar } from 'react-icons/fa';
import photo from '../../../assets/images/HomePage/homeImage.png'

import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Typography,
  Button,
  Tooltip,
  IconButton,
} from "@material-tailwind/react";

interface Course {
  _id: string;
  courseName: string;
  courseDescription: string;
  courseDuration: string;
  courseFee: number;
  imageUrl: string;
  createdAt: string;
  updatedAt: string;
}

const MyCourses = () => {

  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(8);




  const { userInfo } = useSelector((state: RootState) => state.studentAuth)

  const [courseDetails, setCourseDetails] = useState<Course[]>([])



  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = courseDetails.slice(indexOfFirstItem, indexOfLastItem);
  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);
  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(courseDetails.length / itemsPerPage); i++) {
    pageNumbers.push(i);
  }

  useEffect(() => {
    const fetchCourses = async () => {
      if (userInfo?._id) {
        try {
          const response = await instructorApiRequest({
            method: 'get',
            url: `/getCourses/${userInfo?._id}`,
          });


          setCourseDetails(response);
        } catch (error) {
          console.error("Failed to fetch courses:", error);
        }
      }
    };
    fetchCourses();

  }, [])

  console.log(courseDetails);



  return (
    <>
    
    <div className="w-full bg-gradient-to-b from-blue-10 to-white mt-5 rounded-lg">
    <div
      className="h-20  shadow-xl flex justify-center items-center"
      
    >
      <h1 className="font-bold text-black text-4xl text-center">My Courses</h1>
    </div>
        <div className="min-h-screen p-4 mt-10"> 
             
                
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4" style={{ maxWidth: '1100px', margin: '0 auto' }}>
            {currentItems.map((course) => (
              <div key={course._id} className="bg-white border border-gray-200 shadow-xl overflow-hidden">
              <Link to={`/instructor/courseView/${course._id}`}>
                <img className="w-full h-48 object-cover" src={course?.imageUrl} alt="Course Thumbnail" />
              </Link>
              <div className="p-4">
                <h4 className="text-lg font-bold text-gray-900">  
                  {course.courseName}
                </h4>
                <p className="mt-1 text-gray-800">
                  {course.courseDescription}
                </p>
                <div className="flex mt-1 text-yellow-400">
                  {[...Array(5)].map((_, index) => (
                    <span key={index}>
                      {index < 4 ? <FaStar /> : <FaRegStar />}
                    </span>
                  ))}
                </div>
                <p className="mt-1 text-gray-800">
                  ₹{course.courseFee}
                </p>
                
              </div>
            </div>
            ))}
          </div>
          <div className="flex  mt-4 ml-10">
      {pageNumbers.map((number) => (
        <button key={number} onClick={() => paginate(number)} className="rounded-md bg-green-400 text-white m-2 px-4 py-2 hover:bg-green-600">
          {number}
        </button>
      ))}
    </div>
        </div>
      </div>
    </>
  )
}

export default MyCourses
