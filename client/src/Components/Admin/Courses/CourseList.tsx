import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Course } from '../../../utils/apiTypes/ApiTypes';
import { adminApiRequest} from '../../../api/axios';
import {
 Card,
 CardHeader,
 Input,
 Typography,
 CardBody,
 CardFooter
} from "@material-tailwind/react";
import Swal from 'sweetalert2';


const CourseList: React.FC = () => {
 const TABLE_HEAD = ["Course Name", "Course Fee", "Instructor", "Action", "Status"];

 const [courseDetails, setCourseDetails] = useState<Course[]>([]);
 const [search, setSearch] = useState<string>('');

 const [currentPage, setCurrentPage] = useState<number>(1);
 const [itemsPerPage] = useState<number>(10);
 const indexOfLastItem = currentPage * itemsPerPage;
 const indexOfFirstItem = indexOfLastItem - itemsPerPage;
 const currentItems = courseDetails.slice(indexOfFirstItem, indexOfLastItem);
 const paginate = (pageNumber: number) => setCurrentPage(pageNumber);
 const pageNumbers = [];
 for (let i = 1; i <= Math.ceil(courseDetails.length / itemsPerPage); i++) {
    pageNumbers.push(i);
 }

 const fetchCourses = async () => {
    const response = await adminApiRequest({
      method: 'get',
      url: '/getAllCourses',
      params: { search: search }
    });
    setCourseDetails(response);
 };

 const toggleStatus = async (id: string) => {
  const confirmation = await Swal.fire({
    title: 'Are you sure?',
    text: 'You are about to change the status of the course!',
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    confirmButtonText: 'Yes, Approve!'
  });

  if (confirmation.isConfirmed) {
    const response = await adminApiRequest({
      method: 'patch',
      url: '/changeCourseStatus',
      data: { id },
    });
    console.log(response);
    
    setCourseDetails(prevCourseDetails => {
      return prevCourseDetails.map(course => {
        if (course._id === id) {
          return { ...course, isApproved: !course.isApproved };
        }
        return course;
      });
    });
    Swal.fire(
      'Changed!',
      'Course status has been updated.',
      'success'
    );
  }
};

 useEffect(() => {
    fetchCourses();
 }, [search]);


  return (
    <div className="flex flex-col md:flex-row bg-gray-100 min-h-screen">
        

        <div className="pt-20  me-5 w-full  py-8 ">
    
  
    <Card className="h-full w-full pt-10 me-10  sm:px-10"  placeholder={undefined}>
  <CardHeader floated={false} shadow={false} className="rounded-none"  placeholder={undefined}>
    <div className="mb-8 flex flex-col sm:flex-row items-center justify-between gap-8">
      <div>
        <Typography variant="h5" color="blue-gray" className='font-bold'  placeholder={undefined}>
          Course list
        </Typography>
        <Typography color="gray" className="mt-1 font-normal"  placeholder={undefined}>
          See information about all courses
        </Typography>
      </div>
      <div className="w-full sm:w-72">
        <Input placeholder="Search..." className='border border-black' value={search} onChange={(e)=>{setSearch(e.target.value)}} crossOrigin={undefined} />
      </div>
    </div>
  </CardHeader>
  <CardBody className="overflow-scroll px-0"  placeholder={undefined}>
    <table className="mt-4 w-full min-w-max table-auto text-left">
      <thead>
        <tr>
          {TABLE_HEAD.map((head) => (
            <th key={head} className="border-y border-blue-gray-100 bg-blue-gray-50/50 p-4">
              <Typography variant="small" color="blue-gray" className="font-normal leading-none opacity-70"  placeholder={undefined}>
                {head}
              </Typography>
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {currentItems.map((course) => (
          <tr key={course._id}>
            <td className="p-4">
              <div className="flex items-center gap-3">
                <div className="flex flex-col">
                  <Typography variant="small" color="blue-gray" className="font-normal"  placeholder={undefined}>
                    {course.courseName}
                  </Typography>
                </div>
              </div>
            </td>
            <td className="p-4">
              <div className="flex items-center gap-3">
                <div className="flex flex-col">
                  <Typography variant="small" color="blue-gray" className="font-normal"  placeholder={undefined}>
                    {course.courseFee}
                  </Typography>
                </div>
              </div>
            </td>
            <td className="p-4">
              <div className="flex items-center gap-3">
                <div className="flex flex-col">
                  <Typography variant="small" color="blue-gray" className="font-normal"  placeholder={undefined}>
                    {course.instructorId?.firstname}
                  </Typography>
                </div>
              </div>
            </td>
            <td className="p-4">
              <Link to={`/admin/courseView/${course._id}`}>
                <button className="bg-green-500 text-white p-2 rounded mr-2 hover:bg-green-600">View</button>
              </Link>
            </td>
            <td className="p-4">
              {course.isApproved ? (
                <button className='text-green-900 bg-blue-300 p-2 rounded mr-2' onClick={() => toggleStatus(course._id)}>Approved</button>
              ):(
                <button onClick={() => toggleStatus(course._id)} className="bg-orange-500 text-white p-2 rounded mr-2 hover:bg-orange-600">Approve</button>

              )}
              
              
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  </CardBody>
  <CardFooter className="flex items-center justify-between border-t border-blue-gray-50 p-4"  placeholder={undefined}>
    <div>
      {pageNumbers.map((number) => (
        <button key={number} onClick={() => paginate(number)} className="rounded-md bg-green-400 text-white m-1 px-4 py-2 hover:bg-green-600">
          {number}
        </button>
      ))}
    </div>
  </CardFooter>
</Card>

  </div>
</div>

    
  )
}

export default CourseList
