import React from 'react'
import ProfileImage from '../../../assets/images/DefaultImages/profileDefault.png'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { RootState } from '../../../Redux/RootState/RootState'

const InstructorProfile = () => {
    const {instructorInfo} = useSelector((state:RootState)=>state.instructorAuth)


  return (

    
    <div className='p-12 bg-gray-200'>
      <div className="container-fluid m-12 px-4 bg-orange-200 border-orange-500">
      <div className="flex">
        <div className="w-1/4 p-5 ">
          <div className="bg-green-100 rounded-lg shadow-md p-4">
          <div className="flex justify-center">
      <img src={ProfileImage} alt="Profile" className="w-24 h-24 rounded-full" />
    </div>
    <h2 className="text-lg font-semibold text-center mt-4">{instructorInfo?.firstname}</h2>
    <div className="mt-8">
      <button className="block w-full bg-sky-900 text-white rounded-md py-2 px-4 mb-2 hover:bg-blue-600">Profile</button>
      <button className="block w-full bg-sky-600 text-white rounded-md py-2 px-4 mb-2 hover:bg-blue-600">Photo</button>
      <button className="block w-full bg-sky-600 text-white rounded-md py-2 px-4 mb-2 hover:bg-blue-600">My Courses</button>
      <button className="block w-full bg-sky-600 text-white rounded-md py-2 px-4 mb-2 hover:bg-blue-600">Revenue</button>
      <button className="block w-full bg-sky-600 text-white rounded-md py-2 px-4 hover:bg-blue-600">Logout</button>
    </div>
           
          </div>
        </div>

        
    <div className="w-3/4 p-5 ">
        <div className="bg-sky-100 rounded-lg shadow-md p-4 item-center">


            
    <div>
    <h2 className="text-xl font-bold mb-4 text-center">Instructor Profile</h2>
    </div>
    
    <div className="mb-4 ">
      <label className="block text-gray-700 font-bold mb-2">First Name:</label>
      <div className="bg-white rounded-md px-2 py-1 w-1/2">
        <p className="text-gray-800">{instructorInfo?.firstname}</p>
      </div>
    </div>

    <div className="mb-4 ">
      <label className="block text-gray-700 font-bold mb-2">Last Name:</label>
      <div className="bg-white rounded-md px-2 py-1 w-1/2">
        <p className="text-gray-800">{instructorInfo?.lastname}</p>
      </div>
    </div>
    
    <div className="mb-4">
      <label className="block text-gray-700 font-bold mb-2">Email:</label>
      <div className="bg-white rounded-md px-2 py-1 w-1/2">
        <p className="text-gray-800">{instructorInfo?.email}</p>
      </div>
    </div>
    
    <div className="mb-4">
      <label className="block text-gray-700 font-bold mb-2">Mobile Number:</label>
      <div className="bg-white rounded-md px-2 py-1 w-1/2">
        <p className="text-gray-800">{instructorInfo?.mobile}</p>
      </div>
    </div>


    <div>
        <Link to={'/instructor/editProfile'}><button className='rounded bg-sky-600 px-5 py-2 text-white'>Edit Profile</button></Link>
    </div>
    

  </div>
</div>
      </div>
    </div>
    </div>
   
  )
}

export default InstructorProfile
