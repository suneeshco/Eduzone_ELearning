
import { Avatar, Card, CardBody, CardFooter, CardHeader,  Typography } from '@material-tailwind/react'
import  { useEffect, useState } from 'react';

import {  studentApiRequest } from '../../../api/axios';
import { useSelector } from 'react-redux'
import { RootState } from '../../../Redux/RootState/RootState'

interface OrderData {
    _id:string;
    instructorId : any;
    studentId : any;
    courseId : any;
    createdAt : Date;
    amount : number;
    orderId:string;
}

const PurchaseHistory = () => {
    const { userInfo } = useSelector((state: RootState) => state.studentAuth);

    
    const TABLE_HEAD = ["OrderId","Course", "Instructor", "Amount", "Purchase Date",];
    const [orderDetails, setOrderDetails] = useState<OrderData[]>([]);
    // const [search,setSearch] =useState<string>('')


    const [currentPage, setCurrentPage] = useState<number>(1);
 const [itemsPerPage] = useState<number>(5);

 const indexOfLastItem = currentPage * itemsPerPage;
 const indexOfFirstItem = indexOfLastItem - itemsPerPage;
 const currentItems = orderDetails.slice(indexOfFirstItem, indexOfLastItem);

 const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

 const pageNumbers = [];
 for (let i = 1; i <= Math.ceil(orderDetails.length / itemsPerPage); i++) {
    pageNumbers.push(i);
 }

    const fetchOrders = async () => {
        const response = await studentApiRequest({
            method: 'get',
            url: `/getEnrolledCourses/${userInfo?._id}`,
          });

          console.log("courses",response);
          
          setOrderDetails(response);
     };


     useEffect(() => {
        fetchOrders();
     }, []);

     console.log("details ",orderDetails);
     
  return (
    
      

      <Card className=" h-screen w-full mt-20  px-20 pt-14   "  placeholder={undefined}>
    <CardHeader floated={false} shadow={false} className="rounded-none"  placeholder={undefined}>
      <div className="mb-4 md:mb-8 flex flex-col md:flex-row items-center justify-between gap-4 md:gap-8">
        <div className="md:w-2/3">
          <Typography variant="h5" color="blue-gray" className='font-bold'  placeholder={undefined}>
            Course Purchase History
          </Typography>
          <Typography color="gray" className="mt-1 font-normal"  placeholder={undefined}>
            See information about all purchased courses
          </Typography>
        </div>
        <div className="w-full md:w-auto">
          {/* <Input
            placeholder='Search...' className='border border-black'
            value={search} onChange={(e)=>{setSearch(e.target.value)}}
            crossOrigin={undefined}
          /> */}
        </div>
      </div>
    </CardHeader>
    <CardBody className="overflow-scroll px-0"  placeholder={undefined}>
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
                  className="font-normal leading-none opacity-70"  placeholder={undefined}                >
                  {head}
                </Typography>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {currentItems.map((order) => (
            <tr key={order._id}>
                <td className='p-2 md:p-4'>
                <div className="w-max">
                  <Typography
                    variant="small"
                    color="blue-gray"
                    className="font-normal"  placeholder={undefined}                  >
                    {order.orderId}
                  </Typography>
                </div>
              </td>
              <td className='p-2 md:p-4'>
                <div className="flex items-center gap-3">
                  <Avatar src={order.courseId.imageUrl} alt="avatar" placeholder={undefined} />
                  <div className="flex flex-col">
                    <Typography
                      variant="small"
                      color="blue-gray"
                      className="font-normal"  placeholder={undefined}                    >
                      {order.courseId.courseName}
                    </Typography>
                  </div>
                </div>
              </td>
              <td className='p-2 md:p-4'>
                <div className="w-max">
                  <Typography
                    variant="small"
                    color="blue-gray"
                    className="font-normal"  placeholder={undefined}                  >
                    {order.instructorId.firstname}
                  </Typography>
                </div>
              </td>
              <td className='p-2 md:p-4'>
                <div className="w-max">
                  <Typography
                    variant="small"
                    color="blue-gray"
                    className="font-normal"  placeholder={undefined}                  >
                    ₹ {order.amount}
                  </Typography>
                </div>
              </td>
              <td className='p-2 md:p-4'>
                <div className="w-max">
                  <Typography
                    variant="small"
                    color="blue-gray"
                    className="font-normal"  placeholder={undefined}                  >
                     {new Date(order.createdAt).toLocaleDateString()}
                  </Typography>
                </div>
              </td>
              
            </tr>
          ))}
        </tbody>
      </table>
    </CardBody>
    <CardFooter className="flex items-center justify-center md:justify-between border-t border-blue-gray-50 p-4"  placeholder={undefined}>
      <div>
        {pageNumbers.map((number) => (
          <button key={number} onClick={() => paginate(number)} className="rounded-md bg-green-400 text-white m-1 md:m-2 px-3 py-1 hover:bg-green-600">
            {number}
          </button>
        ))}
      </div>
    </CardFooter>
  </Card>
 
  )
}

export default PurchaseHistory
