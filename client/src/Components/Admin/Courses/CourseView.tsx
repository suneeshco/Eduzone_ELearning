import { useState, useEffect } from 'react';
import toast from 'react-hot-toast';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Link } from 'react-router-dom'
import { instructorApiRequest } from '../../../api/axios';

interface Course {
  _id: string;
  courseName: string;
  courseDuration: string;
  courseDescription: string;
  imageUrl: string;
  courseFee: number;
  createdAt: Date;
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
    const response = await instructorApiRequest({
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



useEffect( ()=>{
    
    fetchCourses();
   
},[])

useEffect( ()=>{
  
  fetchLessons();
 
},[cloudanaryURL])



  return (
    <>
    
    <div className="mx-auto px-4 py-8">
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

  
</div>
    </>
  );
};

export default CourseView;





