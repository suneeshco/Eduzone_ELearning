import React , {useState,useEffect} from 'react'
import { studentApiRequest } from '../../../api/axios';
import { Course } from '../../../utils/apiTypes/ApiTypes';
import { Link } from 'react-router-dom';
import { FaStar, FaRegStar } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';


const BestSeller: React.FC = () => {



  const navigate = useNavigate()

    const [courseDetails, setCourseDetails] = useState<Course[]>([])
    const fetchCourses = async () => {
        try {
          const response = await studentApiRequest({
            method: 'get',
            url: '/getAllCourses',
            params:{sort:'rating'}
          });
          let courses = response.slice(0,4)
          setCourseDetails(courses);
          console.log(response);
        } catch (error) {
          console.error("Failed to fetch courses:", error);
        }
    
      };
      useEffect(() => {

        fetchCourses();
    
    
      }, [])





  return (
    <div>
      <div className="mx-4 sm:mx-10 md:mx-20 pt-8 pb-16 mt-10 sm:mt-20 border-b">
  <div className="flex flex-col sm:flex-row justify-between items-center mb-8">
    <h2 className="text-4xl font-bold text-white mb-4 sm:mb-0">Top Rated Courses</h2>
    <Link to={'/courses'}>
      <button className="text-lg font-semibold text-white border border-gray-800 rounded-lg px-6 py-3 transition duration-300 hover:bg-orange-500 hover:text-white bg-orange-700">
        Explore Courses
      </button>
    </Link>
  </div>
  
  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 max-w-6xl mx-auto">
    {courseDetails.map((course) => (
      <div key={course._id} className="bg-white border border-gray-200 shadow-xl overflow-hidden">
        <Link to={`/courseDetail/${course?._id}`}>
          <img className="w-full h-48 object-cover" src={course?.imageUrl} alt="Course Thumbnail" />
        </Link>
        <div className="p-4">
          <h4 className="text-lg font-bold text-gray-900">
            {course.courseName}
          </h4>
          <p className="mt-1 text-gray-800">
          {course.courseDescription.length > 100 ? course.courseDescription.substring(0, 100) + "..." : course.courseDescription}
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
</div>

    </div>
  )
}

export default BestSeller
