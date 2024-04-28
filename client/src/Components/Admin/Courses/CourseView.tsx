import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { adminApiRequest } from '../../../api/axios';
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

interface Lesson {
  _id: string;
  lessonTitle: string;
  lessonDescription: string;
  lessonVideo: string;
  createdAt: string;
}

const CourseView: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [courseDetails, setCourseDetails] = useState<Course | null>(null);
  const [lessonDetails, setLessonDetails] = useState<Lesson[]>([]);
  // const [cloudanaryURL, setCloudanaryURL] = useState<string>("");
  const [lessonId,setLessonId] = useState("")
  const [isVideoOpen, setIsVideoOpen] = useState(false);

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
        console.log("course", response);
        setCourseDetails(response);
      } catch (error) {
        console.error("Failed to fetch courses:", error);
      }
    }
  };

  useEffect(() => {
    fetchCourses();
  }, []);

  useEffect(() => {
    fetchLessons();
  }, []);

  // const handleLessonClick = (lessonVideo: string) => {
  //   window.open(lessonVideo);
  // };


  const handleLessonClick = (lessonId: string) => {
    // window.open(lessonVideo);
    setLessonId(lessonId);
    setIsVideoOpen(true);
  };


  const handleCloseVideo = () => {
    setIsVideoOpen(false);
    setLessonId('');
  };



  return (
    <>
    
    {isVideoOpen && (
        <VideoPlayer
          publicId={lessonId}
          courseId={courseDetails?._id}
          onClose={handleCloseVideo}
        />
      )}

    <div className="flex flex-col md:flex-row bg-gray-100 min-h-screen">


      <div className="pt-10   w-full  py-8 ">


        {/* <div className=" px-4 py-8 sm:w-full  ">
          <div className="flex flex-col-reverse sm:flex-row shadow-2xl">
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
            <div className="w-full sm:w-2/5 m-4 sm:m-8">
              <div className="bg-slate-50 mx-8 border-b border-black shadow-xl pb-4">
                <div>
                  <img className="w-full h-auto mb-4 object-cover" src={courseDetails?.imageUrl} alt="Course Thumbnail" />
                </div>
                <div className="flex justify-center items-center pt-5">
                  <button className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white font-semibold py-3 px-6 rounded-full shadow-lg transform hover:scale-105 transition duration-300 ease-in-out">
                    Price: ₹{courseDetails?.courseFee}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div> */}


<div className='flex space-between pt-10 pb-10  bg-gray-600'>
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

              

            </div>
          </div>



          <div className='bg-white  flex flex-col'>
          <div className='flex'>
            <div className="bg-white rounded-lg p-4 md:w-[50%]  ">

            <div className=" rounded-lg p-6 ">
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
                    </div>
                  </div>
                ))}
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





