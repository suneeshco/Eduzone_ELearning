import React, { useEffect, useState } from 'react'
import {
    Card,
    CardHeader,
    CardBody,
    CardFooter,
    Typography,
    Tooltip,
} from "@material-tailwind/react";

import ProfileImage from '../../../assets/images/DefaultImages/Profile.png'
import { studentApiRequest } from '../../../api/axios';
import { InstructorData } from '../../../utils/apiTypes/ApiTypes';

const TutorList:React.FC = () => {

    const [instructorDetails,setInstructorDetails] = useState<InstructorData[]>([])


    const fetchInstructors = async () => {
        const response = await studentApiRequest({
          method: 'get',
          url: '/getInstructorList',
        });
        console.log(response);
        
        setInstructorDetails(response);
     };

     useEffect(()=>{
        fetchInstructors()
     },[])
    return (
        <div className='mt-20 p-10'>
            <h1 className='font-bold text-xl'>Our Expert Tutors</h1>
        <div className='p-10 h-screen grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6'>
           {instructorDetails.map((instructor)=>(
            <div>
            <Card className="w-full border" placeholder={undefined}>
                <CardHeader floated={false} className="h-48" placeholder={undefined}>
                    <img src={instructor.photo || ProfileImage} alt="profile-picture" className='object-cover-full'  />
                </CardHeader>
                <CardBody className="text-center" placeholder={undefined}>
                    <Typography variant="h4" color="blue-gray" className="mb-2" placeholder={undefined}>
                        {instructor.firstname}
                    </Typography>
                    <Typography color="blue-gray" className="font-medium" textGradient placeholder={undefined}>
                        {instructor.email}
                    </Typography>
                </CardBody>
                
            </Card>
            </div>
           ))} 
            
            
            
        </div>
        </div>
    )
}

export default TutorList
