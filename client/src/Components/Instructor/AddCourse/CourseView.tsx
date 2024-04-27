import React, { useState, useEffect, FormEvent } from 'react';
import toast from 'react-hot-toast';
import profileImage from '../../../assets/images/DefaultImages/Profile.png'
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { instructorApiRequest } from '../../../api/axios';

import CloudinaryUploadWidget from "./CloudinaryUploadWidget";
import { Cloudinary } from "@cloudinary/url-gen";
import { AdvancedImage, responsive, placeholder } from "@cloudinary/react";
import { FaStar, FaRegStar } from 'react-icons/fa';
import { PresentationChartBarIcon, ShoppingBagIcon, InboxIcon, UserCircleIcon, Cog6ToothIcon, PowerIcon } from '@heroicons/react/24/solid';
import { Card, List, ListItem, ListItemPrefix } from '@material-tailwind/react';
import VideoPlayer from './VideoPlayer';

interface Course {
  _id: string;
  courseName: string;
  courseDuration: string;
  courseDescription: string;
  imageUrl: string;
  courseFee: number;
  createdAt: Date;
  instructorId: any;
  students: any;
  rating: number;
}

interface OrderData {
  _id:string;
  instructorId : any;
  studentId : any;
  courseId : any;
  createdAt : Date;
  amount : number;
  orderId:string;
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


const CourseView: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [courseDetails, setCourseDetails] = useState<Course | null>(null);
  const [lessonDetails, setLessonDetails] = useState<Lesson[]>([]);
  const [ratingDetails, setRatingDetails] = useState<RatingDocument[]>([])
  const [enrolledStudents, setEnrolledStudents] = useState<OrderData[]>([])

  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const [title, setTitle] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [video, setVideo] = useState<File | null>(null);
  const [cloudanaryURL, setCloudanaryURL] = useState("");
  const [lessonId, setLessonId] = useState("")
  const [isVideoOpen, setIsVideoOpen] = useState(false);

  const [publicId, setPublicId] = useState("");
  const [cloudName] = useState("dwuy04s3s");
  const [uploadPreset] = useState("videos_preset");

  const uwConfig = {
    cloudName,
    uploadPreset,
    multiple: true,
    clientAllowedFormats: ["MP4"],
  };

  const cld = new Cloudinary({
    cloud: {
      cloudName
    }
  });

  const myImage = cld.image(publicId);

  useEffect(() => {
    const fetchCourses = async () => {
      if (id) {
        try {
          const response = await instructorApiRequest({
            method: 'get',
            url: `/getSingleCourse/${id}`,
          });

          setCourseDetails(response);
        } catch (error) {
          console.error("Failed to fetch courses:", error);
        }
      }
    };
    fetchCourses();

  }, []);

  useEffect(() => {
    const fetchLessons = async () => {
      try {
        const response = await instructorApiRequest({
          method: 'get',
          url: `/getLessons/${id}`,
        });

        setLessonDetails(response);
      } catch (error) {
        console.error("Failed to fetch lessons:", error);
      }

    };
    fetchLessons();

  }, [cloudanaryURL, title]);

