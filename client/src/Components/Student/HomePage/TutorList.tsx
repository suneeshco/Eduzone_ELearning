import React, { useEffect, useState } from 'react'


import ProfileImage from '../../../assets/images/DefaultImages/Profile.png'
import { studentApiRequest } from '../../../api/axios';
import { InstructorData } from '../../../utils/apiTypes/ApiTypes';

const TutorList: React.FC = () => {

    const [instructorDetails, setInstructorDetails] = useState<InstructorData[]>([])
    const [search , setSearch] = useState<string>('');


    const fetchInstructors = async () => {
        const response = await studentApiRequest({
            method: 'get',
            url: '/getInstructorList',
            params: { search: search }
        });
        console.log(response);

        setInstructorDetails(response);
    };

    useEffect(() => {
        fetchInstructors()
    }, [search])
    return (
        <div className="bg-white py-12 mt-20 ">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 min-h-screen  ">
        <div className="flex justify-between items-center mb-8">
            <h2 className="text-3xl font-extrabold text-gray-900">Our Expert Tutors</h2>
            <input
                type="text"
                className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-800"
                placeholder="Search for an instructor..."
                onChange={(e)=>{setSearch(e.target.value)}}
                value={search}
            />
        </div>
        
        <div className="grid pt-10 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {instructorDetails.map((instructor, index) => (
                <div key={index} className="shadow-md overflow-hidden flex flex-col items-center p-6">
                    <div className="relative w-32 h-32 mb-4">
                        <img
                            className="w-full h-full object-cover rounded-full border-2 border-green-900"
                            src={instructor.photo || ProfileImage}
                            alt={`${instructor.firstname} ${instructor.lastname}`}
                        />
                    </div>
                    <div className="text-center">
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
