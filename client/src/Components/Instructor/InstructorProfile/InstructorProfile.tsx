import React from 'react'
import ProfileImage from '../../../assets/images/DefaultImages/Profile.png'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { RootState } from '../../../Redux/RootState/RootState'

const InstructorProfile : React.FC = () => {
  const { userInfo } = useSelector((state: RootState) => state.studentAuth)


  return (


    <div className='p-4 md:p-12 bg-gray-200'>
    <div className="container mx-auto px-4">
      <div className="flex flex-col md:flex-row">
        <div className="w-full md:w-1/4 p-5">
          <div className="bg-white rounded-lg shadow-md p-4">
            <div className="flex justify-center">
              <img src={userInfo?.photo||ProfileImage} alt="Profile" className="w-24 h-24 rounded-full" />
            </div>
            <h2 className="text-lg font-semibold text-center mt-4">{userInfo?.firstname}</h2>
            <div className="mt-8">
              <Link to={'/instructor/profile'}>
                <button className='block w-full bg-sky-900 text-white rounded-md py-2 px-4 mb-2 hover:bg-blue-600'>
                  Profile
                </button>
              </Link>
              <Link to={'/instructor/profileImage'}>
                <button className='block w-full bg-sky-600 text-white rounded-md py-2 px-4 mb-2 hover:bg-blue-600'>
                  Photo
                </button>
              </Link>
              <Link to={'/instructor/myCourses'}>
            <button className="block bg-sky-600 w-full text-white rounded-md py-2 px-4 hover:bg-blue-600">My Courses</button>
            </Link>
              <button className="block mt-2 w-full bg-sky-600 text-white rounded-md py-2 px-4 mb-2 hover:bg-blue-600">Revenue</button>
            </div>
          </div>
        </div>

        <div className="w-full md:w-3/4 p-5">
          <div className="bg-white rounded-lg shadow-md p-4 item-center">
            <div>
              <h2 className="text-xl font-bold mb-4 text-center">Instructor Profile</h2>
            </div>

            <div className="mb-4">
              <label className="block text-gray-700 font-bold mb-2">First Name:</label>
              <div className="bg-white border border-gray-600 rounded-md px-2 py-1">
                <p className="text-gray-800">{userInfo?.firstname}</p>
              </div>
            </div>

            <div className="mb-4">
              <label className="block text-gray-700 font-bold mb-2">Last Name:</label>
              <div className="bg-white border border-gray-600 rounded-md px-2 py-1">
                <p className="text-gray-800">{userInfo?.lastname}</p>
              </div>
            </div>

            <div className="mb-4">
              <label className="block text-gray-700 font-bold mb-2">Email:</label>
              <div className="bg-white border border-gray-600 rounded-md px-2 py-1">
                <p className="text-gray-800">{userInfo?.email}</p>
              </div>
            </div>

            <div className="mb-4">
              <label className="block text-gray-700 font-bold mb-2">Mobile Number:</label>
              <div className="bg-white border border-gray-600 rounded-md px-2 py-1">
                <p className="text-gray-800">{userInfo?.mobile}</p>
              </div>
            </div>

            <div className="flex justify-center">
              <Link to={'/instructor/editProfile'}>
                <button className='rounded bg-sky-600 px-5 py-2 text-white'>Edit Profile</button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>

  )
}

export default InstructorProfile
