import React , {useEffect, useState} from 'react'
import {  InstructorData } from '../../../utils/apiTypes/ApiTypes'
import Swal from 'sweetalert2'
import { adminApiRequest } from '../../../api/axios'
import profileImage from '../../../assets/images/DefaultImages/Profile.png'
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
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

const InstructorList = () => {

  const TABLE_HEAD = ["Member", "Total Courses", "Status", "Action", ];

    const [InstructorDetails , setInstructorDetails] = useState<InstructorData[]>([])

    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage] = useState(10);
  
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = InstructorDetails.slice(indexOfFirstItem, indexOfLastItem);
  
    const paginate = (pageNumber: number) => setCurrentPage(pageNumber);
  
    const pageNumbers = [];
    for (let i = 1; i <= Math.ceil(InstructorDetails.length / itemsPerPage); i++) {
      pageNumbers.push(i);
    }
    

    const fetchStudents = async () => {
      const response = await adminApiRequest({
        method: 'get',
        url: '/getInstructorList',
    });
      setInstructorDetails(response)  
    }


    const toggleStatus = async (id:string) => {


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
            url: '/changeInstructorStatus',
            data: { id },
        });
          Swal.fire(
            'Changed!',
            'Instructor status has been updated.',
            'success'
          );
        }
    
    
        
     };

    useEffect(()=>{
        fetchStudents()
    },[InstructorDetails])


  return (
//     <div className='flex-1'>
//     <div className="w-full p-10 space-y-10 bg-gray-100 rounded shadow">
//     <h2 className="text-2xl font-bold mb-4">List of Instructors</h2>

// <div className="bg-white shadow rounded-lg p-6">
// <table className="table-auto w-full">
//   <thead>
//     <tr>
//       <th className="px-4 py-2">Student Name</th>
//       <th className="px-4 py-2">Status</th>
//       <th className="px-4 py-2">Actions</th>
//     </tr>
//   </thead>
//   <tbody>

//     {currentItems.map((student) => (
//       <tr key={student._id}>
//        <td className="border px-4 py-2">{student.firstname+' '+ student.lastname}</td>
        
//         <td className="border px-4 py-2 text-green-500 ">
        
//            {student.status ? 'Active' : 'Not Active'}
        
//         </td>
//         <td className="border px-4 py-2">
//          <button onClick={() => toggleStatus(student._id)} className="bg-green-500 text-white p-2 rounded mr-2 hover:bg-green-600" >
//          {student.status ? 'Block' : 'Unblock'}
//          </button>
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



<Card className="h-full w-full m-10 px-10"  placeholder={undefined}>
      <CardHeader floated={false} shadow={false} className="rounded-none"  placeholder={undefined}>
        <div className="mb-8 flex items-center justify-between gap-8">
          <div>
            <Typography variant="h5" color="blue-gray"  placeholder={undefined}>
              Instructors list
            </Typography>
            <Typography color="gray" className="mt-1 font-normal"  placeholder={undefined}>
              See information about all instructors
            </Typography>
          </div>
        </div>
        <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
          
            
          <div className="w-full md:w-72">
            <Input
            placeholder='Search...'
              label="Search" crossOrigin={undefined}/>
          </div>
        </div>
      </CardHeader>
      <CardBody className="overflow-scroll px-0"  placeholder={undefined}>
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
                    className="font-normal leading-none opacity-70"  placeholder={undefined}                  >
                    {head}
                  </Typography>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
 
          {currentItems.map((student) => ( 
                  <tr key={student._id}>
                    <td className='p-4'>
                      <div className="flex items-center gap-3">
                      <Avatar src={student.photo} alt="avatar" placeholder={undefined} />
                        <div className="flex flex-col">
                          <Typography
                            variant="small"
                            color="blue-gray"
                            className="font-normal"  placeholder={undefined}                          >
                            {student.firstname}
                          </Typography>
                          <Typography
                            variant="small"
                            color="blue-gray"
                            className="font-normal opacity-70"  placeholder={undefined}                          >
                            {student.email}
                          </Typography>
                        </div>
                      </div>
                    </td>


                    <td className='p-4'>
                      <div className="w-max">
                      <Typography
                            variant="small"
                            color="blue-gray"
                            className="font-normal"  placeholder={undefined}                          >
                            12
                          </Typography>
                      </div>
                    </td>
                    
                    <td className='p-4'>
                      <div className="w-max">
                        <Chip
                          variant="ghost"
                          size="sm"
                          value={student.status ? "active" : "blocked"}
                          color={student.status ? "green" : "blue-gray"}
                        />
                      </div>
                    </td>
                    
                    <td className='p-4'>
                      <Tooltip content="Edit User">
                      <button onClick={() => toggleStatus(student._id)} className="bg-green-500 text-white p-1 rounded mr-2 hover:bg-green-600" >
         {student.status ? 'Block' : 'Unblock'}
         </button>
                      </Tooltip>
                    </td>
                  </tr>
          ))}
          </tbody>
        </table>
      </CardBody>
      <CardFooter className="flex items-center justify-between border-t border-blue-gray-50 p-4"  placeholder={undefined}>
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

export default InstructorList
