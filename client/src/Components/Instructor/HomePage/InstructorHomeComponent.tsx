import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Card} from '@material-tailwind/react';
import {
  CardBody,
  Typography,
} from "@material-tailwind/react";
import Chart from "react-apexcharts";
import { instructorApiRequest } from '../../../api/axios';
import { Course } from '../../../utils/apiTypes/ApiTypes';
import { useSelector } from 'react-redux';
import { RootState } from '../../../Redux/RootState/RootState';
import { ApexOptions } from 'apexcharts';

interface ExtendedApexOptions extends ApexOptions {
  options: any; 
}





const HomeComponent: React.FC = () => {
  const { userInfo } = useSelector((state: RootState) => state.studentAuth)
  const TABLE_HEAD = ["Course Name", "Course Fee",  "View"];

  const [totalAmount, setTotalAmount] = useState(0)
  const [courseCounts, setCourseCounts] = useState(0)
  const [studentCount, setStudentCount] = useState(0)
  const [orderCounts, setOrderCounts] = useState(0)
  const [currentItems, setCurrentItems] = useState<Course[]>([])
  const [chartData, setChartData] = useState<ExtendedApexOptions>({
    series: [
      {
        name: "Courses Purchased",
        data: [30, 40, 45, 55, 60, 70, 75, 80, 85, 90, 95, 100],
      },
    ],
    options: {
      chart: {
        type: "bar", // Change the type here
        height: 240,
        toolbar: {
          show: false,
        },
      },
      title: {
        text: "Courses Purchased Per Month",
        align: "left",
        style: {
          fontSize: "16px",
          fontWeight: "bold",
          fontFamily: "inherit",
          color: "#333",
        },
      },
      xaxis: {
        categories: [
          "Jan",
          "Feb",
          "Mar",
          "Apr",
          "May",
          "Jun",
          "Jul",
          "Aug",
          "Sep",
          "Oct",
          "Nov",
          "Dec",
        ],
      },
      yaxis: {
        title: {
          text: "Number of Courses",
          style: {
            fontSize: "14px",
            fontWeight: "bold",
            fontFamily: "inherit",
            color: "#333",
          },
        },
      },
      colors: ["#008080"],
      plotOptions: {
        bar: {
          columnWidth: "40%",
          borderRadius: 2,
        },
      },
      grid: {
        show: true,
        borderColor: "#dddddd",
        strokeDashArray: 5,
        xaxis: {
          lines: {
            show: true,
          },
        },
        padding: {
          top: 5,
          right: 20,
        },
      },
      fill: {
        opacity: 0.8,
      },
      tooltip: {
        theme: "dark",
      },
    },
  });




  useEffect(() => {
    const fetchChartData = async () => {
      try {
        const salesData = await instructorApiRequest({
          method: 'get',
          url: `/getSalesData/${userInfo?._id}`
        });
        setTotalAmount(salesData.totalAmount)
        setStudentCount(salesData.totalStudent)
        setCourseCounts(salesData.totalCourse)
        setOrderCounts(salesData.ordersCount)
        setCurrentItems(salesData.topCourse)
        setChartData(prevState => ({
          ...prevState,
          series: [
            {
              
              data: salesData.salesData,
            },
          ],
        }));
      } catch (error) {
        console.error("Error fetching sales data:", error);
      }
    };

    fetchChartData();
  }, []);
  return (
    <div className="flex flex-col md:flex-row bg-gray-100 min-h-screen overflow-y-scroll">
      <div className="pt-20   w-full  py-8 ">
        <div className='flex items-center justify-between px-4 py-4 border-b lg:py-6 dark:border-primary-darker'>
          <h1 className="text-2xl font-semibold">Dashboard</h1>
        </div>
        <div className='mt-2'>
          <div className='grid grid-cols-1 gap-8 p-4 lg:grid-cols-2 xl:grid-cols-4'>
            <div className="flex items-center justify-between p-4 bg-white rounded-md dark:bg-darker">
              <div>
                <h6 className='text-xs font-medium leading-none tracking-wider text-gray-500 uppercase dark:text-primary-light'>Value</h6>
                <span className='text-xl font-semibold'>₹ {totalAmount}</span>

              </div>
              <div>
                <span>
                  <svg className="w-12 h-12 text-gray-300 dark:text-primary-dark" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                  </svg>
                </span>
              </div>
            </div>

            <div className="flex items-center justify-between p-4 bg-white rounded-md dark:bg-darker">
              <div>
                <h6 className="text-xs font-medium leading-none tracking-wider text-gray-500 uppercase dark:text-primary-light">
                  Users
                </h6>
                <span className="text-xl font-semibold">{studentCount}</span>

              </div>
              <div>
                <span>
                  <svg className="w-12 h-12 text-gray-300 dark:text-primary-dark" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"></path>
                  </svg>
                </span>
              </div>
            </div>


            <div className="flex items-center justify-between p-4 bg-white rounded-md dark:bg-darker">
              <div>
                <h6 className="text-xs font-medium leading-none tracking-wider text-gray-500 uppercase dark:text-primary-light">
                  Orders
                </h6>
                <span className="text-xl font-semibold">{orderCounts}</span>

              </div>
              <div>
                <span>
                  <svg className="w-12 h-12 text-gray-300 dark:text-primary-dark" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"></path>
                  </svg>
                </span>
              </div>
            </div>


            <div className="flex items-center justify-between p-4 bg-white rounded-md dark:bg-darker">
              <div>
                <h6 className="text-xs font-medium leading-none tracking-wider text-gray-500 uppercase dark:text-primary-light">
                  Courses
                </h6>
                <span className="text-xl font-semibold">{courseCounts}</span>

              </div>
              <div>
                <span>
                  <svg className="w-12 h-12 text-gray-300 dark:text-primary-dark" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 5v2m0 4v2m0 4v2M5 5a2 2 0 00-2 2v3a2 2 0 110 4v3a2 2 0 002 2h14a2 2 0 002-2v-3a2 2 0 110-4V7a2 2 0 00-2-2H5z"></path>
                  </svg>
                </span>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 p-4 space-y-8 lg:gap-8 lg:space-y-0 lg:grid-cols-3">

            <div className="col-span-3 bg-white rounded-md dark:bg-darker" x-data="{ isOn: false }">

              <div className="flex items-center justify-between p-4 border-b dark:border-primary">
                <h4 className="text-lg font-semibold text-gray-500 dark:text-light">Bar Chart</h4>

              </div>

              <div className="relative p-4 h-72">
                <Chart options={chartData.options} series={chartData.series} type="bar" height={240} />
              </div>
            </div>


          </div>



          <div className='p-4'>
            <div className="col-span-3 bg-white rounded-md dark:bg-darker" x-data="{ isOn: false }">
              <div className="flex items-center justify-between p-4 border-b dark:border-primary">
                <h4 className="text-lg font-semibold text-gray-500 dark:text-light">Top Courses</h4>
              </div>
              <div className='p-4 h-full'>
                <Card className="h-full w-full pt-10 me-10  sm:px-10" placeholder={undefined}>

                  <CardBody className="overflow-scroll px-0" placeholder={undefined}>
                    <table className=" w-full min-w-max table-auto text-left">
                      <thead>
                        <tr>
                          {TABLE_HEAD.map((head) => (
                            <th key={head} className="border-y border-blue-gray-100 bg-blue-gray-50/50 p-4">
                              <Typography variant="small" color="blue-gray" className="font-normal leading-none opacity-70" placeholder={undefined}>
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
                                  <Typography variant="small" color="blue-gray" className="font-normal" placeholder={undefined}>
                                    {course.courseName}
                                  </Typography>
                                </div>
                              </div>
                            </td>
                            <td className="p-4">
                              <div className="flex items-center gap-3">
                                <div className="flex flex-col">
                                  <Typography variant="small" color="blue-gray" className="font-normal" placeholder={undefined}>
                                    {course.courseFee}
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

                </Card>
              </div>
            </div>
          </div>


        </div>
      </div>
    </div>
  );
};

export default HomeComponent;
