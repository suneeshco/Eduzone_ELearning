import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { Course } from '../../../utils/apiTypes/ApiTypes'
import { studentApiRequest } from '../../../api/axios'
import {
  Card,
  CardHeader,
  Input,
  Typography,
  Button,
  CardBody,
  Chip,
  CardFooter,
  Tabs,
  TabsHeader,
  Tab,
  Avatar,
  IconButton,
  Tooltip,
} from "@material-tailwind/react";

const CourseList = () => {

  const TABLE_HEAD = ["Course Name", "Course Fee", "Instructor", "Action",];

  const [courseDetails, setCourseDetails] = useState<Course[]>([])

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


  const fetchCourses = async () => {
    const response = await studentApiRequest({
      method: 'get',
      url: '/getAllCourses',
    });
    setCourseDetails(response)

  }

  useEffect(() => {

    fetchCourses()

  }, [courseDetails])


  return (
    //     <div className='flex-1'>
    //     <div className="w-full p-10 space-y-10 bg-gray-100 rounded shadow">
    //     <h2 className="text-2xl font-bold mb-4">List of Courses</h2>

    // <div className="bg-white shadow rounded-lg p-6">
    // <table className="table-auto w-full">
    //   <thead>
    //     <tr>
    //       <th className="px-4 py-2">Course Name</th>
    //       <th className="px-4 py-2">Fee</th>
    //       <th className="px-4 py-2">Instructor</th>
    //       <th className="px-4 py-2">Actions</th>
    //     </tr>
    //   </thead>
    //   <tbody>

    //     {currentItems.map((course) => (
    //       <tr key={course._id}>
    //        <td className="border px-4 py-2">{course.courseName}</td>
    //        <td className="border px-4 py-2">₹ {course.courseFee}</td>
    //        <td className="border px-4 py-2">{course.instructorId?.firstname}</td>

    //         <td className="border px-4 py-2">
    //          <Link to={`/admin/courseView/${course._id}`}><button  className="bg-green-500 text-white p-2 rounded mr-2 hover:bg-green-600" >
    //          View
    //          </button></Link>
    //         </td>
    //       </tr>
    //     ))}
    //   </tbody>
    // </table>
    // </div>

    // <div>

    //         {pageNumbers.map((number) => (
    //         <button key={number} onClick={() => paginate(number)} className="rounded-md bg-green-400 text-white m-2 px-4 py-2 hover:bg-green-600">
    //           {number}
    //         </button>
    //         ))}

    //       </div>

    //     </div>
    //     </div> 


    <Card className="h-full w-full m-10 px-10" placeholder={undefined}>
      <CardHeader floated={false} shadow={false} className="rounded-none" placeholder={undefined}>
        <div className="mb-8 flex items-center justify-between gap-8">
          <div>
            <Typography variant="h5" color="blue-gray" placeholder={undefined}>
              Course list
            </Typography>
            <Typography color="gray" className="mt-1 font-normal" placeholder={undefined}>
              See information about all courses
            </Typography>
          </div>
        </div>
        <div className="flex flex-col items-center justify-between gap-4 md:flex-row">


          <div className="w-full md:w-72">
            <Input
              placeholder='Search...'
              label="Search" crossOrigin={undefined} />
          </div>
        </div>
      </CardHeader>
      <CardBody className="overflow-scroll px-0" placeholder={undefined}>
        <table className="mt-4 w-full min-w-max table-auto text-left">
          <thead>
            <tr>
              {TABLE_HEAD.map((head) => (
                <th
                  key={head}
                  className="border-y border-blue-gray-100 bg-blue-gray-50/50 p-4"
                >
                  <Typography
                    variant="small"
                    color="blue-gray"
                    className="font-normal leading-none opacity-70" placeholder={undefined}                  >
                    {head}
                  </Typography>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>

            {currentItems.map((course) => (
              <tr key={course._id}>
                <td className='p-4'>
                  <div className="flex items-center gap-3">

                    <div className="flex flex-col">
                      <Typography
                        variant="small"
                        color="blue-gray"
                        className="font-normal" placeholder={undefined}                          >
                        {course.courseName}
                      </Typography>

                    </div>
                  </div>
                </td>

                <td className='p-4'>
                  <div className="flex items-center gap-3">

                    <div className="flex flex-col">
                      <Typography
                        variant="small"
                        color="blue-gray"
                        className="font-normal" placeholder={undefined}                          >
                        {course.courseFee}
                      </Typography>

                    </div>
                  </div>
                </td>

                <td className='p-4'>
                  <div className="flex items-center gap-3">

                    <div className="flex flex-col">
                      <Typography
                        variant="small"
                        color="blue-gray"
                        className="font-normal" placeholder={undefined}                          >
                        {course.instructorId?.firstname}
                      </Typography>

                    </div>
                  </div>
                </td>

                <td className='p-4'>
                  <Link to={`/admin/courseView/${course._id}`}><button className="bg-green-500 text-white p-2 rounded mr-2 hover:bg-green-600" >
                    View
                  </button></Link>
                </td>

              </tr>
            ))}
          </tbody>
        </table>
      </CardBody>
      <CardFooter className="flex items-center justify-between border-t border-blue-gray-50 p-4" placeholder={undefined}>
        <div>

          {pageNumbers.map((number) => (
            <button key={number} onClick={() => paginate(number)} className="rounded-md bg-green-400 text-white m-2 px-4 py-2 hover:bg-green-600">
              {number}
            </button>
          ))}

        </div>
      </CardFooter>
    </Card>
  )
}

export default CourseList
