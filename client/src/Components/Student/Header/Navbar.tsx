import React, { useEffect, useState } from 'react';
import { Link, useNavigate, useLocation} from 'react-router-dom';
import LogoImage from '../../../assets/images/Logos/Eduzone_logo1.png';
import ProfileImage from '../../../assets/images/DefaultImages/Profile.png';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../../Redux/RootState/RootState';
import { studentLogout } from '../../../Redux/Slices/StudentAuth';
import toast from 'react-hot-toast';
import { studentApiRequest } from '../../../api/axios';

const Navbar: React.FC = () => {
 const navigate = useNavigate();
 const location = useLocation();
 let { userInfo } = useSelector((state: RootState) => state.studentAuth);
 const [isBlocked, setIsBlocked] = useState(false);
 const [searchQuery, setSearchQuery] = useState("");
 const [isMenuOpen, setIsMenuOpen] = useState(false); 
 const dispatch = useDispatch();

 const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
 };

 const submitSearch = () => {
    navigate(`/courses?s=${searchQuery}`);
 };

 useEffect(() => {
    const checkUserStatus = async () => {
      if (userInfo) {
        const response = await studentApiRequest({
          method: 'get',
          url: `/getStudentDetails/${userInfo._id}`,
        });

        if (!response.status) {
          toast.error('Your Account Has Been Blocked');
          dispatch(studentLogout({}));
          userInfo = null;
        }
      }
    };

    const searchParams = new URLSearchParams(location.search);
    const searchQueryParam = searchParams.get("s");

    if (searchQueryParam) {
      setSearchQuery(searchQueryParam);
    }

    checkUserStatus();
 }, [userInfo, studentLogout]);

 const handleLogout = () => {
    dispatch(studentLogout({}));
    toast.success('Logged Out Successfully');
    navigate("/student/login");
 };


 const clearSearch = () => {
  navigate(location.pathname, { replace: true });
  setSearchQuery("");
};

 return (
    <>
    <nav className="fixed top-0 z-50  shadow-md bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500  w-full">
  <div className="max-w-7.5xl mx-auto px-2 py-2 sm:px-6 lg:px-8">
    <div className="flex items-center justify-between h-16">
      <div className="flex-shrink-0">
        <Link to="/" className="flex items-center">
          <h1 className='text-white text-xl font-bold'>EDUZONE</h1>
        </Link>
      </div>
      <div className="hidden sm:block">
        <div className="flex space-x-16">
          <Link to="/" className="text-black hover:bg-violet-600 hover:text-slate-50 px-5 py-2 rounded-md font-bold">Home</Link>
          <Link to="/courses" className="text-black hover:bg-violet-600 hover:text-slate-50 px-5 py-2 rounded-md font-bold">Courses</Link>
          <Link to="" className="text-black hover:bg-violet-600 hover:text-slate-50 px-5 py-2 rounded-md font-bold">Tutors</Link>
          <Link to="" className="text-black hover:bg-violet-600 hover:text-slate-50 px-5 py-2 rounded-md font-bold">About</Link>
        </div>
      </div>
            

      <div className="flex w-100 relative">
  <input
    type="text"
    placeholder="What do you want to learn..."
    value={searchQuery}
    onChange={(e) => setSearchQuery(e.target.value)}
    className="flex-grow px-4 py-2 border-l border-t border-b border-gray-800  focus:outline-none focus:border-blue-400"
  />
  {searchQuery && (
   <button className=" bg-white  text-black hover:text-black px-3 py-2 border-t border-e border-b border-blue-400   focus:outline-none" onClick={clearSearch}>
   &times;
 </button>
    
  )}
  <button className="ml-2 bg-slate-900 hover:bg-slate-200 text-white hover:text-black px-3 py-2 rounded-md" onClick={submitSearch}>
    Search 
  </button>
</div>


      <div className="hidden md:flex items-center space-x-2">
        {userInfo?.role === 'student' && (
          <div>
            <Link to="/student/profile"><img src={userInfo?.photo || ProfileImage} alt="Profile" className="h-8 w-8 rounded-full " /></Link>
          </div>
        )}
        <div>
          {userInfo?.role === 'student' ? (
            <button onClick={handleLogout} className="text-black-300 bg-red-300 hover:bg-gray-700 px-3 py-2 rounded-md font-medium">Logout</button>
          ) : (
            <Link to="/student/login" className="text-black-300 bg-green-300 hover:bg-green-500 px-3 py-2 rounded-md font-medium">Login</Link>
          )}
        </div>
      </div>

      <div className="flex md:hidden">
        <button onClick={toggleMenu} className="text-gray-300 hover:bg-gray-700 px-3 py-2 rounded-md text-sm font-medium focus:outline-none focus:ring">
          <svg className="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7" />
          </svg>
        </button>
        
        
      </div>

    </div>
    {isMenuOpen && (
      <div className="sm:hidden">
        <div className="px-2 pt-2 pb-3 space-y-1">
          <Link to="/" className="block px-3 py-2 rounded-md text-base font-medium text-white bg-gray-900">Home</Link>
          <Link to="/courses" className="block px-3 py-2 rounded-md text-base font-medium text-white bg-gray-900">Courses</Link>
          <Link to="" className="block px-3 py-2 rounded-md text-base font-medium text-white bg-gray-900">Tutors</Link>
          <Link to="" className="block px-3 py-2 rounded-md text-base font-medium text-white bg-gray-900">About</Link>
          <br />
          {userInfo?.role === 'student' && (
          <div>
            <Link to="/student/profile" className="block px-3 py-2 rounded-md text-base font-medium text-white bg-gray-900">Profile</Link>
          </div>
        )}
          {userInfo?.role === 'student' ? (
            <button onClick={handleLogout} className="text-black-300 bg-red-300 hover:bg-gray-700 px-3 py-2 rounded-md font-medium">Logout</button>
          ) : (
            <Link to="/student/login" className="text-black-300 bg-green-300 hover:bg-gray-700 px-3 py-2 rounded-md font-medium">Login</Link>
          )}
        </div>
      </div>
    )}
  </div>
</nav>

      
    </>
 );
};

