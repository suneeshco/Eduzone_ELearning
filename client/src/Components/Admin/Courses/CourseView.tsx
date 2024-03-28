import { useState, useEffect } from 'react';
import toast from 'react-hot-toast';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Link } from 'react-router-dom'
import { adminApiRequest, instructorApiRequest } from '../../../api/axios';
import { log } from 'console';
import { FaStar, FaRegStar } from 'react-icons/fa';

interface Course {
  _id: string;
  courseName: string;
  courseDuration: string;
  courseDescription: string;
  imageUrl: string;
  courseFee: number;
  createdAt: Date;
  instructorId : string;
}

interface Lesson {
  _id: string;
  lessonTitle: string;
  lessonDescription: string;
  lessonVideo: string;
  createdAt: string;
}

const CourseView = () => {
  const { id } = useParams<{ id: string }>();
  const [courseDetails, setCourseDetails] = useState<Course | null>(null);
  const [lessonDetails, setLessonDetails] = useState<Lesson[]>([])

const [cloudanaryURL, setCloudanaryURL] = useState("");



const fetchLessons = async () => {
  try {
    const response = await adminApiRequest({
      method: 'get',
      url: `/getLessons/${id}`,
  });
      console.log(response);
      setLessonDetails(response); 
  } catch (error) {
      console.error("Failed to fetch lessons:", error);
  }
};



const fetchCourses = async () => {
  if (id) {
      try {
        const response = await adminApiRequest({
          method: 'get',
          url: `/getSingleCourse/${id}`,
      });
      console.log("course",response);
      
          setCourseDetails(response); 
      } catch (error) {
          console.error("Failed to fetch courses:", error);
      }
  }
};



useEffect( ()=>{
    
    fetchCourses();
   
},[])

useEffect( ()=>{
  
  fetchLessons();
 
},[cloudanaryURL])



const handleLessonClick = (lessonVideo: string) => {

  window.open(lessonVideo);
};



  return (
    <>
    
    {/* <div className="mx-auto px-4 py-8">
  <div className="bg-blue-200 h-32 flex items-center justify-center">
    <h1 className="text-3xl font-bold">Course Details</h1>
  </div>

  <div className="mx-auto px-4 py-8 grid grid-cols-2 gap-8">
    <div className="bg-white shadow-md rounded-lg p-6">
      <h2 className="text-2xl font-bold mb-4">Lesson List</h2>
      {lessonDetails.map((lesson) => (
        <div key={lesson._id} style={{ borderRadius: '10px', padding: '10px', backgroundColor: '#f0f0f0', marginBottom: '10px' }}>
          <h2>{lesson.lessonTitle}</h2>
        </div>
      ))}
    </div>

    <div className="bg-white shadow-md rounded-lg p-6">
      <h2 className="text-2xl font-bold mb-4">Course Details</h2>
      
      <img className="w-full h-auto mb-4 object-cover rounded-t-xl" src={courseDetails?.imageUrl} alt="Course Thumbnail" />
      <h2 className="text-2xl font-bold mb-4">{courseDetails?.courseName}</h2>
      <p className="text-gray-800 dark:text-white">Description : {courseDetails?.courseDescription}</p>
      <p className="mt-2 text-gray-800 dark:text-white">Duration: {courseDetails?.courseDuration} days</p>
    </div>
  </div>

  
</div> */}



<div className="mx-auto w-full px-4 py-8">
        {/* <div className="bg-slate-400 h-32 flex items-center justify-center">
          <h1 className="text-3xl font-bold">Course Details</h1>
        </div> */}

        <div className='flex'>
          <div className='w-3/5  m-8'>
            <h1 className="text-4xl font-bold mb-4" >{courseDetails?.courseName}</h1>
            <h1 className="text-xl pt-3 mb-4" > {courseDetails?.courseDescription}</h1>

            <div className="flex  text-yellow-400">
              {[...Array(5)].map((_, index) => (
                <span key={index}>
                  {index < 4 ? <FaStar /> : <FaRegStar />}
                </span>
              ))}
            </div>
            <div className='pt-4'>
              <span className='text-black '> Total Students :  7410 </span>
            </div>



            <div className="bg-white shadow-md rounded-lg p-6 mt-16">
            <h2 className="text-2xl font-bold mb-4">Lesson List</h2>
            {lessonDetails.map((lesson) => (
              <div className="flex items-center justify-between bg-violet-300 rounded p-2 mb-2" key={lesson._id}>
                <h2 className="flex-grow p-2">{lesson.lessonTitle}</h2>
                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => handleLessonClick(lesson.lessonVideo)}
                    className="bg-green-500 text-white px-2 py-1 rounded-md hover:bg-green-600"
                  >
                    Play
                  </button>
                  
                </div>
              </div>
            ))}
          </div>
          </div>
          <div className='w-2/5   m-8'>
            <div className=' bg-slate-50 mx-8 border-b border-black shadow-xl pb-4'>
              <div>
                <img className="w-full h-auto mb-4 object-cover " src={courseDetails?.imageUrl} alt="Course Thumbnail" />
              </div>
              

              <div className="flex justify-center items-center pt-5">
              <button
                  className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white font-semibold py-3 px-6 rounded-full shadow-lg transform hover:scale-105 transition duration-300 ease-in-out"
                >
                  Price : ₹ {courseDetails?.courseFee}
                </button>
              </div>



            </div>
          </div>
        </div>
        
      </div>
    </>
  );
};

export default CourseView;





