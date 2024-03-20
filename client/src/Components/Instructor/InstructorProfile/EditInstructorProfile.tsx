import React,{useState} from 'react'
import ProfileImage from '../../../assets/images/DefaultImages/profileDefault.png'
import Swal from 'sweetalert2';
import { useSelector } from 'react-redux'
import { RootState } from '../../../Redux/RootState/RootState'
import { useFormik } from 'formik';
import { updateProfileSchema } from '../../../Schemas/instructorValidation'
import { useNavigate } from 'react-router-dom'
import toast from 'react-hot-toast'
import { useDispatch } from 'react-redux';
import { setInstructorCredentials } from '../../../Redux/Slices/InstructorAuth';
import { instructorApiRequest } from '../../../api/axios';
import { Link } from 'react-router-dom';

const EditInstructorProfile = () => {

    const navigate = useNavigate()
    const dispatch = useDispatch()
    const {instructorInfo} = useSelector((state:RootState)=>state.instructorAuth)
    const { values, errors, touched, handleBlur, handleChange, handleSubmit } = useFormik({
        initialValues: {
          firstname: instructorInfo?.firstname || '',
          lastname: instructorInfo?.lastname || '',
          email: instructorInfo?.email || '',
          mobile: instructorInfo?.mobile || '',
        },
        validationSchema : updateProfileSchema, 
        onSubmit: async(values) => {

          const confirmation = await Swal.fire({
            title: 'Are you sure?',
            text: 'You are about to update the profile details',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, update!'
          });

          if(confirmation.isConfirmed){
            const response = await instructorApiRequest({
              method: 'put',
              url: '/updateProfile',
              data: {
                  firstname: values.firstname,
                  lastname: values.lastname,
                  email: values.email,
                  mobile: values.mobile,
                  id: instructorInfo?._id
              }
          });
            if (response?.instructor) {
                console.log(response.instructor);
                dispatch(setInstructorCredentials(response.instructor))
               toast.success("Successfully Updated")
                navigate("/instructor/profile");
              }
          }

             
        },
      }); 


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
    <Link to={'/instructor/profile'}>
                  {' '}
                  <button className='block w-full bg-sky-900 text-white rounded-md py-2 px-4 mb-2 hover:bg-blue-600'>
                    Profile
                  </button>
                </Link>
                <Link to={'/instructor/profileImage'}>
                  <button className='block w-full bg-sky-600 text-white rounded-md py-2 px-4 mb-2 hover:bg-blue-600'>
                    Photo
                  </button>
                </Link>
      <button className="block w-full bg-sky-600 text-white rounded-md py-2 px-4 mb-2 hover:bg-blue-600">My Courses</button>
      <button className="block w-full bg-sky-600 text-white rounded-md py-2 px-4 mb-2 hover:bg-blue-600">Revenue</button>
      <button className="block w-full bg-sky-600 text-white rounded-md py-2 px-4 hover:bg-blue-600">Logout</button>
    </div>
           
          </div>
        </div>

        
        <div className="w-3/4 p-5">
                        <form onSubmit={handleSubmit}>
                            <div className="bg-sky-100 rounded-lg shadow-md p-4">
                                <h2 className="text-xl font-bold mb-4 text-center">Edit Profile</h2>
                                <div className="mb-4">
                                    <label className="block text-gray-700 font-bold mb-2">First Name:</label>
                                    <input
                                        type="text"
                                        className={`appearance-none block w-full px-3 py-2 border rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm ${errors.firstname && touched.firstname ? 'border-red-500' : ''}`}
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
                                        className={`appearance-none block w-full px-3 py-2 border rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm ${errors.lastname && touched.lastname ? 'border-red-500' : ''}`}
                                        name="lastname"
                                        value={values.lastname}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                    />
                                    {errors.lastname && touched.lastname && <p className='text-red-500'>{errors.lastname}</p>}
                                </div>
                                <div className="mb-4">
                                    <label className="block text-gray-700 font-bold mb-2">Email:</label>
                                    <input
                                        type="email"
                                        className={`appearance-none block w-full px-3 py-2 border rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm ${errors.email && touched.email ? 'border-red-500' : ''}`}
                                        name="email"
                                        value={values.email}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                    />
                                    {errors.email && touched.email && <p className='text-red-500'>{errors.email}</p>}
                                </div>
                                <div className="mb-4">
                                    <label className="block text-gray-700 font-bold mb-2">Mobile Number:</label>
                                    <input
                                        type="text"
                                        className={`appearance-none block w-full px-3 py-2 border rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm ${errors.mobile && touched.mobile ? 'border-red-500' : ''}`}
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
