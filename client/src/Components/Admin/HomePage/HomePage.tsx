import React from 'react';
import { Link } from 'react-router-dom';
import { PresentationChartBarIcon, ShoppingBagIcon, UserCircleIcon, PowerIcon } from '@heroicons/react/24/solid';
import { Card, List, ListItem, ListItemPrefix } from '@material-tailwind/react';
import {
  CardBody,
  CardHeader,
  Typography,
} from "@material-tailwind/react";
import Chart from "react-apexcharts";
import { Square3Stack3DIcon } from "@heroicons/react/24/outline";
 

const chartConfig = {
  type: "bar",
  height: 240,
  series: [
    {
      name: "Sales",
      data: [50, 40, 300, 320, 500, 350, 200, 230, 500],
    },
  ],
  options: {
    chart: {
      toolbar: {
        show: false,
      },
    },
    title: {
      show: "",
    },
    dataLabels: {
      enabled: false,
    },
    colors: ["#020617"],
    plotOptions: {
      bar: {
        columnWidth: "40%",
        borderRadius: 2,
      },
    },
    xaxis: {
      axisTicks: {
        show: false,
      },
      axisBorder: {
        show: false,
      },
      labels: {
        style: {
          colors: "#616161",
          fontSize: "12px",
          fontFamily: "inherit",
          fontWeight: 400,
        },
      },
      categories: [
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
      labels: {
        style: {
          colors: "#616161",
          fontSize: "12px",
          fontFamily: "inherit",
          fontWeight: 400,
        },
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
};

const HomeComponent: React.FC = () => {
 return (
  <div className="flex flex-col md:flex-row bg-gray-100 min-h-screen">
        

  <div className="pt-20   w-full  py-8 ">
      

      <div className="flex-1 ">
      <Card  placeholder={undefined} className='mx-40 mt-20'>
      <CardHeader
           floated={false}
           shadow={false}
           color="transparent"
           className="flex flex-col gap-4 rounded-none md:flex-row md:items-center"  placeholder={undefined}      >
        <div className="w-max rounded-lg bg-gray-900 p-5 text-white">
          <Square3Stack3DIcon className="h-6 w-6" />
        </div>
        <div>
          <Typography variant="h6" color="blue-gray"  placeholder={undefined}>
            Statistics
          </Typography>
          
        </div>
      </CardHeader>
      <CardBody className="px-2 pb-0"  placeholder={undefined}>
        <Chart {...chartConfig} />
      </CardBody>
    </Card>
      </div>
    </div>
    </div>
 );
};

export default HomeComponent;