export default Navbar;


{/* <nav className="shadow-md bg-slate-700">
        <div className="max-w-7.5xl mx-auto px-2 py-2 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex-shrink-0">
              <Link to="/" className="flex items-center">
                <h1 className='text-white text-xl font-bold'>EDUZONE</h1>
              </Link>
            </div>
            <div className="hidden sm:block">
              <div className="flex space-x-16">
                <Link to="/" className="text-white hover:bg-violet-600 hover:text-slate-50 px-5 py-2 rounded-md font-bold">Home</Link>
                <Link to="/courses" className="text-white hover:bg-gray-700 px-5 py-2 rounded-md font-bold">Courses</Link>
                <Link to="" className="text-white hover:bg-gray-700 px-5 py-2 rounded-md font-bold">Tutors</Link>
                <Link to="" className="text-white hover:bg-gray-700 px-5 py-2 rounded-md font-bold">About</Link>
              </div>
            </div>
            

            <div className="flex w-100">
  <input
    type="text"
    placeholder="What do you want to learn..."
    value={searchQuery}
    onChange={(e) => setSearchQuery(e.target.value)}
    className="flex-grow px-4 py-2 border border-gray-800 rounded-md focus:outline-none focus:border-blue-400"
  />
  <button className="ml-2 bg-slate-900 hover:bg-slate-200 text-white hover:text-black px-3 py-2 rounded-md" onClick={submitSearch}>
   Search 
  </button>
</div>

            <div className="hidden sm:flex items-center space-x-4">
              {userInfo && (
                <div>
                 <Link to="/student/profile"><img src={userInfo?.photo || ProfileImage} alt="Profile" className="h-8 w-8 rounded-full" /></Link>
                </div>
              )}
              <div>
                {userInfo ? (
                 <button onClick={handleLogout} className="text-black-300 bg-red-300 hover:bg-gray-700 px-3 py-2 rounded-md font-medium">Logout</button>
                ) : (
                 <Link to="/student/login" className="text-black-300 bg-green-300 hover:bg-gray-700 px-3 py-2 rounded-md font-medium">Login</Link>
                )}
              </div>
            </div>
            <div className="flex md:hidden">
              <button onClick={toggleMenu} className="text-gray-300 hover:bg-gray-700 px-3 py-2 rounded-md text-sm font-medium focus:outline-none focus:ring">
                <svg className="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7" />
                </svg>
              </button>
            </div>
          </div>
          {isMenuOpen && (
            <div className="sm:hidden">
              <div className="px-2 pt-2 pb-3 space-y-1">
                <Link to="/" className="block px-3 py-2 rounded-md text-base font-medium text-white bg-gray-900">Home</Link>
                <Link to="/courses" className="block px-3 py-2 rounded-md text-base font-medium text-white bg-gray-900">Courses</Link>
                <Link to="" className="block px-3 py-2 rounded-md text-base font-medium text-white bg-gray-900">Tutors</Link>
                <Link to="" className="block px-3 py-2 rounded-md text-base font-medium text-white bg-gray-900">About</Link>
              </div>
            </div>
          )}
        </div>
      </nav> */}












