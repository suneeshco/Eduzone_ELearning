import React, { useState } from 'react';
import { useSelector , useDispatch } from 'react-redux';
import { RootState } from '../../../Redux/RootState/RootState';
import ProfileImage from '../../../assets/images/DefaultImages/Profile.png';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { studentApiRequest } from '../../../api/axios';
import { setStudentCredentials } from '../../../Redux/Slices/StudentAuth';
import toast from 'react-hot-toast';
import Swal from 'sweetalert2';

const ProfilePhoto = () => {
  const { userInfo } = useSelector((state: RootState) => state.studentAuth);
  const [image, setImage] = useState<File | null>(null);
  const [cloudinaryURL, setCloudinaryURL] = useState<string | null>(null);
  const dispatch= useDispatch()
  const navigate = useNavigate()

  const handleSubmitChange = (e: React.FormEvent<HTMLInputElement>) => {
    try {
      const inputElement = e.target as HTMLInputElement;
      const files = inputElement.files;
      if (files && files.length > 0) {
        const file = files[0];
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
            photo:uploadedUrl,
            userId : userInfo?._id
        }
      })
      if(resp?.user){
        console.log(resp.user);
        dispatch(setStudentCredentials(resp.user))
        toast.success("Image Updated Successfully")
        navigate('/student/profileImage')
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
                  photo:"",
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
    <div className='p-12 bg-gray-200'>
      <div className='container-fluid m-12 px-4 bg-orange-200 border-orange-500'>
        <div className='flex'>
          <div className='w-1/4 p-5'>
            <div className='bg-green-100 rounded-lg shadow-md p-4'>
              <div className='flex justify-center'>
                <img
                  src={cloudinaryURL || userInfo?.photo || ProfileImage}
                  alt='Profile'
                  className='w-24 h-24 rounded-full'
                />
              </div>
              <h2 className='text-lg font-semibold text-center mt-4'>
                {userInfo?.firstname}
              </h2>
              <div className='mt-8'>
                <Link to={'/student/profile'}>
                  {' '}
                  <button className='block w-full bg-sky-900 text-white rounded-md py-2 px-4 mb-2 hover:bg-blue-600'>
                    Profile
                  </button>
                </Link>
                <Link to={'/student/profileImage'}>
                  <button className='block w-full bg-sky-600 text-white rounded-md py-2 px-4 mb-2 hover:bg-blue-600'>
                    Photo
                  </button>
                </Link>
                <button className='block w-full bg-sky-600 text-white rounded-md py-2 px-4 mb-2 hover:bg-blue-600'>
                  My Courses
                </button>
                <button className='block w-full bg-sky-600 text-white rounded-md py-2 px-4 mb-2 hover:bg-blue-600'>
                  Certificates
                </button>
                <button className='block w-full bg-sky-600 text-white rounded-md py-2 px-4 hover:bg-blue-600'>
                  Logout
                </button>
              </div>
            </div>
          </div>

          <div className='w-3/4 p-5'>
            <div className='bg-sky-100 rounded-lg shadow-md p-4 item-center'>
              <div>
                <h2 className='text-xl font-bold mb-4 text-center'>
                  Profile Photo
                </h2>
                <div>
                <button
                    className='rounded bg-red-600 px-5 py-2 text-white'
                    onClick={handleDeletePhoto}
                  >
                    Delete Photo
                  </button>
                </div>
              </div>

              <div>
                <img
                  src={cloudinaryURL || userInfo?.photo || ProfileImage}
                  alt='Student Photo'
                  className='w-48 h-48 mx-auto mb-4 rounded-full'
                />
                <div>
                  <input
                    type='file'
                    accept='image/*'
                    onChange={handleSubmitChange}
                    className='mb-4'
                  />
                  <div>
                
                
                <div></div>
                  <button
                    className='rounded bg-sky-600 px-5 py-2 text-white'
                    onClick={handleUpdatePhoto}
                  >
                    Update Photo
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    </div>
  );
};

export default ProfilePhoto;
