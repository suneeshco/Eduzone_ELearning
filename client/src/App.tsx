

import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import {PrivateRoute , NotPrivateRoute} from './Components/Instructor/PrivateRoute/PrivateRoute';
import { StudentPrivateRoute , StudentNotPrivateRoute } from './Components/Student/PrivateRoute/PrivateRoute';
import { AdminPrivateRoute , AdminNotPrivateRoute } from './Components/Admin/PrivateRoute/PrivateRoute';


import HomePage from './Pages/Student/HomePage';
import LoginPage from './Pages/Student/LoginPage';
import SignUpPage from './Pages/Student/SignUp';
import ForgotPasswordPage from './Pages/Student/ForgotPasswordPage';
import PasswordResetPage from './Pages/Student/PasswordResetPage';
import StudentProfilePage from './Pages/Student/StudentProfilePage';
import StudentEditProfilePage from './Pages/Student/studentEditProfilePage';
import StudentCourseListPAge from './Pages/Student/CourseListingPage'
import StudentProfileImagePage from './Pages/Student/ProfileImagePage';
import StudentOtpPage from './Pages/Student/OtpPage'
import StudentSingleCourseView from './Pages/Student/ViewSingleCourse';


import InstructorHomePage from './Pages/Instructor/HomePage'
import InstructorAddCoursePage from './Pages/Instructor/AddCoursePage';
import InstructorMyCoursesPage from './Pages/Instructor/InstructorMyCoursesPage';
import InstructorCourseViewPage from './Pages/Instructor/CourseViewPage';
import InstructorEditCoursePage from './Pages/Instructor/EditCoursePage';
import InstructorEditLessonPage from './Pages/Instructor/EditLessonPage'
import InstructorProfileImagePage from './Pages/Instructor/ProfilePhotoPage';


import AdminHomePage from './Pages/Admin/HomePage'
import CategoryPage from './Pages/Admin/CategoryPage';


import { Toaster } from "react-hot-toast";
import InstructorProfilePage from './Pages/Instructor/InstructorProfilePage';
import EditInstructorProfilePage from './Pages/Instructor/EditInstructorProfilePage';
import StudentListPage from './Pages/Admin/StudentListPage';
import InstructorListPage from './Pages/Admin/InstructorListPage';
import CourseListPage from './Pages/Admin/CourseListPage';
import AdminCourseViewPage from './Pages/Admin/CourseViewPage'
import NotFound from './Components/CommonComponents/PageNotFound/NotFound';



const App: React.FC = () => {
  return (
    <Router>
      <Toaster position ='top-right'/>
      <Routes>
      

        {/* student route */}
        <Route path='/' element={<HomePage/>} />
        <Route path='/courses?s' element={<StudentCourseListPAge/>} />
        <Route path='/courseDetail/:id' element={<StudentSingleCourseView/>} />
        
        <Route path='' element={<StudentPrivateRoute/>}>
          <Route path='/student/profile' element={<StudentProfilePage/>} />
          <Route path='/student/editProfile' element={<StudentEditProfilePage/>} />
          <Route path='/student/profileImage' element={<StudentProfileImagePage/>} />
          
        </Route>
        <Route path='' element={<StudentNotPrivateRoute/>}>
          <Route path='/student/login' element={<LoginPage/>}/>
          <Route path='/student/signup' element={<SignUpPage/>}/>
          <Route path='/student/forgotPassword' element={<ForgotPasswordPage/>}/>
          <Route path='/student/password-reset/:userId/:token' element={<PasswordResetPage/>}/>
          <Route path='/student/otp' element={<StudentOtpPage/>}/>
        </Route>


        {/* Tutor route */}

        
        <Route path='' element={<PrivateRoute/>}>
          <Route path='/instructor' element={<InstructorHomePage/>} />
          <Route path='/instructor/addCourse' element={<InstructorAddCoursePage/>}/>
          <Route path='/instructor/myCourses' element={<InstructorMyCoursesPage/>}/>
          <Route path='/instructor/courseView/:id' element={<InstructorCourseViewPage/>}/>
          <Route path='/instructor/editCourse/:courseId' element={<InstructorEditCoursePage/>}/>
          <Route path='/instructor/profile' element={<InstructorProfilePage/>} />
          <Route path='/instructor/editProfile' element={<EditInstructorProfilePage/>} />
          <Route path='/instructor/editLesson/:lessonId' element={<InstructorEditLessonPage/>} />
          <Route path='/instructor/profileImage' element={<InstructorProfileImagePage/>} />
        </Route>


        {/* Admin route */}

        <Route path='' element={<AdminPrivateRoute/>}>
          <Route path='/admin' element={<AdminHomePage/>} />
          <Route path='/admin/category' element={<CategoryPage/>}/>
          <Route path='/admin/studentList' element={<StudentListPage/>}/>
          <Route path='/admin/instructorList' element={<InstructorListPage/>}/>
          <Route path='/admin/courseList' element={<CourseListPage/>}/>
          <Route path='/admin/courseView/:id' element={<AdminCourseViewPage/>}/>
        </Route>


        <Route path='*' element={<NotFound/>}/>

      </Routes>
    </Router>
  );
};

export default App;
