import React , {useEffect, useState} from 'react'
import { Link } from 'react-router-dom'
import { Course } from '../../../utils/apiTypes/ApiTypes'
import { studentApiRequest } from '../../../api/axios'

const CourseList = () => {

    const [courseDetails , setCourseDetails] = useState<Course[]>([])

    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage] = useState(10);
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = courseDetails.slice(indexOfFirstItem, indexOfLastItem);
    const paginate = (pageNumber: number) => setCurrentPage(pageNumber);
    const pageNumbers = [];
    for (let i = 1; i <= Math.ceil(courseDetails.length / itemsPerPage); i++) {
      pageNumbers.push(i);
    }
    

    const fetchCourses = async() => {
      const response = await studentApiRequest({
        method: 'get',
        url: '/getAllCourses',
      });
       setCourseDetails(response)
        
    }

    useEffect(()=>{

      fetchCourses()

    },[courseDetails])


  return (
    <div className='flex-1'>
    <div className="w-full p-10 space-y-10 bg-gray-100 rounded shadow">
    <h2 className="text-2xl font-bold mb-4">List of Courses</h2>

<div className="bg-white shadow rounded-lg p-6">
<table className="table-auto w-full">
  <thead>
    <tr>
      <th className="px-4 py-2">Course Name</th>
      <th className="px-4 py-2">Fee</th>
      <th className="px-4 py-2">Instructor</th>
      <th className="px-4 py-2">Actions</th>
    </tr>
  </thead>
  <tbody>

    {currentItems.map((course) => (
      <tr key={course._id}>
       <td className="border px-4 py-2">{course.courseName}</td>
       <td className="border px-4 py-2">₹ {course.courseFee}</td>
       <td className="border px-4 py-2">{course.instructorId?.firstname}</td>
        
        <td className="border px-4 py-2">
         <Link to={`/admin/courseView/${course._id}`}><button  className="bg-green-500 text-white p-2 rounded mr-2 hover:bg-green-600" >
         View
         </button></Link>
        </td>
      </tr>
    ))}
  </tbody>
</table>
</div>

<div>
        
        {pageNumbers.map((number) => (
        <button key={number} onClick={() => paginate(number)} className="rounded-md bg-green-400 text-white m-2 px-4 py-2 hover:bg-green-600">
          {number}
        </button>
        ))}

      </div>

    </div>
    </div>   
  )
}

export default CourseList
