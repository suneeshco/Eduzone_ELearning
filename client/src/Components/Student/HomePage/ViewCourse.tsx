import React, { useState, useEffect } from 'react'
import { FaStar, FaRegStar } from 'react-icons/fa';
import { Link, useParams } from 'react-router-dom';
import { studentApiRequest } from '../../../api/axios';
import BestSeller from './BestSeller';
import PayButton from '../Payment/PayButton';
import { useSelector } from 'react-redux';
import { RootState } from '../../../Redux/RootState/RootState';
import { StarIcon } from '@heroicons/react/24/solid';
import { Rating } from "@material-tailwind/react";
import StarRating from '../Courses/StarRating';
import toast from 'react-hot-toast';
import ChatPageStudent from '../../../Pages/Student/ChatPageStudent';
import chatIcon from '../../../assets/images/DefaultImages/chat.jpg'


interface Course {
  _id: string;
  courseName: string;
  courseDuration: string;
  courseDescription: string;
  imageUrl: string;
  courseFee: number;
  createdAt: Date;
  instructorId: string;
  students: any;
  rating: number;
}

interface Lesson {
  _id: string;
  lessonTitle: string;
  lessonDescription: string;
  lessonVideo: string;
  createdAt: string;
}

interface RatingDocument {
  courseId: string
  studentId: any
  rating: number;
  review: string;
  createdAt: Date;

}

