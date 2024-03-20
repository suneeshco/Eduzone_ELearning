
import { useNavigate } from 'react-router-dom';
import { useFormik } from 'formik';
import { Link } from 'react-router-dom';
import LoginImage from '../../../assets/images/Logos/Login.png';
import { studentSignUpSchema } from '../../../Schemas/studentLogin';
import toast from 'react-hot-toast';
import { apiRequest, studentApiRequest } from '../../../api/axios';
import { GoogleOAuthProvider , GoogleLogin } from "@react-oauth/google";


const SignUp = () => {

  const client_id = import.meta.env.VITE_CLIENT_ID || '';

  const navigate = useNavigate()

  const { values, errors, touched, handleBlur, handleChange, handleSubmit } = useFormik({
    initialValues: {
       firstname: "",
       lastname: "",
       email: "",
       mobile: "",
       password: "",
       confirmPassword: ""
    },
    validationSchema: studentSignUpSchema,
    onSubmit: async (values) => {
      console.log(values.mobile);
      

       const response = await apiRequest({
        method: 'post',
        url: '/signup',
        data: {
            firstname: values.firstname,
            lastname: values.lastname,
            email: values.email,
            mobile: values.mobile,
            password: values.password,
            confirmPassword: values.confirmPassword
        }
    });
       console.log("res",response);
       
       if (response?.user) {
         console.log(response.user);
        toast.success("Successfully Registered")
         navigate("/student/login");
       } 
    }
   });

   console.log(errors);
   


  return (
    <>
    <GoogleOAuthProvider clientId={client_id}>
    <div className="  flex flex-col justify-center py-14 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-4xl sm:flex">
  
        <div className="sm:w-1/2">
          
          <img src={LoginImage} alt="Your Image" className=" w-full object-cover-full" />
        </div>
       
        <div className="sm:w-1/2 sm:ml-4 mt-4 sm:mt-0">
          <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
            <h2 className="text-center text-3xl font-extrabold text-gray-900 mb-6">Sign in to your account</h2>
            <form className="space-y-6" onSubmit={handleSubmit}>
           <div>
               <label htmlFor="firstname" className="block text-sm font-medium text-gray-700">
                 First Name
              </label>
              <div className="mt-1">
                <input
                  id="firstname"
                  name="firstname"
                  type="string"
                  value={values.firstname}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  required
                  className={`appearance-none block w-full px-3 py-2 border rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm ${errors.firstname && touched.firstname ? 'border-red-500' : ''}`}
                />
              </div>
              {errors.firstname && touched.firstname && <p className='text-red-500'>{errors.firstname}</p>}
            </div>

            <div>
               <label htmlFor="firstname" className="block text-sm font-medium text-gray-700">
                 Last Name
              </label>
              <div className="mt-1">
                <input
                  id="lastname"
                  name="lastname"
                  type="string"
                  value={values.lastname}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  required
                  className={`appearance-none block w-full px-3 py-2 border rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm ${errors.lastname && touched.lastname ? 'border-red-500' : ''}`}
                />
              </div>
              {errors.lastname && touched.lastname && <p className='text-red-500'>{errors.lastname}</p>}
            </div>

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
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                mobile
              </label>
              <div className="mt-1">
                <input
                value={values.mobile}
                onChange={handleChange}
                  id="mobile"
                  name="mobile"
                  type="string"
                  onBlur={handleBlur}
                  required
                  className={`appearance-none block w-full px-3 py-2 border rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm ${errors.mobile && touched.mobile ? 'border-red-500' : ''}`}
                />
              </div>
              {errors.mobile && touched.mobile && <p className='text-red-500'>{errors.mobile}</p>}
            </div>

           

            <div>
               <label htmlFor="firstname" className="block text-sm font-medium text-gray-700">
                 Password
              </label>
              <div className="mt-1">
                <input
                  id="password"
                  name="password"
                  type="string"
                  value={values.password}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  required
                  className={`appearance-none block w-full px-3 py-2 border rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm ${errors.password && touched.password ? 'border-red-500' : ''}`}
                />
              </div>
              {errors.password && touched.password && <p className='text-red-500'>{errors.password}</p>}
            </div>

            <div>
               <label htmlFor="firstname" className="block text-sm font-medium text-gray-700">
                 Confirm Password
              </label>
              <div className="mt-1">
                <input
                  id="confirmPassword"
                  name="confirmPassword"
                  type="string"
                  value={values.confirmPassword}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  required
                  className={`appearance-none block w-full px-3 py-2 border rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm ${errors.confirmPassword && touched.confirmPassword ? 'border-red-500' : ''}`}
                />
              </div>
              {errors.confirmPassword && touched.confirmPassword && <p className='text-red-500'>{errors.confirmPassword}</p>}
            </div>

            <div>
              <button
                type="submit"
                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Sign Up
              </button>
            </div>
          </form>
       
          <div className="mt-6">
            <Link to={'/student/login'}
              className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-indigo-600 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500" >
            
              Login</Link>
            
          </div>
           {/* //GOOGLE Authentication */}
      <div id="signUpButton" className="pl-20">
              <GoogleLogin
              type='standard'
              theme='filled_black'
              size='large'
              ux_mode="popup"
              onSuccess={async(response) => {
                const respo = await apiRequest({
                  method: 'post',
                  url: '/google/register',
                  data: response
              });
              
              console.log(respo);
              
              if (respo.message) {
                  toast.success(respo.message);
                  navigate('/student/login');
              }
                }}
                
              />
            </div>
          </div>
          
        </div>

        
      </div>
    </div>
    </GoogleOAuthProvider>
    </>
  );
};

export default SignUp;

