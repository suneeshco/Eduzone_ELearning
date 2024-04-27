import React, { useEffect, useState } from 'react'


import ProfileImage from '../../../assets/images/DefaultImages/Profile.png'
import { studentApiRequest } from '../../../api/axios';
import { InstructorData } from '../../../utils/apiTypes/ApiTypes';

const TutorList: React.FC = () => {

    const [instructorDetails, setInstructorDetails] = useState<InstructorData[]>([])


    const fetchInstructors = async () => {
        const response = await studentApiRequest({
            method: 'get',
            url: '/getInstructorList',
        });
        console.log(response);

        setInstructorDetails(response);
    };

    useEffect(() => {
        fetchInstructors()
    }, [])
    return (
        <div className="bg-gray-100 py-12 mt-20">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-screen" >
                <h2 className="text-3xl font-extrabold text-gray-900 text-center mb-8">Our Expert Tutors</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                    {instructorDetails.map((instructor, index) => (
                        <div key={index} className="bg-white rounded-lg shadow-md overflow-hidden">
                            <div className="relative pb-48 overflow-hidden">
                                <img
                                    className="absolute inset-0 h-full w-full object-cover-full"
                                    src={instructor.photo || ProfileImage}
                                    alt={`${instructor.firstname} ${instructor.lastname}`}
                                />
                            </div>
                            <div className="p-6">
                                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                                    {instructor.firstname} {instructor.lastname}
                                </h3>
                                <p className="text-gray-500">{instructor.email}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default TutorList