const ViewCourse: React.FC = () => {

  const { userInfo } = useSelector((state: RootState) => state.studentAuth)


  const { id } = useParams<{ id: string }>();
  const [courseDetails, setCourseDetails] = useState<Course | null>(null);
  const [lessonDetails, setLessonDetails] = useState<Lesson[]>([])
  const [ratingDetails, setRatingDetails] = useState<RatingDocument[]>([])
  const [rating, setRating] = useState(0);
  const [review, setReview] = useState('');
  const [chatWindow,setChatWindow] = useState<boolean>(false)



  const fetchCourses = async () => {
    if (id) {
      try {
        const response = await studentApiRequest({
          method: 'get',
          url: `/getSingleCourse/${id}`,
        });
        console.log("course", response);
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

  const fetchMyRating = async () => {
    try {
      const response = await studentApiRequest({
        method: 'get',
        url: `/getMyRating`,
        params: { courseId: courseDetails?._id, studentId: userInfo?._id }
      });

      console.log("rate", response);
      if (response) {
        setRating(response.rating)
        setReview(response.review)
      }

    } catch (error) {
      console.error("Failed to fetch rating:", error);
    }
  };



  const fetchAllRatings = async () => {
    try {
      const response = await studentApiRequest({
        method: 'get',
        url: `/getAllRating`,
        params: { courseId: courseDetails?._id }
      });
      if (response) {
        setRatingDetails(response)
      } else {
        toast.error("Error fetching reviews")
      }
    } catch (error) {
      console.error("Failed to fetch rating:", error);
    }
  };


  useEffect(() => {

    fetchCourses();
    fetchLessons();

  }, [id])
  useEffect(() => {
    if(userInfo){
      fetchMyRating();
    }
    fetchAllRatings();
  }, [courseDetails, userInfo]);



  const handleLessonClick = (lessonVideo: string) => {
    window.open(lessonVideo);
  };




  const handleRatingChange = async (newRating: any) => {
    setRating(newRating);

  };

  const submitReview = async () => {
    if (rating < 1) {
      return toast.error("select the rating star")
    }
    let data = {
      courseId: courseDetails?._id,
      studentId: userInfo?._id,
      rating: rating,
      review: review
    }
    try {
      const response = await studentApiRequest({
        method: 'post',
        url: '/courseRating',
        data: data
      });

      if (response._id) {
        toast.success("rating added")
        fetchMyRating();
        fetchAllRatings();
        fetchCourses()
      }



    } catch (error) {
      console.error("Failed to add ratings:", error);
    }
  }




  return (
    // <div>
    //   <div className="h-36 md:h-20 bg-indigo-300 shadow-xl flex justify-center items-center mb-8 mt-5">
    //     <h1 className="font-bold text-black text-3xl md:text-4xl text-center">View Course</h1>
    //   </div>
    //   <div className="mx-auto px-4 py-8 sm:w-full md:w-full lg:w-full xl:w-10/12 shadow-2xl">
    //     <div className="flex flex-col-reverse sm:flex-row ">
    //       <div className="w-full sm:w-3/5 m-4 sm:m-8">
    //         <h1 className="text-4xl font-bold mb-4">{courseDetails?.courseName}</h1>
    //         <h1 className="text-xl pt-3 mb-4">{courseDetails?.courseDescription}</h1>
    //         <div className="flex text-yellow-400">
    //           {[...Array(5)].map((_, index) => (
    //             <span key={index}>{index < 4 ? <FaStar /> : <FaRegStar />}</span>
    //           ))}
    //         </div>
    //         <div className="pt-4">
    //           <span className="text-black">Total Students: 7410</span>
    //         </div>
    //         <div className="bg-white shadow-md rounded-lg p-6 mt-16">
    //           <h2 className="text-2xl font-bold mb-4">Here You Are Going To Learn</h2>
    //           {lessonDetails.map((lesson) => (
    //       <div className="flex items-center justify-between bg-violet-300 rounded p-2 mb-2" key={lesson._id}>
    //         <h2 className="flex-grow p-2">{lesson.lessonTitle}</h2>
    //         <div className="flex items-center space-x-2">
    //         {courseDetails?.students.includes(userInfo?._id) && (
    //           <button
    //             onClick={() => handleLessonClick(lesson.lessonVideo)}
    //             className="bg-green-500 text-white px-2 py-1 rounded-md hover:bg-green-600"
    //           >
    //             Play
    //           </button>
    //         )}
    //         </div>
    //       </div>
    //     ))}
    //         </div>
    //       </div>
    //       <div className='w-full md:w-2/5 m-4 md:m-8 shadow-2xl pb-8'>
    //         <div className='bg-slate-50 mx-8 border-b border-black shadow-2xl pb-4'>
    //           <div>
    //             <img className="w-full h-auto mb-4 object-cover" src={courseDetails?.imageUrl} alt="Course Thumbnail" />
    //           </div>

    //           {!courseDetails?.students.includes(userInfo?._id) && (
    //             <>
    //               <div className='pt-5 border-b border-black'>
    //                 <h1 className="text-2xl font-bold mb-4 pl-5">₹ {courseDetails?.courseFee}</h1>
    //               </div>
    //               <div className="flex justify-center items-center pt-5">
    //                 <PayButton courseDetails={courseDetails} />
    //               </div>
    //             </>
    //           )}
    //         </div>
    //       </div>
    //     </div>
    //   </div>
    //   <div className="h-36 md:h-20 bg-indigo-300 shadow-xl flex justify-center items-center mb-4 mt-5">
    //     <h1 className="font-bold text-black text-3xl md:text-4xl text-center">Related Courses</h1>
    //   </div>
    //   <BestSeller />
    // </div>



<div>
    <div className='flex space-between pt-10 pb-10 mt-10 bg-gray-600'>
  <div className="w-full sm:w-3/5 m-2 sm:m-10 pt-10">
    <h1 className="text-2xl sm:text-4xl text-white font-bold mb-2 " style={{ fontFamily: 'Arial, sans-serif' }}>{courseDetails?.courseName}</h1>
    <h1 className="text-sm sm:text-base text-white pt-1 mb-2">{courseDetails?.courseDescription}</h1>

    <div className="flex items-center mb-1 space-x-1 rtl:space-x-reverse">
      {[...Array(5)].map((_, index) => (
        <svg
          key={index}
          className={`w-3 sm:w-4 h-3 sm:h-4 ${index < (courseDetails?.rating || 0) ? 'text-yellow-300' : 'text-gray-300 dark:text-gray-500'
            }`}
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          fill="currentColor"
          viewBox="0 0 22 20"
        >
          <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
        </svg>
      ))}
    </div>

    <div className="pt-2">
      <span className="text-white">Total Students: 7410</span>
    </div>

    
      <div className='pt-3'>
        <h1 className="text-lg sm:text-2xl text-white font-bold mb-2">Price : ₹ {courseDetails?.courseFee}</h1>
      </div>

  </div>

  <div>
    <div className='bg-slate-50 mx-4 sm:mx-8 border-b border-black shadow-lg m-4 sm:m-10'>
      <div>
        <img className="w-full h-auto object-cover" src={courseDetails?.imageUrl} alt="Course Thumbnail" />
      </div>
    </div>
    {!courseDetails?.students.includes(userInfo?._id) && (
      <>
        <div className="flex justify-center items-center">
          <PayButton courseDetails={courseDetails} />
        </div>
      </>
    )}
  </div>
</div>

<div className='bg-white sm:m-10 flex flex-col'>
  <div className="bg-white rounded-lg p-4 md:w-[50%] sm:p-6 mt-10">
    <h2 className="text-lg sm:text-2xl font-bold mb-4">Topics That You Are Going To Learn</h2>
    {lessonDetails.map((lesson, index) => (
      <div className="md:w-full flex items-center justify-between bg-violet-300 rounded p-2 mb-2" key={lesson._id}>
        <h2 className="flex-grow p-2 text-sm sm:text-base">{index + 1 + ") " + lesson.lessonTitle}</h2>
        <div className="flex items-center space-x-2">
          {courseDetails?.students.includes(userInfo?._id) && (
            <button
              onClick={() => handleLessonClick(lesson.lessonVideo)}
              className="bg-green-500 text-white px-2 py-1 rounded-md hover:bg-green-600 text-xs sm:text-sm"
            >
              Play
            </button>
          )}
        </div>
      </div>
    ))}
  </div>

  {courseDetails?.students.includes(userInfo?._id) && (
    <div className="flex justify-end rounded-3xl">
      {chatWindow ? (
        <div className='fixed top-24 right-10 bg-sky-100 md:w-[40%] z-50'>
          <button onClick={() => { setChatWindow(false) }} className="bg-sky-950 text-sky-400 border border-sky-400 border-b-4 font-medium overflow-hidden relative px-4 py-2 rounded-md hover:brightness-150 hover:border-t-4 hover:border-b active:opacity-75 outline-none duration-300 group">
            <span className="bg-sky-400 shadow-sky-400 absolute -top-[150%] left-0 inline-flex w-80 h-[5px] rounded-md opacity-50 group-hover:top-[150%] duration-500 shadow-[0_0_10px_10px_rgba(0,0,0,0.3)]"></span>
            Close
          </button>
          <ChatPageStudent instructorId={courseDetails.instructorId} />
        </div>

      ) : (
        <img src={chatIcon} className='rounded-full fixed bottom-5 right-5 w-20 h-20 ring-2 ring-indigo-500 cursor-pointer' alt="chat" onClick={() => { setChatWindow(true) }} />

      )}
    </div>
  )}
</div>

{userInfo && courseDetails?.students.includes(userInfo?._id) && (
  <div className='border-t sm:mx-40 p-4  bg-white shadow-2xl'>
    <h2 className="text-lg sm:text-3xl font-bold mb-2 text-center">Rate Your Course</h2>
    <StarRating initialRating={rating} ratings={rating} onChange={handleRatingChange} />
    <div className='flex justify-center items-center'>
      <textarea
        id="review"
        name="review"
        className="mt-2 p-2 mx-20 block w-full border border-black rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
        placeholder="Write your review here..."
        value={review}
        rows={4}
        onChange={(e) => setReview(e.target.value)}
      ></textarea>
    </div>

    <div className="flex justify-center items-center mt-2">
      <button
        onClick={submitReview}
        className="w-1/3 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white font-semibold py-2 px-4 rounded-lg shadow-lg transform hover:scale-105 transition duration-300 ease-in-out"
      >
        {rating ? 'Update Rating' : " Submit"}
      </button>
    </div>
  </div>
)}

<div className='border-t sm:m-10 p-4'>
  <h2 className="text-lg sm:text-3xl font-bold mb-2">Reviews And Ratings</h2>

  {ratingDetails.map((ratings) => (
    <article className='w-full bg-slate-50 p-4 border mb-4' >
      <div className="flex items-center mb-2">
        <img className="w-8 h-8 me-2 rounded-full" src={ratings.studentId.photo} alt="" />
        <div className="font-medium dark:text-white">
          <p>{ratings.studentId.firstname} <time dateTime="2014-08-16 19:00" className="block text-xs sm:text-sm text-gray-500 dark:text-gray-400">Rated On {new Date(ratings.createdAt).toLocaleDateString()}</time></p>
        </div>
      </div>
      <div className="flex items-center mb-1 space-x-1 rtl:space-x-reverse">
        {[...Array(5)].map((_, index) => (
          <svg
            key={index}
            className={`w-3 sm:w-4 h-3 sm:h-4 ${index < ratings.rating ? 'text-yellow-300' : 'text-gray-300 dark:text-gray-500'
              }`}
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="currentColor"
            viewBox="0 0 22 20"
          >
            <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
          </svg>
        ))}
      </div>
      <p className="mb-2 text-xs sm:text-sm text-gray-500 dark:text-gray-400">{ratings.review}</p>
    </article>
  ))}
</div>
</div>


  )
}

export default ViewCourse
