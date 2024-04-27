import React, { useEffect, useState } from 'react'
import { studentApiRequest } from '../../../api/axios';

const TrustedComponent : React.FC= () => {
  const [course,setCourse] = useState(0)
  const [instructor, setInstructor] = useState(0)
  const [review,setReview] = useState(0)
  useEffect(()=>{
    const getOverview=async()=>{
      const response = await studentApiRequest({
        method: 'get',
        url: '/getOverview',
      }); 

      if(response.overView){
        setCourse(response.overView.courses)
        setInstructor(response.overView.instructor)
        setReview(response.overView.reviews)
      }
      
    }
    getOverview()
  },[])

  return (
    <div>
       <div className="mx-4 sm:mx-10 md:mx-20 mt-10 sm:mt-20 border-b pb-10">
  <div className="rounded-lg shadow-md p-4">
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-4">
      <div className="bg-indigo-500 bg-opacity-100 rounded-md p-6 h-auto sm:h-52 flex flex-col justify-center items-center">
        <p className="text-3xl sm:text-4xl font-bold text-black">{course} +</p>
        <h4 className="text-lg sm:text-xl font-semibold text-black mb-2 sm:mb-4">Total Courses</h4>
      </div>
      <div className="bg-indigo-500 bg-opacity-100 rounded-md p-6 flex flex-col justify-center items-center">
        <p className="text-3xl sm:text-4xl font-bold text-black">{instructor} +</p>
        <h4 className="text-lg sm:text-xl font-semibold text-black mb-2 sm:mb-4">Total Instructors</h4>
      </div>
      <div className="bg-indigo-500 bg-opacity-100 rounded-md p-6 flex flex-col justify-center items-center">
        <p className="text-3xl sm:text-4xl font-bold text-black">{review} +</p>
        <h4 className="text-lg sm:text-xl font-semibold text-black mb-2 sm:mb-4">Total Reviews</h4>
      </div>
    </div>
  </div>
</div>

    </div>
  )
}

export default TrustedComponent
