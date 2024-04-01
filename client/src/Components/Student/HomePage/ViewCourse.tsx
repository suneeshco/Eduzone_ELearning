import React,{useState,useEffect} from 'react'
import { FaStar, FaRegStar } from 'react-icons/fa';
import { useParams } from 'react-router-dom';
import { studentApiRequest } from '../../../api/axios';
import BestSeller from './BestSeller';


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

const ViewCourse : React.FC= () => {


    const { id } = useParams<{ id: string }>();
  const [courseDetails, setCourseDetails] = useState<Course | null>(null);
  const [lessonDetails, setLessonDetails] = useState<Lesson[]>([])



  const fetchCourses = async () => {
    if (id) {
        try {
          const response = await studentApiRequest({
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


  const fetchLessons = async () => {
    try {
      const response = await studentApiRequest({
        method: 'get',
        url: `/getLessons/${id}`,
    });
        console.log(response);
        setLessonDetails(response); 
    } catch (error) {
        console.error("Failed to fetch lessons:", error);
    }
  };


  useEffect( ()=>{
    
    fetchCourses();
    fetchLessons();
   
},[id])


  return (
    <div>
        <div className="h-36 md:h-20 bg-indigo-300 shadow-xl flex justify-center items-center mb-8 mt-5">
    <h1 className="font-bold text-black text-3xl md:text-4xl text-center">View Course</h1>
  </div>
      <div className="mx-auto px-4 py-8 sm:w-full md:w-full lg:w-full xl:w-10/12 shadow-2xl">
  <div className="flex flex-col-reverse sm:flex-row ">
    <div className="w-full sm:w-3/5 m-4 sm:m-8">
      <h1 className="text-4xl font-bold mb-4">{courseDetails?.courseName}</h1>
      <h1 className="text-xl pt-3 mb-4">{courseDetails?.courseDescription}</h1>
      <div className="flex text-yellow-400">
        {[...Array(5)].map((_, index) => (
          <span key={index}>{index < 4 ? <FaStar /> : <FaRegStar />}</span>
        ))}
      </div>
      <div className="pt-4">
        <span className="text-black">Total Students: 7410</span>
      </div>
      <div className="bg-white shadow-md rounded-lg p-6 mt-16">
        <h2 className="text-2xl font-bold mb-4">Here You Are Going To Learn</h2>
        {lessonDetails.map((lesson) => (
          <div className="flex items-center justify-between bg-violet-300 rounded p-2 mb-2" key={lesson._id}>
            <h2 className="flex-grow p-2">{lesson.lessonTitle}</h2>
          </div>
        ))}
      </div>
    </div>
    <div className='w-full md:w-2/5 m-4 md:m-8 shadow-2xl pb-8'>
      <div className='bg-slate-50 mx-8 border-b border-black shadow-2xl pb-4'>
        <div>
          <img className="w-full h-auto mb-4 object-cover" src={courseDetails?.imageUrl} alt="Course Thumbnail" />
        </div>
        <div className='pt-5 border-b border-black'>
          <h1 className="text-2xl font-bold mb-4 pl-5">₹ {courseDetails?.courseFee}</h1>
        </div>

        <div className="flex justify-center items-center pt-5">
          
            <button
              className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white font-semibold py-3 px-6 rounded-full shadow-lg transform hover:scale-105 transition duration-300 ease-in-out"
            >
              Buy Now
            </button>
          
        </div>
      </div>
    </div>
  </div>
</div>
<div className="h-36 md:h-20 bg-indigo-300 shadow-xl flex justify-center items-center mb-4 mt-5">
    <h1 className="font-bold text-black text-3xl md:text-4xl text-center">Related Courses</h1>
  </div>
<BestSeller/>
    </div>
  )
}

export default ViewCourse
