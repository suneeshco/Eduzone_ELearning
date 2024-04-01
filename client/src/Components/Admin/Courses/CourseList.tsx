import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Course } from '../../../utils/apiTypes/ApiTypes';
import { studentApiRequest } from '../../../api/axios';
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
 List,
 ListItem,
 ListItemPrefix,
} from "@material-tailwind/react";
import { PresentationChartBarIcon, ShoppingBagIcon, UserCircleIcon, PowerIcon } from '@heroicons/react/24/solid';


const CourseList: React.FC = () => {
 const TABLE_HEAD = ["Course Name", "Course Fee", "Instructor", "Action",];

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
    const response = await studentApiRequest({
      method: 'get',
      url: '/getAllCourses',
      params: { search: search }
    });
    setCourseDetails(response);
 };

 useEffect(() => {
    fetchCourses();
 }, [courseDetails]);


  return (
    <div className="flex flex-col md:flex-row bg-gray-100 min-h-screen">
    <Card className="h-auto md:h-screen md:max-h-[calc(100vh-2rem)] md:w-[16rem] p-4 shadow-xl shadow-blue-gray-900/5"  placeholder={undefined}>
      <List  placeholder={undefined}>
        <Link to={'/admin'}>
          <ListItem className='text-black'  placeholder={undefined}>
            <ListItemPrefix  placeholder={undefined}>
              <PresentationChartBarIcon className="h-5 w-5" />
            </ListItemPrefix>
            Dashboard
          </ListItem>
        </Link>
        <Link to={'/admin/category'}>
          <ListItem className='text-black'  placeholder={undefined}>
            <ListItemPrefix  placeholder={undefined}>
              <ShoppingBagIcon className="h-5 w-5" />
            </ListItemPrefix>
            Categories
          </ListItem>
        </Link>
        <Link to={'/admin/studentList'}>
          <ListItem className='text-black'  placeholder={undefined}>
            <ListItemPrefix  placeholder={undefined}>
              <UserCircleIcon className="h-5 w-5" />
            </ListItemPrefix>
            Student List
          </ListItem>
        </Link>
        <Link to={'/admin/instructorList'}>
          <ListItem className='text-black'  placeholder={undefined}>
            <ListItemPrefix  placeholder={undefined}>
              <UserCircleIcon className="h-5 w-5" />
            </ListItemPrefix>
            Instructor List
          </ListItem>
        </Link>
        <Link to={'/admin/courseList'}>
          <ListItem className='text-black'  placeholder={undefined}>
            <ListItemPrefix  placeholder={undefined}>
              <ShoppingBagIcon className="h-5 w-5" />
            </ListItemPrefix>
            Course List
          </ListItem>
        </Link>
        
      </List>
    </Card>
  
    <Card className="h-full w-full m-5 sm:m-10 px-5 sm:px-10"  placeholder={undefined}>
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


    
  )
}

export default CourseList
