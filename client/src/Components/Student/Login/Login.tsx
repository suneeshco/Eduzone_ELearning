
import { Link, useNavigate } from 'react-router-dom';
import LoginImage from '../../../assets/images/Logos/Login.png';
import { useFormik } from 'formik';
import { studentLoginSchema } from '../../../Schemas/studentLogin';
import { useDispatch } from 'react-redux';
import { setStudentCredentials } from '../../../Redux/Slices/StudentAuth';
import toast from 'react-hot-toast';
import { apiRequest } from '../../../api/axios';
import { GoogleLogin, GoogleOAuthProvider } from '@react-oauth/google';
import { useState } from 'react';
import Loader from '../Header/Loader/Loader';

const client_id = import.meta.env.VITE_CLIENT_ID || '';

interface LoginFormValues {
 email: string;
 password: string;
}

const Login: React.FC = () => {
 const navigate = useNavigate();
 const dispatch = useDispatch();
 const [loading, setLoading] = useState<boolean>(false);

 const { values, errors, touched, handleBlur, handleChange, handleSubmit } = useFormik<LoginFormValues>({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: studentLoginSchema,
    onSubmit : async (values) => {
      
      try {
        setLoading(true)
        const response = await apiRequest({
          method: 'post',
          url: '/login',
          data: {
              email: values.email,
              password: values.password,
              
          }
      });

      
      if(response?.user && response?.token){
        
        setTimeout(() => {
          setLoading(false)
          console.log("hello",response.user);
          if(response.user.role === 'student'){
          localStorage.setItem("studentToken", response.token);
          dispatch(setStudentCredentials(response.user))
          navigate('/')
          }else if(response.user.role === 'instructor'){
            localStorage.setItem("studentToken", response.token);
            dispatch(setStudentCredentials(response.user))
            navigate('/instructor')
          }else if(response.user.role === 'admin'){
            localStorage.setItem("studentToken", response.token);
            dispatch(setStudentCredentials(response.user))
            navigate('/admin')
          }
        }, 3000);
       
        
         
      }else if (response?.error) {
          setLoading(false)
          switch (response.error) {
            case 'User Blocked':
              toast.error("Your account has been blocked.");
              break;
            case 'User Not Exists':
              toast.error("User does not exist.");
              break;
            case 'Incorrect Password':
              toast.error("Incorrect password.");
              break;
            default:
              toast.error("An error occurred.");
          }
        
        
      }
      } catch (error) {
        setLoading(false)
        toast.error("Invalid Login Credentials");
      }
      
    }
  })

  console.log(errors);
  

  return (
    <div>
      {loading ? < Loader/>:(
        <GoogleOAuthProvider clientId={client_id}>
    <div className="  flex flex-col justify-center py-14 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-4xl sm:flex">
        <div className="sm:w-1/2">
          <img src={LoginImage} alt="Your Image" className=" w-full object-cover-full" />
        </div>
        <div className="sm:w-1/2 sm:ml-4 mt-4 sm:mt-0">
          <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10 shadow-xl border">
            <h2 className="text-center text-3xl font-extrabold text-gray-900 mb-6">Sign in to your account</h2>
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
                  className={`appearance-none block w-full px-3 py-2 border border-gray-700 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm ${errors.email && touched.email ? 'border-red-500' : ''}`}
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
                  className="appearance-none block w-full px-3 py-2 border border-gray-700 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                />
              </div>

              
              <div className='text-right'>
              <Link to={'/student/forgotPassword'}>
                <h3>Forgot Password</h3>
              </Link>
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
            <div className="mt-6">
              <Link to="/student/signup" className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-indigo-600 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                Sign up
              </Link>
            </div>
            <div id="signInButton" className="pl-20">
        <GoogleLogin
        type='standard'
        theme='filled_black'
        size='large'
        onSuccess={async (response) => {
          const respo = await apiRequest({
            method: 'post',
            url: '/google/login',
            data: response
        });
        if(respo?.user && respo?.token){
          console.log(respo.user);
          localStorage.setItem("studentToken", respo.token);
          dispatch(setStudentCredentials(respo.user))
          navigate("/") 
        }else if (respo?.error) {
          switch (respo.error) {
            case 'User Blocked':
              toast.error("Your account has been blocked.");
              break;
            case 'User Not Exists':
              toast.error("User does not exist.");
              break;
            case 'Incorrect Password':
              toast.error("Incorrect password.");
              break;
            default:
              toast.error("An error occurred.");
          }
        }
        }}
        />
    </div>
          </div>
        </div>
      </div>
    </div>
    </GoogleOAuthProvider>
      )}

    
    
    
    </div>
  );
};

export default Login;
