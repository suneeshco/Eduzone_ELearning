import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '../../../Redux/RootState/RootState'
import toast from 'react-hot-toast'
import Swal from 'sweetalert2'
import { setStudentCredentials } from '../../../Redux/Slices/StudentAuth'
import { instructorApiRequest } from '../../../api/axios'
import { useFormik } from 'formik'
import { changePasswordSchema } from '../../../Schemas/studentLogin'

const ChangePassword: React.FC = () => {
  const { userInfo } = useSelector((state: RootState) => state.studentAuth)
  const dispatch = useDispatch()
  const navigate = useNavigate()


  const { values, errors, touched, handleBlur, handleChange, handleSubmit } = useFormik({
    initialValues: {
      oldPassword: '',
      password: '',
      confirmPassword: '',
    },
    validationSchema: changePasswordSchema,
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
          method: 'patch',
          url: '/changePassword',
          data: {
            userId: userInfo?._id,
            oldPassword: values.oldPassword,
            password: values.password
            
          }
        });
        if (response?.message?.user) {
          console.log(response.user);
          dispatch(setStudentCredentials(response.message.user))
          toast.success("Successfully Updated")
          navigate("/instructor/profile");
        }
        if (response?.message?.error) {
            console.log(response.message.error);
            toast.error(response.message.error)
          }
      }


    },
  });

  

  return (


    <div className="bg-white mt-10 w-full pt-20 flex flex-col gap-5 px-3 md:px-16 lg:px-28 md:flex-row text-[#161931]">
      <aside className="py-4 md:w-1/3 lg:w-1/4 hidden md:block">
        <div className="sticky flex flex-col gap-2 p-4 text-sm border-r border-indigo-100 top-12">
          <h2 className="pl-3 mb-4 text-2xl font-semibold">Settings</h2>
          <Link to={'/instructor/profile'}><a href="#" className="flex items-center px-3 py-2.5 font-semibold hover:text-indigo-900 hover:border hover:rounded-full">
            Public Profile
          </a></Link>
          <Link to={'/instructor/myCourses'}><a href="#" className="flex items-center px-3 py-2.5 font-semibold hover:text-indigo-900 hover:border hover:rounded-full">
            My Courses
          </a></Link>
          <Link to={'/instructor/changePassword'}><a href="#" className="flex items-center px-3 py-2.5 font-bold bg-white text-indigo-900 border rounded-full">
            Change Password
          </a></Link>

        </div>
      </aside>
      <main className="w-full min-h-screen py-1 md:w-2/3 lg:w-3/4">
        <div className="p-2 md:p-4">
          <div className="w-full px-6 pb-8 mt-8 sm:max-w-xl sm:rounded-lg">
            <h2 className="pl-6 text-2xl font-bold sm:text-xl">Change Password</h2>
            <div className="grid max-w-2xl mx-auto mt-8">
              
              

              <div className="items-center mt-8 sm:mt-8 text-[#202142]">
                <form onSubmit={handleSubmit} className='space-y-4'>
                    <div className="mb-2 sm:mb-6">
                      <label htmlFor="oldPassword" className="block mb-2 text-sm font-medium text-indigo-900 dark:text-white">Old Password</label>
                      <input type="text" id="oldPassword" value={values.oldPassword}
                        onChange={handleChange}
                        onBlur={handleBlur} className="bg-indigo-50 border border-indigo-300 text-indigo-900 text-sm rounded-lg focus:ring-indigo-500 focus:border-indigo-500 block w-full p-2.5" placeholder="Old Password" />
                      {errors.oldPassword && touched.oldPassword && <p className='text-red-500'>{errors.oldPassword}</p>}
                    </div>
                    <div className="mb-2 sm:mb-6">
                      <label htmlFor="password" className="block mb-2 text-sm font-medium text-indigo-900 dark:text-white">New Password</label>
                      <input type="text" id="password" value={values.password}
                        onChange={handleChange}
                        onBlur={handleBlur} className="bg-indigo-50 border border-indigo-300 text-indigo-900 text-sm rounded-lg focus:ring-indigo-500 focus:border-indigo-500 block w-full p-2.5" placeholder="New Password" />
                      {errors.password && touched.password && <p className='text-red-500'>{errors.password}</p>}
                    </div>
                  <div className="mb-2 sm:mb-6">
                    <label htmlFor="confirmPassword" className="block mb-2 text-sm font-medium text-indigo-900 dark:text-white">Confirm Password</label>
                    <input type="text" id="confirmPassword" value={values.confirmPassword}
                      onChange={handleChange}
                      onBlur={handleBlur} className="bg-indigo-50 border border-indigo-300 text-indigo-900 text-sm rounded-lg focus:ring-indigo-500 focus:border-indigo-500 block w-full p-2.5" placeholder="Confirm Password" />
                    {errors.confirmPassword && touched.confirmPassword && <p className='text-red-500'>{errors.confirmPassword}</p>}
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

export default ChangePassword
