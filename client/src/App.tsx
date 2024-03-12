// App.tsx

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


import InstructorHomePage from './Pages/Instructor/HomePage'
import InstructorLoginPage from './Pages/Instructor/LoginPage';
import InstructorSignUpPage from './Pages/Instructor/SignUpPage';
import InstructorAddCoursePage from './Pages/Instructor/AddCoursePage';
import InstructorMyCoursesPage from './Pages/Instructor/InstructorMyCoursesPage';
import InstructorCourseViewPage from './Pages/Instructor/CourseViewPage';
import InstructorEditCoursePage from './Pages/Instructor/EditCoursePage'

import AdminHomePage from './Pages/Admin/HomePage'
import AdminLoginPage from './Pages/Admin/LoginPage';
import CategoryPage from './Pages/Admin/CategoryPage';

import { Toaster } from "react-hot-toast";



const App: React.FC = () => {
  return (
    <Router>
      <Toaster position ='top-right'/>
      <Routes>
      

        {/* student route */}

        <Route path='/' element={<HomePage/>} />
        <Route path='' element={<StudentNotPrivateRoute/>}>
          <Route path='/student/login' element={<LoginPage/>}/>
          <Route path='/student/signup' element={<SignUpPage/>}/>
          <Route path='/student/forgotPassword' element={<ForgotPasswordPage/>}/>
          <Route path='/student/password-reset/:userId/:token' element={<PasswordResetPage/>}/>
        </Route>


        {/* Tutor route */}

        

        <Route path='' element={<NotPrivateRoute/>}>
          <Route path='/instructor/login' element={<InstructorLoginPage/>}/>
          <Route path='/instructor/signup' element={<InstructorSignUpPage/>}/>
        </Route>


        <Route path='' element={<PrivateRoute/>}>
          <Route path='/instructor' element={<InstructorHomePage/>} />
          <Route path='/instructor/addCourse' element={<InstructorAddCoursePage/>}/>
          <Route path='/instructor/myCourses' element={<InstructorMyCoursesPage/>}/>
          <Route path='/instructor/courseView/:id' element={<InstructorCourseViewPage/>}/>
          <Route path='/instructor/editCourse/:courseId' element={<InstructorEditCoursePage/>}/>
        </Route>


        {/* Admin route */}

        <Route path='' element={<AdminNotPrivateRoute/>}>
          <Route path='/admin/login' element={<AdminLoginPage/>}/>
        </Route>
        <Route path='' element={<AdminPrivateRoute/>}>
          <Route path='/admin' element={<AdminHomePage/>} />
          <Route path='/admin/category' element={<CategoryPage/>}/>
        </Route>


      </Routes>
    </Router>
  );
};

export default App;
