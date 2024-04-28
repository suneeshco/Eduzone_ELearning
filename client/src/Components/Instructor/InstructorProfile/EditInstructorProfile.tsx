import React from 'react'
import ProfileImage from '../../../assets/images/DefaultImages/Profile.png'
import Swal from 'sweetalert2';
import { useSelector } from 'react-redux'
import { RootState } from '../../../Redux/RootState/RootState'
import { useFormik } from 'formik';
import { updateProfileSchema } from '../../../Schemas/instructorValidation'
import { useNavigate } from 'react-router-dom'
import toast from 'react-hot-toast'
import { useDispatch } from 'react-redux';
import { instructorApiRequest } from '../../../api/axios';
import { Link } from 'react-router-dom';
import { setStudentCredentials } from '../../../Redux/Slices/StudentAuth';

const EditInstructorProfile: React.FC = () => {

  const navigate = useNavigate()
  const dispatch = useDispatch()
  const { userInfo } = useSelector((state: RootState) => state.studentAuth)
  const { values, errors, touched, handleBlur, handleChange, handleSubmit } = useFormik({
    initialValues: {
      firstname: userInfo?.firstname || '',
      lastname: userInfo?.lastname || '',
      mobile: userInfo?.mobile || '',
    },
    validationSchema: updateProfileSchema,
    onSubmit: async (values) => {

      const confirmation = await Swal.fire({
        title: 'Are you sure?',
        text: 'You are about to update the profile details',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, update!'
      });

      if (confirmation.isConfirmed) {
        const response = await instructorApiRequest({
          method: 'put',
          url: '/updateProfile',
          data: {
            firstname: values.firstname,
            lastname: values.lastname,
            mobile: values.mobile,
            id: userInfo?._id
          }
        });
        if (response?.instructor) {
          console.log(response.instructor);
          dispatch(setStudentCredentials(response.instructor))
          toast.success("Successfully Updated")
          navigate("/instructor/profile");
        }
      }


    },
  });


  return (


    <div className='p-6 md:p-12 bg-gray-200'>
  <div className="container mx-auto md:m-12 px-4">
    <div className="flex flex-col md:flex-row">
      <div className="w-full md:w-1/4 p-5 ">
        <div className="bg-slate-50 rounded-lg shadow-md p-4">
          <div className="flex justify-center">
            <img src={userInfo?.photo?userInfo.photo:ProfileImage} alt="Profile" className="w-24 h-24 rounded-full" />
          </div>
          <h2 className="text-lg font-semibold text-center mt-4">{userInfo?.firstname}</h2>
          <div className="mt-8 flex flex-col gap-2">
            <Link to={'/instructor/profile'}>
              <button className='block bg-sky-900 text-white rounded-md w-full py-2 px-4 hover:bg-blue-600'>Profile</button>
            </Link>
            <Link to={'/instructor/profileImage'}>
              <button className='block bg-sky-600 text-white rounded-md w-full py-2 px-4 hover:bg-blue-600'>Photo</button>
            </Link>
            <Link to={'/instructor/myCourses'}>
            <button className="block bg-sky-600 w-full text-white rounded-md py-2 px-4 hover:bg-blue-600">My Courses</button>
            </Link>
            <button className="block bg-sky-600 text-white rounded-md py-2 px-4 hover:bg-blue-600">Revenue</button>
          </div>
        </div>
      </div>

      <div className="w-full md:w-3/4 p-5">
        <form onSubmit={handleSubmit}>
          <div className="bg-slate-50 rounded-lg shadow-md p-4">
            <h2 className="text-xl font-bold mb-4 text-center">Edit Profile</h2>
            <div className="mb-4">
              <label className="block text-gray-700 font-bold mb-2">First Name:</label>
              <input
                type="text"
                className={`appearance-none block w-full px-3 py-2 border border-gray-600 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm ${errors.firstname && touched.firstname ? 'border-red-500' : ''}`}
                name="firstname"
                value={values.firstname}
                onChange={handleChange}
                onBlur={handleBlur}
              />
              {errors.firstname && touched.firstname && <p className='text-red-500'>{errors.firstname}</p>}
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 font-bold mb-2">Last Name:</label>
              <input
                type="text"
                className={`appearance-none block w-full px-3 py-2 border border-gray-600 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm ${errors.lastname && touched.lastname ? 'border-red-500' : ''}`}
                name="lastname"
                value={values.lastname}
                onChange={handleChange}
                onBlur={handleBlur}
              />
              {errors.lastname && touched.lastname && <p className='text-red-500'>{errors.lastname}</p>}
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 font-bold mb-2">Mobile Number:</label>
              <input
                type="text"
                className={`appearance-none block w-full px-3 py-2 border border-gray-600 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm ${errors.mobile && touched.mobile ? 'border-red-500' : ''}`}
                name="mobile"
                value={values.mobile}
                onChange={handleChange}
                onBlur={handleBlur}
              />
              {errors.mobile && touched.mobile && <p className='text-red-500'>{errors.mobile}</p>}
            </div>
            <button type="submit" className="bg-sky-600 text-white rounded-md py-2 px-4 hover:bg-blue-600">Update Profile</button>
          </div>
        </form>
      </div>
    </div>
  </div>
</div>



  )
}

export default EditInstructorProfile
