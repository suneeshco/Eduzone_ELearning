
import LoginImage from '../../../assets/images/Logos/Login.png';
import { adminLogin } from '../../../api/axiosPost'; 
import { useNavigate } from 'react-router-dom';
import { useFormik } from 'formik';
import { adminLoginSchema } from '../../../Schemas/adminValidation';
import { useDispatch } from 'react-redux';
import { setAdminCredentials } from '../../../Redux/Slices/AdminAuth';
import toast from 'react-hot-toast';
import { useState } from 'react';



const AdminLogin = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const [errorMessage, setErrorMessage] = useState('');
  

  const {values , errors , touched , handleBlur, handleChange , handleSubmit } = useFormik({
    initialValues : {
      email : "",
      password : ""
    },
    validationSchema : adminLoginSchema,
    onSubmit : async (values) => {
      console.log(values.email);
      try {
        const response:any = await adminLogin(values.email,values.password)
        console.log("asasas",response.data);
        
          if(response?.data?.admin){
            console.log(response.data.admin);
            dispatch(setAdminCredentials(response.data.admin))
            navigate("/admin") 
          }
        } catch (err) {
          toast.error("Invalid Login Credentials");
        }
        
      
      
      
      
    }
  })

  console.log(errors);
  

  return (
    <div className=" bg-gray-100 flex flex-col justify-center py-14 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-4xl sm:flex">
        <div className="sm:w-1/2">
          <img src={LoginImage} alt="Your Image" className="h-full w-full object-cover" />
        </div>
        <div className="sm:w-1/2 sm:ml-4 mt-4 sm:mt-0">
          <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
            <h2 className="text-center text-3xl font-extrabold text-gray-900 mb-6">Admin Login</h2>
            <form className="space-y-6" onSubmit={handleSubmit}>
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                Email address
              </label>
              <div className="mt-1">
                <input
                value={values.email}
                onChange={handleChange}
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  onBlur={handleBlur}
                  required
                  className={`appearance-none block w-full px-3 py-2 border rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm ${errors.email && touched.email ? 'border-red-500' : ''}`}
                />
              </div>
              {errors.email && touched.email && <p className='text-red-500'>{errors.email}</p>}
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                Password
              </label>
              <div className="mt-1">
                <input
                value={values.password}
                onChange={handleChange}
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  onBlur={handleBlur}
                  required
                  className="appearance-none block w-full px-3 py-2 border rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                />
              </div>
            </div>

            <div>
              <button
                type="submit"
                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Sign in
              </button>
            </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminLogin;
