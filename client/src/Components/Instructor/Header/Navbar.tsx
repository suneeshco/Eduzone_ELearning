import React, { useEffect , useState } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch , useSelector } from 'react-redux';
import { RootState } from '../../../Redux/RootState/RootState';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import ProfilePhoto from '../../../assets/images/DefaultImages/Profile.png'
import {  studentApiRequest } from '../../../api/axios';
import { studentLogout } from '../../../Redux/Slices/StudentAuth';

const Navbar: React.FC = () => {

  const navigate = useNavigate();
  const dispatch = useDispatch();

  // const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  // const toggleDropdown = () => {
  //   setIsDropdownOpen(!isDropdownOpen);
  // };

  let {userInfo} = useSelector((state:RootState)=>state.studentAuth)

  
  useEffect(() => {
    const checkUserStatus = async () => {
      if (userInfo) {
        const response = await studentApiRequest({
          method: 'get',
          url: `/getStudentDetails/${userInfo._id}`,
        });

        if (!response.status) {
          toast.error('Your Account Has Been Blocked');
          dispatch(studentLogout({}))
          userInfo = null
          navigate('/student/login')
        }
      }
    };

    checkUserStatus();
  }, [userInfo,studentLogout]);

  const handleLogout = () => {
    dispatch(studentLogout({}));
    toast.success('Logged Out Successfully')
    navigate("/student/login")
  };

  return (
    <>
    <nav className="fixed top-0 w-full shadow-2xl  border-b " style={{backgroundColor:'#008080'}}>
      <div className="max-w-7.5xl mx-auto px-2 py-2 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-10">
          <div className="flex-shrink-0">
            <Link to="/instructor" className="flex items-center">
              <h1 className='text-white text-2xl font-bold'>EDUZONE</h1>
            </Link>
          </div>

          <div className="hidden md:flex md:items-center space-x-16">
            {userInfo && (
              <>
                <Link to="/instructor" className="text-white hover:bg-teal-800 px-3 py-2 rounded-md font-bold">Dashboard</Link>
                <Link to="/instructor/myCourses" className="text-white hover:bg-teal-800 px-3 py-2 rounded-md font-bold">My Courses</Link>
                <Link to="/instructor/addCourse" className="text-white hover:bg-teal-800 px-3 py-2 rounded-md font-bold">Add Course</Link>
              </>
            )}

            {userInfo && (
              <div>
                <Link to="/instructor/profile"><img src={userInfo.photo ?userInfo.photo: ProfilePhoto} alt="Profile" className="h-8 w-8 rounded-full" /></Link>
              </div>
            )}

            {userInfo && (
              <div>
                <button onClick={handleLogout} className="text-black-300 bg-red-300 hover:bg-gray-700 px-3 py-2 rounded-md font-medium">Logout</button>
              </div>
            )}
          </div>

          <div className="md:hidden">
            <button onClick={toggleMobileMenu} className="text-gray-300 hover:bg-gray-700 px-3 py-2 rounded-md text-sm font-medium focus:outline-none focus:ring">
              <svg className="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                {isMobileMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7" />
                )}
              </svg>
            </button>
          </div>
        </div>

        {isMobileMenuOpen && (
          <div className="md:hidden">
            <div className="flex flex-col items-center space-y-2 mt-2">
              {userInfo && (
                <>
                  <Link to="/instructor" className="text-black hover:bg-gray-700 px-3 py-2 rounded-md font-bold">Dashboard</Link>
                  <Link to="/instructor/myCourses" className="text-black hover:bg-gray-700 px-3 py-2 rounded-md font-bold">My Courses</Link>
                  <Link to="/instructor/addCourse" className="text-black hover:bg-gray-700 px-3 py-2 rounded-md font-bold">Add Course</Link>
                  <br />
          {userInfo?.role === 'instructor' && (
          <div>
            <Link to="/instructor/profile" className="block px-3 py-2 rounded-md text-base font-medium text-white bg-gray-900">Profile</Link>
          </div>
        )}
          {userInfo && (
              <div>
                <button onClick={handleLogout} className="text-black-300 bg-red-300 hover:bg-gray-700 px-3 py-2 rounded-md font-medium">Logout</button>
              </div>
            )}
                </>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>




{/* <nav className="bg-slate-600 border-gray-200 dark:bg-gray-900">
  <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
  <a href="https://flowbite.com/" className="flex items-center space-x-3 rtl:space-x-reverse">
      
      <span className="self-center text-2xl text-white font-semibold whitespace-nowrap dark:text-white">EDUZONE</span>
  </a>
  <div className="flex items-center md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse">
  <div className="hidden sm:flex items-center space-x-4">
          {userInfo && (
            <div>
              <Link to="/instructor/profile"><img src={ProfilePhoto} alt="Profile" className="h-8 w-8 rounded-full" /> </Link>
            </div>
          )}
          <div>
            {userInfo ? (
              <button onClick={handleLogout} className="text-black-300 bg-red-300 hover:bg-gray-700 px-3 py-2 rounded-md font-medium">Logout</button>
            ) : (
              ""
            )}
          </div>
        </div>
     
      
      <button data-collapse-toggle="navbar-user" type="button" className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600" aria-controls="navbar-user" aria-expanded="false">
        <span className="sr-only">Open main menu</span>
        <svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 17 14">
            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 1h15M1 7h15M1 13h15"/>
        </svg>
    </button>
  </div>
  
  </div>
</nav> */}

  </>
  );
};

export default Navbar;