//     <>
     
//      <nav className="pt-4 px-10 ">
//   <div className="mx-auto px-4 py-2 my-5 sm:px-6 lg:px-8 rounded-full bg-slate-700">
//     <div className="flex items-center justify-between h-12">
//       <div className="flex-shrink-0">
//         <Link to="/" className="flex items-center">
//           <h1 className="text-lg text-white font-bold">EDUZONE</h1>
//         </Link>
//       </div>
//       <div className="hidden sm:block">
//         <div className="flex space-x-10">
//           <Link to="/" className="text-gray-400 hover:bg-violet-600 hover:text-slate-50 px-3 py-1 rounded-md font-bold">Home</Link>
//           <Link to="/courses" className="text-gray-400 hover:bg-gray-700 px-3 py-1 rounded-md font-bold">Courses</Link>
//           <Link to="" className="text-gray-400 hover:bg-gray-700 px-3 py-1 rounded-md font-bold">Tutors</Link>
//           <Link to="" className="text-gray-400 hover:bg-gray-700 px-3 py-1 rounded-md font-bold">About</Link>
//         </div>
//       </div>
//       <div className="flex items-center">
//         <input
//           type="text"
//           placeholder="Search..."
//           value={searchQuery}
//           onChange={(e) => setSearchQuery(e.target.value)}
//           className="w-full px-3 py-1 border border-gray-300 rounded-md focus:outline-none focus:border-blue-400 text-sm"
//         />
//         <button className="ml-2 bg-violet-400 hover:bg-violet-600 px-2 py-1 rounded-md" onClick={submitSearch}>
//           <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="h-5 w-5 text-gray-600">
//             <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a4 4 0 11-8 0 4 4 0 018 0z" />
//             <path strokeLinecap="round" strokeLinejoin="round" d="M17.5 17.5l4.5 4.5" />
//           </svg>
//         </button>
//       </div>

//       <div className="hidden sm:flex items-center space-x-4">
//         {userInfo && (
//           <div>
//             <Link to="/student/profile"><img src={userInfo?.photo || ProfileImage} alt="Profile" className="h-6 w-6 rounded-full" /></Link>
//           </div>
//         )}
//         <div>
//           {userInfo ? (
//             <button onClick={handleLogout} className="text-black-300 bg-red-300 hover:bg-gray-700 px-2 py-1 rounded-md font-medium text-sm">Logout</button>
//           ) : (
//             <Link to="/student/login" className="text-black-300 bg-green-300 hover:bg-gray-700 px-2 py-1 rounded-md font-medium text-sm">Login</Link>
//           )}
//         </div>
//       </div>

//       <div className="flex md:hidden">
//         <button className="text-gray-300 hover:bg-gray-700 px-2 py-1 rounded-md text-sm font-medium focus:outline-none focus:ring">
//           <svg className="h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7" />
//           </svg>
//         </button>
//       </div>
//     </div>
//   </div>
// </nav>




//     </>
