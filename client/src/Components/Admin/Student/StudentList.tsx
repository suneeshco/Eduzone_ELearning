import React, { useEffect, useState } from 'react';
import { UserData } from '../../../utils/apiTypes/ApiTypes';
import profileImage from '../../../assets/images/DefaultImages/Profile.png';
import Swal from 'sweetalert2';
import { adminApiRequest } from '../../../api/axios';
import {
  Card,
  CardHeader,
  Input,
  Typography,
  CardBody,
  Chip,
  CardFooter,
  Avatar,
  Tooltip,
} from "@material-tailwind/react";

const StudentList: React.FC = () => {
  

  const TABLE_HEAD = ["Member", "Courses Purchased", "Status", "Action",];

  const [search, setSearch] = useState<string>('');

  const [studentDetails, setStudentDetails] = useState<UserData[]>([]);

  const [currentPage, setCurrentPage] = useState<number>(1);
  const [itemsPerPage] = useState<number>(10);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = studentDetails.slice(indexOfFirstItem, indexOfLastItem);

  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(studentDetails.length / itemsPerPage); i++) {
    pageNumbers.push(i);
  }

  const fetchStudents = async () => {
    const response = await adminApiRequest({
      method: 'get',
      url: '/getStudentList',
      params: { search: search }
    });
    setStudentDetails(response);
  };

  const toggleStatus = async (id: string) => {
    const confirmation = await Swal.fire({
      title: 'Are you sure?',
      text: 'You are about to change the status of this category!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, change status!'
    });

    if (confirmation.isConfirmed) {
      const response = await adminApiRequest({
        method: 'patch',
        url: '/changeStudentStatus',
        data: { id },
      });
      setStudentDetails(prevStudentDetails => {
        return prevStudentDetails.map(student => {
          if (student._id === id) {
            return { ...student, status: !student.status };
          }
          return student;
        });
      });
      console.log("hello", response);
      Swal.fire(
        'Changed!',
        'Student status has been updated.',
        'success'
      );
    }
  };

  useEffect(() => {
    fetchStudents();
  }, [search]);


  return (




    <div className="flex flex-col md:flex-row bg-white min-h-screen">
      <div className="pt-20   w-full   ">
        <Card className="h-full w-full pt-10 mt-4 md:mt-0 bg-white  px-4 md:px-10" placeholder={undefined}>
          <CardHeader floated={false} shadow={false} className="rounded-none" placeholder={undefined}>
            <div className="mb-4 md:mb-8 flex flex-col md:flex-row items-center justify-between gap-4 md:gap-8">
              <div className="md:w-2/3">
                <Typography variant="h5" color="blue-gray" className='font-bold' placeholder={undefined}>
                  Students list
                </Typography>
                <Typography color="gray" className="mt-1 font-normal" placeholder={undefined}>
                  See information about all students
                </Typography>
              </div>
              <div className="w-full md:w-auto">
                <Input
                  placeholder='Search...' className='border border-black'
                  value={search} onChange={(e) => { setSearch(e.target.value) }}
                  crossOrigin={undefined}
                />
              </div>
            </div>
          </CardHeader>
          <CardBody className="overflow-scroll px-0" placeholder={undefined}>
            <table className="mt-4 w-full min-w-max table-auto text-left">
              <thead>
                <tr>
                  {TABLE_HEAD.map((head, index) => (
                    <th
                      key={index}
                      className="border-y border-blue-gray-100 bg-blue-gray-50/50 p-2 md:p-4"
                    >
                      <Typography
                        variant="small"
                        color="blue-gray"
                        className="font-normal leading-none opacity-70" placeholder={undefined}                >
                        {head}
                      </Typography>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {currentItems.map((student) => (
                  <tr key={student._id}>
                    <td className='p-2 md:p-4'>
                      <div className="flex items-center gap-3">
                        <Avatar src={student.photo ? student.photo : profileImage} alt="avatar" placeholder={undefined} />
                        <div className="flex flex-col">
                          <Typography
                            variant="small"
                            color="blue-gray"
                            className="font-normal" placeholder={undefined}                    >
                            {student.firstname}
                          </Typography>
                          <Typography
                            variant="small"
                            color="blue-gray"
                            className="font-normal opacity-70" placeholder={undefined}                    >
                            {student.email}
                          </Typography>
                        </div>
                      </div>
                    </td>
                    <td className='p-2 md:p-4'>
                      <div className="w-max">
                        <Typography
                          variant="small"
                          color="blue-gray"
                          className="font-normal" placeholder={undefined}                  >
                          12
                        </Typography>
                      </div>
                    </td>
                    <td className='p-2 md:p-4'>
                      <div className="w-max">
                        <Chip
                          variant="ghost"
                          size="sm"
                          value={student.status ? "active" : "blocked"}
                          color={student.status ? "green" : "blue-gray"}
                        />
                      </div>
                    </td>
                    <td className='p-2 md:p-4'>
                      <Tooltip content="Edit User">
                        <button onClick={() => toggleStatus(student._id)} className="bg-green-500 text-white p-1 rounded mr-2 hover:bg-green-600">
                          {student.status ? 'Block' : 'Unblock'}
                        </button>
                      </Tooltip>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </CardBody>
          <CardFooter className="flex items-center justify-center md:justify-between border-t border-blue-gray-50 p-4" placeholder={undefined}>
            <div>
              {pageNumbers.map((number) => (
                <button key={number} onClick={() => paginate(number)} className="rounded-md bg-green-400 text-white m-1 md:m-2 px-3 py-1 hover:bg-green-600">
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

export default StudentList
