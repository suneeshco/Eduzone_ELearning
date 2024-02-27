
import { Link } from 'react-router-dom';
import LoginImage from '../../../assets/images/Logos/Login.png'
import React,{ useState } from 'react';
import { studentLogin } from '../../../api/axiosPost'; 
import { useNavigate } from 'react-router-dom';


const Login = () => {
  const [email,setEmail] = useState("");
  const [password,setPassword] = useState("")

  const navigate = useNavigate()

  const handleSubmit = async (e :React.FormEvent<HTMLFormElement>)=>{
    e.preventDefault()
    const response:any = await studentLogin(email,password)
    if(response?.data?.token){
      console.log(response.data.token);
      navigate("/")
      
    }

  }
  return (
    <div className=" bg-gray-100 flex flex-col justify-center py-14 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-4xl sm:flex">
        {/* Picture */}
        <div className="sm:w-1/2">
          {/* Replace 'your-image.jpg' with your actual image URL */}
          <img src={LoginImage} alt="Your Image" className="h-full w-full object-cover" />
        </div>
        {/* Login Form */}
        <div className="sm:w-1/2 sm:ml-4 mt-4 sm:mt-0">
          <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
            <h2 className="text-center text-3xl font-extrabold text-gray-900 mb-6">Sign in to your account</h2>
            <form className="space-y-6" onSubmit={handleSubmit}>
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                Email address
              </label>
              <div className="mt-1">
                <input
                value={email}
                onChange={(e)=>{setEmail(e.target.value)}}
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  className="appearance-none block w-full px-3 py-2 border rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                />
              </div>
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                Password
              </label>
              <div className="mt-1">
                <input
                value={password}
                onChange={(e)=>{setPassword(e.target.value)}}
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
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
            {/* Signup button */}
            <div className="mt-6">
              <Link to="/student/signup" className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-indigo-600 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                Sign up
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
