import React, { useState, useEffect } from 'react';
import { RootState } from "../../../Redux/RootState/RootState";
import { useSelector } from "react-redux";
import { instructorApiRequest, studentApiRequest } from '../../../api/axios';
import { Course } from '../../../utils/apiTypes/ApiTypes';
import { Link } from 'react-router-dom';
import { FaStar, FaRegStar } from 'react-icons/fa';
import NoProducts from '../../CommonComponents/NoProducts';
import NoCourse from '../../../assets/images/DefaultImages/noCourses.jpg'




const EnrolledCourses = () => {
  const [courseDetails, setCourseDetails] = useState<Course[]>([])


  const { userInfo } = useSelector((state: RootState) => state.studentAuth)

  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(8);



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
          const response = await studentApiRequest({
            method: 'get',
            url: `/getEnrolledCourses/${userInfo?._id}`,
          });


          setCourseDetails(response);
        } catch (error) {
          console.error("Failed to fetch courses:", error);
        }
      }
    };
    fetchCourses();

  }, [])
  return (
    <div className='mt-20'>
      <div className=" w-full bg-gradient-to-b bg-white mt-5 rounded-lg">
        <div className="h-20 shadow-xl flex justify-center items-center">
          <h1 className="font-bold text-black text-4xl text-center">My Courses</h1>
        </div>
        <div className="p-4 mt-10">
          {currentItems.length < 1 ? (
            <div className=' flex justify-center'>
              <img className='w-[60%] h-[500px]' src={NoCourse} alt="" />
            </div>

          ) : (
            <>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mx-auto max-w-7xl">
                {currentItems.map((course) => (
                  <div key={course._id} className="bg-white border border-gray-200 shadow-xl overflow-hidden">
                    <Link to={`/courseDetail/${course._id}`}>
                      <img className="w-full h-48 object-cover" src={course?.imageUrl} alt="Course Thumbnail" />
                    </Link>
                    <div className="p-4">
                      <h4 className="text-lg font-bold text-gray-900">{course.courseName}</h4>
                      <p className="mt-1 text-gray-800">{course.courseDescription.length > 100 ? course.courseDescription.substring(0, 100) + "..." : course.courseDescription}</p>
                      <div className="flex mt-1 text-yellow-400">
                        {[...Array(5)].map((_, index) => (
                          <span key={index}>{index < 4 ? <FaStar /> : <FaRegStar />}</span>
                        ))}
                      </div>
                      <p className="mt-1 text-gray-800">₹{course.courseFee}</p>
                    </div>
                  </div>
                ))}
              </div>
              <div className="flex justify-center mt-4">
                {pageNumbers.map((number) => (
                  <button key={number} onClick={() => paginate(number)} className="rounded-md bg-green-400 text-white m-2 px-4 py-2 hover:bg-green-600">
                    {number}
                  </button>
                ))}
              </div>
            </>
          )}

        </div>
      </div>
    </div>
  )
}

export default EnrolledCourses