  const handleSubmitChange = (e: React.FormEvent<HTMLInputElement>) => {
    try {
      const inputElement = e.target as HTMLInputElement;
      const files = inputElement.files;
      if (files && files.length > 0) {
        const file = files[0];
        setVideo(file);
      } else {
        setVideo(null);
      }
    } catch (error) {
      console.log(error);
    }
  };



  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!title) {
      return toast.error("Title is mandatory");
    }
    if (!description) {
      return toast.error("Description is mandatory");
    }

    if (!publicId) {
      return toast.error("Video is mandatory");
    }

    setLoading(true);

    const datas = {
      lessonTitle: title, lessonDescription: description, lessonVideo: publicId, courseId: courseDetails?._id
    };

    try {
      const response = await instructorApiRequest({
        method: 'post',
        url: '/addLesson',
        data: datas,
      });
      console.log("response", response);

      if (response) {
        toast.success("Lesson added");
        setTitle("");
        setDescription("");
        setVideo(null);
        setCloudanaryURL("");
        setPublicId("");
      } else {
        toast.error("Failed to add lesson");
      }
    } catch (error) {
      console.error("Error adding lesson:", error);
      toast.error("Error adding lesson: Please try again later");
    } finally {
      setLoading(false);
    }
  };

  const handleLessonClick = (lessonId: string) => {
    // window.open(lessonVideo);
    setLessonId(lessonId);
    setIsVideoOpen(true);
  };

  const handleEditLesson = (lessonId: string) => {
    navigate(`/instructor/editLesson/${lessonId}`);
  };


  const handleCloseVideo = () => {
    setIsVideoOpen(false);
    setLessonId('');
  };




  const send = async () => {
    const datas = {
      lessonTitle: title, lessonDescription: description, lessonVideo: publicId, courseId: courseDetails?._id
    };

    try {
      const response = await instructorApiRequest({
        method: 'post',
        url: '/addLesson',
        data: datas,
      });
      console.log("response", response);

      if (response) {
        toast.success("Lesson added");
        setTitle("");
        setDescription("");
        setVideo(null);
        setCloudanaryURL("");
        setPublicId("");
      } else {
        toast.error("Failed to add lesson");
      }
    } catch (error) {
      console.error("Error adding lesson:", error);
      toast.error("Error adding lesson: Please try again later");
    }
  }


  if (publicId) {
    send();
  }



  const fetchAllRatings = async () => {
    try {
      const response = await instructorApiRequest({
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


  const fetchStudents = async () => {
    try {
      const response = await instructorApiRequest({
        method: 'get',
        url: `/getAllEnrolledStudents`,
        params: { courseId: courseDetails?._id }
      });
      console.log("reees",response);
      
      if (response) {
        setEnrolledStudents(response)
      } else {
        toast.error("Error fetching datas")
      }
    } catch (error) {
      console.error("Failed to fetch data:", error);
    }
  };


  useEffect(() => {

    fetchAllRatings();
    fetchStudents();

  }, [courseDetails]);

  return (
    <>
      {isVideoOpen && (
        <VideoPlayer
          publicId={lessonId}
          courseId={courseDetails?._id}
          onClose={handleCloseVideo}
        />
      )}

      <div className="flex flex-col md:flex-row bg-white min-h-screen">


        <div className=" pl-5 pt-10 mx-auto w-full px-4 py-8">



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

              <div className="flex justify-center items-center">
                <Link to={`/instructor/editCourse/${courseDetails?._id}`}>
                  <button
                    className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white font-semibold py-3 px-6 rounded-full shadow-lg transform hover:scale-105 transition duration-300 ease-in-out"
                  >
                    Edit Course
                  </button>
                </Link>
              </div>

            </div>
          </div>



          <div className='bg-white  flex flex-col'>
            <div className='flex'>
              <div className="bg-white rounded-lg  p-4 md:w-[50%]  ">

                <div className=" rounded-lg p-4 ">
                  <h2 className="text-2xl font-bold mb-4">Lesson List</h2>
                  {lessonDetails.map((lesson) => (
                    <div className="flex items-center justify-between bg-violet-300 rounded p-2 mb-2" key={lesson._id}>
                      <h2 className="flex-grow p-2">{lesson.lessonTitle}</h2>
                      <div className="flex items-center space-x-2">
                        <button
                          // onClick={() => handleLessonClick(lesson.lessonVideo)}
                          onClick={() => handleLessonClick(lesson._id)}
                          className="bg-green-500 text-white px-2 py-1 rounded-md hover:bg-green-600"
                        >
                          Play
                        </button>
                        <button
                          onClick={() => handleEditLesson(lesson._id)}
                          className="bg-blue-500 text-white px-2 py-1 rounded-md hover:bg-blue-600"
                        >
                          Edit
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className='bg-white rounded-lg  p-4 md:w-[50%] '>
                <div className="p-4">
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="bg-white shadow rounded-lg border-2 p-4">
                      <h2 className="text-2xl font-bold mb-4">Add New Lesson</h2>
                      <div className="mb-4">
                        <label htmlFor="title" className="block text-sm font-medium text-gray-700">
                          Lesson Title
                        </label>
                        <input
                          type="text"
                          name="title"
                          id="title"
                          value={title}
                          onChange={(e) => { setTitle(e.target.value) }}
                          className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                        />
                      </div>
                      <div className="mb-4">
                        <label htmlFor="description" className="block text-sm font-medium text-gray-700">
                          Lesson Description
                        </label>
                        <textarea
                          name="description"
                          id="description"
                          value={description}
                          onChange={(e) => { setDescription(e.target.value) }}
                          className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                          rows={1}
                        />
                      </div>
                      <div className="mb-4">
                        <label htmlFor="video" className="block text-sm font-medium text-gray-700">
                          Lesson Video
                        </label>
                        <CloudinaryUploadWidget uwConfig={uwConfig} setPublicId={setPublicId} />
                      </div>
                      <button type="submit" className="px-4 py-2 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white font-semibold py-3 px-6 rounded-full shadow-lg transform hover:scale-105 transition duration-300 ease-in-out">
                        {loading ? "Adding Lesson..." : "Add Lesson"}
                      </button>
                    </div>
                  </form>

                  {publicId && (
                    <video
                      controls
                      src={publicId}
                      style={{ width: "100%" }}
                    />
                  )}
                </div>
              </div>
            </div>
          </div>




          <div className='flex  rounded-2xl mt-20'>
            <div className='p-4 border-2 shadow-xl m-4 w-[50%] h-[400px]  rounded-2xl bg-white'>
              <h2 className="text-lg sm:text-xl font-bold pb-2 mb-2">Enrolled Students</h2>
              <div className='h-[350px] overflow-y-scroll'>
                <ul className="divide-y w-full divide-gray-200 dark:divide-gray-700 ">
                  {enrolledStudents.map((student,index)=>(
                    <li key={index} className="pb-3 sm:pb-4">
                    <div className="flex items-center space-x-4 rtl:space-x-reverse">
                      <div className="flex-shrink-0">
                        <img className="w-8 h-8 rounded-full" src={student.studentId.photo || profileImage} alt="Neil image" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-gray-900 truncate dark:text-white">
                          {student.studentId.firstname}
                        </p>
                        <p className="text-sm text-gray-500 truncate dark:text-gray-400">
                          {student.studentId.email}
                        </p>
                      </div>
                      <div className="inline-flex items-center text-base font-semibold text-gray-900 dark:text-white">
                        $320
                      </div>
                    </div>
                  </li>
                  ))}
                  
                </ul>
              </div>
            </div>
            <div className='w-[50%]'>
              <div className='p-4 border-2 m-4 h-[400px] bg-white rounded-2xl'>
                <div className=''>
                  <h2 className="text-lg sm:text-xl font-bold mb-2">Reviews And Ratings</h2>
                  <div className='h-[350px] overflow-y-scroll'>

                    {ratingDetails.map((ratings) => (
                      <article className='w-full bg-slate-50 p-2 border mb-4' >
                        <div className="flex items-center mb-2">
                          <img className="w-5 h-5  me-2 rounded-full" src={ratings.studentId.photo || profileImage} alt="" />
                          <div className="text-sm dark:text-white">
                            <p>{ratings.studentId.firstname} <time dateTime="2014-08-16 19:00" className="block text-xs sm:text-xs text-gray-500 dark:text-gray-400">Rated On {new Date(ratings.createdAt).toLocaleDateString()}</time></p>
                          </div>
                        </div>
                        <div className="flex items-center mb-1 space-x-1 rtl:space-x-reverse">
                          {[...Array(5)].map((_, index) => (
                            <svg
                              key={index}
                              className={`w-2 sm:w-3 h-2 sm:h-3 ${index < ratings.rating ? 'text-yellow-300' : 'text-gray-300 dark:text-gray-500'
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
                        <p className="mb-2 text-xs sm:text-xs text-gray-500 dark:text-gray-400">{ratings.review}</p>
                      </article>
                    ))}

                  </div>
                </div>
              </div>
            </div>

          </div>




        </div>


      </div>
    </>
  );
};

export default CourseView;





