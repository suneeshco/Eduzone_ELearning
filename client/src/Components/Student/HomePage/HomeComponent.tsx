import React, { useEffect, useState } from 'react';
import landImage from '../../../assets/images/HomePage/LandingImage.png';
import categoryImage from '../../../assets/images/Logos/category.png'
import { adminApiRequest, studentApiRequest } from '../../../api/axios';
import { Course } from '../../../utils/apiTypes/ApiTypes';


interface Category {
  _id: string;
  categoryName: string;
 }

const HomeComponent = () => {

  const [category, setCategory] = useState<Category[]>([])
  const [courseDetails, setCourseDetails] = useState<Course[]>([])


  const fetchCourses = async () => {
    try {
      const response = await studentApiRequest({
        method: 'get',
        url: '/getAllCourses',
    });
        setCourseDetails(response);
        console.log(response);  
    } catch (error) {
        console.error("Failed to fetch courses:", error);
    }

};

useEffect(() => {
  const fetchData = async () => {
     try {
       const response = await adminApiRequest({
         method: 'get',
         url: '/activeCategories',
       });
       
       setCategory(response);
     } catch (error) {
       console.error("Failed to fetch categories:", error);
     }
  };
 
  fetchData();
 }, []);



  useEffect( ()=>{
    
    fetchCourses();

   
},[])

  return (
    <div className='bg-white-300	'>
    <div className=" mx-auto px-14 py-8 bg-slate-500	 rounded">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
        <div>
          <div className="font-bold text-3xl mb-4">Welcome to Our E-Learning Platform</div>
          <p className="text-gray-700 text-lg mb-6">
            Enhance your skills, expand your knowledge, and achieve your goals with our comprehensive
            online courses. Whether you're a beginner or an expert, there's something for everyone.
            Start your learning journey today!
          </p>
          <div className="flex flex-wrap gap-2">
            <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700">
              #Education
            </span>
            <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700">
              #OnlineLearning
            </span>
            <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700">
              #SkillsDevelopment
            </span>
          </div>
        </div>
        <div className="flex justify-end">
          <div className="rounded-full overflow-hidden">
            <img
              className="max-w-full h-auto"
              src={landImage}
              alt="placeholder"
            />
          </div>
        </div>
      </div>
    </div>


    <div className=" mx-10 px-20 py-8 bg-slate-300	 rounded m-20">
  <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
    <div>
      <div className="font-bold text-3xl mb-4">About Us</div>
      <p className="text-gray-700 text-lg mb-6">
      Eduzone is one of the leading platform for aquiring the knowledge through online . We provides quality content with the assistance of 25+ years experienced faculties. We have transformed....  
      </p>
      <div className="flex flex-wrap gap-2">
        <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700">
          read more ...
        </span>
        
      </div>
    </div>
    <div className="flex justify-center md:justify-end">
      <div className="border border-gray-200 rounded-md overflow-hidden">
        <img
          className="w-64 h-auto"
          src={landImage}
          alt="placeholder"
        />
      </div>
    </div>
  </div>
</div>





<div className="mx-auto px-8 py-8">
  <h2 className="text-3xl font-bold mb-8">Course Categories</h2>
  <div className="grid grid-cols-1 md:grid-cols-5 gap-10">


  {category ? (
      category.map(categ => (
        // Render your item here
        <div className="bg-gray-200 rounded-lg shadow-lg p-6 flex flex-col items-center justify-center" key={categ._id}>
      <div className="w-16 h-16 rounded-full overflow-hidden mb-4">
        <img src={categoryImage} alt="" className="w-full h-full object-cover" />
      </div>
      <h2 className="text-xl font-semibold mb-2">{categ?.categoryName}</h2>
    </div>
      ))
    ) : (
      <p>Loading categories...</p>
    )}
    

    

    

   
  </div>
</div>








<div className="mx-auto px-4 py-4"> 
  <h2 className="text-3xl font-bold mb-8">Best Seller Courses</h2>
  <div className="grid grid-cols-1 md:grid-cols-5 gap-10">


    {courseDetails.map((course)=>(
      <div className="bg-gray-200 rounded-lg shadow-lg flex flex-col items-center justify-center p-4" key={course._id} > 
      <div className="w-full mb-2 relative">
        <img src={course?.imageUrl} alt="" className="w-full h-auto rounded-lg" />
      </div>
      <div className='relative w-full'>
        <span className="absolute top-2 right-2 text-gray-600 text-xl">&hearts;</span>
        <h2 className="text-lg font-semibold mb-1">{course?.courseName}</h2> 
        <div className="flex items-center mb-1"> 
          <img src={landImage} alt="Tutor" className="w-6 h-6 rounded-full mr-1" /> 
          <p className="text-gray-600 text-xs">{course.instructorId?.firstname}</p> 
        </div>
        <p className="text-gray-600 mb-1">₹ {course.courseFee}</p> 
        <div className="flex justify-center w-full">
          <button className="bg-yellow-500 text-white px-4 py-2 rounded-full hover:bg-blue-600 transition duration-300">Buy Course</button>
        </div>
      </div>
    </div>

    ))} 
    

    
    
  </div>
</div>











<div className="mx-10 px-20 py-8 bg-slate-300 rounded m-20">
  <div className="grid grid-cols-1 md:grid-cols-2 gap-14 items-center">
    
    <div className="flex justify-center md:justify-end">
      <div className="border border-gray-200 rounded-md overflow-hidden flex justify-center items-center">
        <img
          src={landImage}
          alt="placeholder"
        />
      </div>
    </div>
    <div>
      <h1>One To One Sessions</h1><br />
      <p className="text-gray-700 text-lg mb-6">
      Experts are available with one to one session and 24*7 community support
      </p>
      
    </div>
  </div>
</div>







<div className="mx-10 px-20 py-8 bg-red-300 rounded m-20">
  <h2 className="text-3xl font-bold mb-6">Expert Tutors</h2>
  <div className="grid grid-cols-2 md:grid-cols-6 gap-6">
    <div className="flex flex-col items-center">
      <div className="rounded-full overflow-hidden border-4 border-white">
        <img
          className="w-32 h-32 object-cover"
          src={landImage}
          alt="Tutor 1"
        />
      </div>
      <p className="mt-2 text-lg font-semibold">Tutor</p>
    </div>

    <div className="flex flex-col items-center">
      <div className="rounded-full overflow-hidden border-4 border-white">
        <img
          className="w-32 h-32 object-cover"
          src={landImage}
          alt="Tutor 1"
        />
      </div>
      <p className="mt-2 text-lg font-semibold">Tutor</p>
    </div>

    <div className="flex flex-col items-center">
      <div className="rounded-full overflow-hidden border-4 border-white">
        <img
          className="w-32 h-32 object-cover"
          src={landImage}
          alt="Tutor 1"
        />
      </div>
      <p className="mt-2 text-lg font-semibold">Tutor</p>
    </div>

    <div className="flex flex-col items-center">
      <div className="rounded-full overflow-hidden border-4 border-white">
        <img
          className="w-32 h-32 object-cover"
          src={landImage}
          alt="Tutor 1"
        />
      </div>
      <p className="mt-2 text-lg font-semibold">Tutor</p>
    </div>

    <div className="flex flex-col items-center">
      <div className="rounded-full overflow-hidden border-4 border-white">
        <img
          className="w-32 h-32 object-cover"
          src={landImage}
          alt="Tutor 1"
        />
      </div>
      <p className="mt-2 text-lg font-semibold">Tutor</p>
    </div>

    <div className="flex flex-col items-center">
      <div className="rounded-full overflow-hidden border-4 border-white">
        <img
          className="w-32 h-32 object-cover"
          src={landImage}
          alt="Tutor 1"
        />
      </div>
      <p className="mt-2 text-lg font-semibold">Tutor</p>
    </div>
   
  </div>
</div>







<footer className="bg-blue-900 py-4 px-8">
  <div className="max-w-7xl mx-auto flex flex-col items-center">
    <h1 className="text-white">EDUZONE</h1>
    <div>
      <h3 className="text-white">eduzone@gmail.com</h3>
      <p className="text-white">Contact : +91 9876543210</p>
    </div>
  </div>
</footer>



    </div>
  );
};

export default HomeComponent;
