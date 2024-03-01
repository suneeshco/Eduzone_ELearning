// App.tsx

import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from './Pages/Student/HomePage';
import LoginPage from './Pages/Student/LoginPage';
import SignUpPage from './Pages/Student/SignUp';

import InstructorHomePage from './Pages/Instructor/HomePage'
import InstructorLoginPage from './Pages/Instructor/LoginPage';
import InstructorSignUpPage from './Pages/Instructor/SignUpPage';

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
        <Route path='/student/login' element={<LoginPage/>}/>
        <Route path='/student/signup' element={<SignUpPage/>}/>


        {/* Tutor route */}

        <Route path='/instructor' element={<InstructorHomePage/>} />
        <Route path='/instructor/login' element={<InstructorLoginPage/>}/>
        <Route path='/instructor/signup' element={<InstructorSignUpPage/>}/>


        {/* Admin route */}

        <Route path='/admin' element={<AdminHomePage/>} />
        <Route path='/admin/login' element={<AdminLoginPage/>}/>
        <Route path='/admin/category' element={<CategoryPage/>}/>


      </Routes>
    </Router>
  );
};

export default App;
