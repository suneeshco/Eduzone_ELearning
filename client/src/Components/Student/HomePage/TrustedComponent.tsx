import React from 'react'

const TrustedComponent = () => {
  return (
    <div>
       <div className="mx-4 sm:mx-10 md:mx-20 mt-10 sm:mt-20 border-b pb-10">
  <div className="rounded-lg shadow-md p-4">
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-4">
      <div className="bg-indigo-500 bg-opacity-100 rounded-md p-6 h-auto sm:h-52 flex flex-col justify-center items-center">
        <p className="text-3xl sm:text-4xl font-bold text-black">200 +</p>
        <h4 className="text-lg sm:text-xl font-semibold text-black mb-2 sm:mb-4">Total Courses</h4>
      </div>
      <div className="bg-indigo-500 bg-opacity-100 rounded-md p-6 flex flex-col justify-center items-center">
        <p className="text-3xl sm:text-4xl font-bold text-black">100 +</p>
        <h4 className="text-lg sm:text-xl font-semibold text-black mb-2 sm:mb-4">Total Instructors</h4>
      </div>
      <div className="bg-indigo-500 bg-opacity-100 rounded-md p-6 flex flex-col justify-center items-center">
        <p className="text-3xl sm:text-4xl font-bold text-black">500 +</p>
        <h4 className="text-lg sm:text-xl font-semibold text-black mb-2 sm:mb-4">Total Reviews</h4>
      </div>
    </div>
  </div>
</div>

    </div>
  )
}

export default TrustedComponent
