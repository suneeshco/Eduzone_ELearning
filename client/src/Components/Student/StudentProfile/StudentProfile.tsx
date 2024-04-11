import React, { useState } from 'react'
import ProfileImage from '../../../assets/images/DefaultImages/Profile.png'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '../../../Redux/RootState/RootState'
import axios from 'axios'
import toast from 'react-hot-toast'
import Swal from 'sweetalert2'
import { setStudentCredentials } from '../../../Redux/Slices/StudentAuth'
import { studentApiRequest } from '../../../api/axios'
import { useFormik } from 'formik'
import { updateProfileSchema } from '../../../Schemas/studentLogin'

const StudentProfile: React.FC = () => {
  const { userInfo } = useSelector((state: RootState) => state.studentAuth)
  const [image, setImage] = useState<File | null>(null);
  const [cloudinaryURL, setCloudinaryURL] = useState<string | null>(null);
  const dispatch = useDispatch()
  const navigate = useNavigate()


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

        const response = await studentApiRequest({
          method: 'put',
          url: '/updateProfile',
          data: {
            firstname: values.firstname,
            lastname: values.lastname,
            mobile: values.mobile,
            id: userInfo?._id
          }
        });
        if (response?.user) {
          console.log(response.user);
          dispatch(setStudentCredentials(response.user))
          toast.success("Successfully Updated")
          navigate("/student/profile");
        }
      }


    },
  });

  const handleSubmitChange = (e: React.FormEvent<HTMLInputElement>) => {
    try {
      const inputElement = e.target as HTMLInputElement;
      const files = inputElement.files;
      if (files && files.length > 0) {
        const file = files[0];
        const fileExtension = file.name.split(".").pop();
        if (!fileExtension) {
          window.alert("Invalid file name. Please ensure the file has an extension.");
          return;
        }
        const allowedFileTypes = ["png", "jpg", "jpeg"];
        if (!allowedFileTypes.includes(fileExtension.toLowerCase())) {
          window.alert(`File does not support. Files type must be ${allowedFileTypes.join(", ")}`);
          return;
        }
        setImage(file);
      } else {
        setImage(null);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const submitImage = async () => {
    try {
      if (image) {
        const data = new FormData();
        data.append('file', image);
        data.append('upload_preset', 'images_preset');
        data.append('cloud_name', 'dwuy04s3s');

        const response = await axios.post(
          'https://api.cloudinary.com/v1_1/dwuy04s3s/image/upload',
          data
        );

        if (response.data && response.data.url) {
          setCloudinaryURL(response.data.url);
          return response.data.url;
        } else {
          console.error('Invalid response from Cloudinary', response.data);
        }
      } else {
        toast.error("Please choose an image to update")
        console.error('No image selected');
      }
    } catch (error) {
      console.error('Error while uploading image:', error);
    }
    return null;
  };

  const handleUpdatePhoto = async () => {

    const confirmation = await Swal.fire({
      title: 'Are you sure?',
      text: 'You are about to change the profile photo!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, Update!'
    });
    if (confirmation.isConfirmed) {
      const uploadedUrl = await submitImage();
      if (uploadedUrl) {
        const resp = await studentApiRequest({
          method: 'patch',
          url: '/studentChangeImage',
          data: {
            photo: uploadedUrl,
            userId: userInfo?._id
          }
        })
        if (resp?.user) {
          console.log(resp.user);
          dispatch(setStudentCredentials(resp.user))
          toast.success("Image Updated Successfully")
          navigate('/student/profile')
          console.log('Image uploaded successfully:', uploadedUrl);
        }

      }
    }

  };



  const handleDeletePhoto = async () => {

    const confirmation = await Swal.fire({
      title: 'Are you sure?',
      text: 'You are about to delete the profile photo!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, Delete!'
    });
    if (confirmation.isConfirmed) {
      try {
        const resp = await studentApiRequest({
          method: 'patch',
          url: '/studentChangeImage',
          data: {
            photo: "",
            userId: userInfo?._id,
          },
        });
        if (resp?.user) {
          dispatch(setStudentCredentials(resp.user));
          toast.success('Profile Photo Deleted Successfully');
          setCloudinaryURL(null);
          console.log('Profile photo deleted successfully');
        }
      } catch (error) {
        console.error('Error deleting profile photo:', error);
        toast.error('Failed to delete profile photo');
      }
    }

  };





  return (


    //   <div className='p-4 md:p-12 bg-gray-200'>
    //   <div className='container mx-auto px-4'>
    //     <div className='flex flex-col md:flex-row'>
    //       <div className='w-full md:w-1/4 p-5'>
    //         <div className='bg-white rounded-lg shadow-md p-4'>
    //           <div className='flex justify-center'>
    //             <img
    //               src={userInfo?.photo || ProfileImage}
    //               alt='Profile'
    //               className='w-24 h-24 rounded-full'
    //             />
    //           </div>
    //           <h2 className='text-lg font-semibold text-center mt-4'>
    //             {userInfo?.firstname}
    //           </h2>
    //           <div className='mt-8'>
    //             <Link to={'/student/profile'}>
    //               {' '}
    //               <button className='block w-full bg-sky-900 text-white rounded-md py-2 px-4 mb-2 hover:bg-blue-600'>
    //                 Profile
    //               </button>
    //             </Link>
    //             <Link to={'/student/profileImage'}>
    //               <button className='block w-full bg-sky-600 text-white rounded-md py-2 px-4 mb-2 hover:bg-blue-600'>
    //                 Photo
    //               </button>
    //             </Link>
    //             <Link to={'/enrolledCourses'}>
    //             <button className='block w-full bg-sky-600 text-white rounded-md py-2 px-4 mb-2 hover:bg-blue-600'>
    //               My Courses
    //             </button>
    //             </Link>
    //             <button className='block w-full bg-sky-600 text-white rounded-md py-2 px-4 mb-2 hover:bg-blue-600'>
    //               Certificates
    //             </button>
    //             <button className='block w-full bg-sky-600 text-white rounded-md py-2 px-4 hover:bg-blue-600'>
    //               Logout
    //             </button>
    //           </div>
    //         </div>
    //       </div>

    //       <div className='w-3/5   p-5'>
    //         <div className='bg-white rounded-lg shadow-md p-4  item-center '>
    //           <div>
    //             <h2 className='text-xl font-bold mb-4 text-center'>
    //               Student Profile
    //             </h2>
    //           </div>

    //           <div className='mb-4'>
    //             <label className='block text-gray-700 font-bold mb-2'>
    //               First Name:
    //             </label>
    //             <div className='bg-white rounded-md px-2 py-1 border border-gray-700 w-full md:w-4/5'>
    //               <p className='text-gray-800'>{userInfo?.firstname}</p>
    //             </div>
    //           </div>

    //           {userInfo?.lastname && (
    //             <div className='mb-4'>
    //               <label className='block text-gray-700 font-bold mb-2'>
    //                 Last Name:
    //               </label>
    //               <div className='bg-white rounded-md px-2 py-1 border border-gray-700 w-full md:w-4/5'>
    //                 <p className='text-gray-800'>{userInfo?.lastname}</p>
    //               </div>
    //             </div>
    //           )}

    //           <div className='mb-4'>
    //             <label className='block text-gray-700 font-bold mb-2'>
    //               Email:
    //             </label>
    //             <div className='bg-white rounded-md px-2 py-1 border border-gray-700 w-full md:w-4/5'>
    //               <p className='text-gray-800'>{userInfo?.email}</p>
    //             </div>
    //           </div>

    //           {userInfo?.mobile && (
    //             <div className='mb-4'>
    //               <label className='block text-gray-700 font-bold mb-2'>
    //                 Mobile Number:
    //               </label>
    //               <div className='bg-white rounded-md px-2 py-1 border border-gray-700 w-full md:w-4/5'>
    //                 <p className='text-gray-800'>{userInfo?.mobile}</p>
    //               </div>
    //             </div>
    //           )}

    //           <div>
    //             <Link to={'/student/editProfile'}>
    //               <button className='rounded bg-sky-600 px-5 py-2 text-white'>
    //                 Edit Profile
    //               </button>
    //             </Link>
    //           </div>
    //         </div>
    //       </div>
    //     </div>
    //   </div>
    // </div>




    <div className="bg-white mt-10 w-full pt-20 flex flex-col gap-5 px-3 md:px-16 lg:px-28 md:flex-row text-[#161931]">
      <aside className="py-4 md:w-1/3 lg:w-1/4 hidden md:block">
        <div className="sticky flex flex-col gap-2 p-4 text-sm border-r border-indigo-100 top-12">
          <h2 className="pl-3 mb-4 text-2xl font-semibold">Settings</h2>
          <Link to={'/student/profile'}><a href="#" className="flex items-center px-3 py-2.5 font-bold bg-white text-indigo-900 border rounded-full">
            Public Profile
          </a></Link>
          <Link to={'/enrolledCourses'}><a href="#" className="flex items-center px-3 py-2.5 font-semibold hover:text-indigo-900 hover:border hover:rounded-full">
            My Courses
          </a></Link>
          <Link to={'/myPurchaseHistory'}><a href="#" className="flex items-center px-3 py-2.5 font-semibold hover:text-indigo-900 hover:border hover:rounded-full">
            Purchase History
          </a></Link>
          <a href="#" className="flex items-center px-3 py-2.5 font-semibold hover:text-indigo-900 hover:border hover:rounded-full">
            Logout
          </a>

        </div>
      </aside>
      <main className="w-full min-h-screen py-1 md:w-2/3 lg:w-3/4">
        <div className="p-2 md:p-4">
          <div className="w-full px-6 pb-8 mt-8 sm:max-w-xl sm:rounded-lg">
            <h2 className="pl-6 text-2xl font-bold sm:text-xl">Public Profile</h2>
            <div className="grid max-w-2xl mx-auto mt-8">
              <div className="flex flex-col items-center space-y-5 sm:flex-row sm:space-y-0">
                <img className="object-cover w-40 h-40 p-1 rounded-full ring-2 ring-indigo-300 dark:ring-indigo-500" src={cloudinaryURL || userInfo?.photo || ProfileImage} alt="Bordered avatar" />
                <div className="flex flex-col space-y-5 sm:ml-8">
                  <span  onClick={handleUpdatePhoto} className="py-3.5 px-7 text-base font-medium text-indigo-100 focus:outline-none bg-[#202142] rounded-lg border border-indigo-200 hover:bg-indigo-900 focus:z-10 focus:ring-4 focus:ring-indigo-200">Change picture</span>
                  <button type="button" onClick={handleDeletePhoto} className="py-3.5 px-7 text-base font-medium text-indigo-900 focus:outline-none bg-white rounded-lg border border-indigo-200 hover:bg-indigo-100 hover:text-[#202142] focus:z-10 focus:ring-4 focus:ring-indigo-200">Delete picture</button>
                </div>

              </div>
              <div className='mt-5'>
                <input
                  type='file'
                  accept="image/png, image/jpeg"
                  onChange={handleSubmitChange}
                  className='mb-4'
                />
              </div>

              <div className="items-center mt-8 sm:mt-14 text-[#202142]">
                <form onSubmit={handleSubmit} className='space-y-4'>
                  <div className="flex flex-col items-center w-full mb-2 space-x-0 space-y-2 sm:flex-row sm:space-x-4 sm:space-y-0 sm:mb-6">
                    <div className="w-full">
                      <label htmlFor="firstname" className="block mb-2 text-sm font-medium text-indigo-900 dark:text-white">Your first name</label>
                      <input type="text" id="firstname" value={values.firstname}
                        onChange={handleChange}
                        onBlur={handleBlur} className="bg-indigo-50 border border-indigo-300 text-indigo-900 text-sm rounded-lg focus:ring-indigo-500 focus:border-indigo-500 block w-full p-2.5" placeholder="Your first name" />
                      {errors.firstname && touched.firstname && <p className='text-red-500'>{errors.firstname}</p>}
                    </div>
                    <div className="w-full">
                      <label htmlFor="lastname" className="block mb-2 text-sm font-medium text-indigo-900 dark:text-white">Your last name</label>
                      <input type="text" id="lastname" value={values.lastname}
                        onChange={handleChange}
                        onBlur={handleBlur} className="bg-indigo-50 border border-indigo-300 text-indigo-900 text-sm rounded-lg focus:ring-indigo-500 focus:border-indigo-500 block w-full p-2.5" placeholder="Your last name" />
                      {errors.lastname && touched.lastname && <p className='text-red-500'>{errors.lastname}</p>}
                    </div>
                  </div>
                  <div className="mb-2 sm:mb-6">
                    <label htmlFor="email" className="block mb-2 text-sm font-medium text-indigo-900 dark:text-white">Your email</label>
                    <input type="email" id="email" className="bg-indigo-50 border border-indigo-300 text-indigo-900 text-sm rounded-lg focus:ring-indigo-500 focus:border-indigo-500 block w-full p-2.5" placeholder="your.email@mail.com" readOnly  value={userInfo?.email || ""} />
                  </div>
                  <div className="mb-2 sm:mb-6">
                    <label htmlFor="mobile" className="block mb-2 text-sm font-medium text-indigo-900 dark:text-white">Mobile</label>
                    <input type="text" id="mobile" value={values.mobile}
                      onChange={handleChange}
                      onBlur={handleBlur} className="bg-indigo-50 border border-indigo-300 text-indigo-900 text-sm rounded-lg focus:ring-indigo-500 focus:border-indigo-500 block w-full p-2.5" placeholder="your mobile" />
                    {errors.mobile && touched.mobile && <p className='text-red-500'>{errors.mobile}</p>}
                  </div>

                  <div className="flex justify-end">
                    <button type="submit" className="text-white bg-indigo-700 hover:bg-indigo-800 focus:ring-4 focus:outline-none focus:ring-indigo-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-indigo-600 dark:hover:bg-indigo-700 dark:focus:ring-indigo-800">Save</button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>

  )
}

export default StudentProfile
