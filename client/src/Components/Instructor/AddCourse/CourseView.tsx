import React, { useState, useEffect, FormEvent } from 'react';
import toast from 'react-hot-toast';
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

const CourseView: React.FC = () => {
 const { id } = useParams<{ id: string }>();
 const [courseDetails, setCourseDetails] = useState<Course | null>(null);
 const [lessonDetails, setLessonDetails] = useState<Lesson[]>([]);

 const [loading, setLoading] = useState(false);

 const navigate = useNavigate();
 const [title, setTitle] = useState<string>("");
 const [description, setDescription] = useState<string>("");
 const [video, setVideo] = useState<File | null>(null);
 const [cloudanaryURL, setCloudanaryURL] = useState("");

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

 const handleLessonClick = (lessonVideo: string) => {
    window.open(lessonVideo);
 };

 const handleEditLesson = (lessonId: string) => {
    navigate(`/instructor/editLesson/${lessonId}`);
 };

  return (
    <>

<div className="flex flex-col md:flex-row bg-gray-100 min-h-screen">
  <Card className="fixed top-20 h-auto md:h-screen md:max-h-[calc(100vh-2rem)] md:w-[16rem] p-4 shadow-xl shadow-blue-gray-900/5"  placeholder={undefined}>
  <List  placeholder={undefined}>
        <Link to={'/instructor'}> <ListItem  placeholder={undefined} className='text-black'>
          <ListItemPrefix  placeholder={undefined}>
            <PresentationChartBarIcon className="h-5 w-5" />
          </ListItemPrefix>
          Dashboard
        </ListItem>
        </Link>
        <Link to={'/instructor/myCourses'}><ListItem  placeholder={undefined} className='text-black'>
          <ListItemPrefix  placeholder={undefined}>
            <ShoppingBagIcon className="h-5 w-5" />
          </ListItemPrefix>
          My Courses
        </ListItem>
        </Link>
        <Link to={'/instructor/addCourse'}>
        <ListItem  placeholder={undefined} className='text-black'>
          <ListItemPrefix  placeholder={undefined}>
            <InboxIcon className="h-5 w-5" />
          </ListItemPrefix>
          Add New Course
          
        </ListItem>
        </Link>
        <Link to={'/instructor/profile'}>
        <ListItem  placeholder={undefined} className='text-black'>
          <ListItemPrefix  placeholder={undefined}>
            <UserCircleIcon className="h-5 w-5" />
          </ListItemPrefix>
          Profile
        </ListItem>
        </Link>
      </List>
  </Card>

  <div className="ml-60 pl-5 mx-auto w-full px-4 py-8">

  <div className='flex flex-col md:flex-row shadow-2xl'>
    <div className='w-full md:w-3/5 m-4 md:m-8'>

      <h1 className="text-4xl font-bold mb-4">{courseDetails?.courseName}</h1>
      <h1 className="text-xl pt-3 mb-4">{courseDetails?.courseDescription}</h1>

      <div className="flex text-yellow-400 mb-4">
        {[...Array(5)].map((_, index) => (
          <span key={index}>
            {index < 4 ? <FaStar /> : <FaRegStar />}
          </span>
        ))}
      </div>

      <div className='pb-4'>
        <span className='text-black'>Total Students : 7410</span>
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

    <div className='w-full md:w-2/5 m-4 md:m-8 shadow-2xl'>
      <div className='bg-slate-50 mx-8 border-b border-black shadow-2xl pb-4'>
        <div>
          <img className="w-full h-auto mb-4 object-cover" src={courseDetails?.imageUrl} alt="Course Thumbnail" />
        </div>
        <div className='pt-5 border-b border-black'>
          <h1 className="text-2xl font-bold mb-4 pl-5">₹ {courseDetails?.courseFee}</h1>
        </div>

        <div className="flex justify-center items-center pt-5">
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
  </div>

  <div className="p-4">
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="bg-white shadow rounded-lg p-4">
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
            rows={3}
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
    </>
  );
};

export default CourseView;





