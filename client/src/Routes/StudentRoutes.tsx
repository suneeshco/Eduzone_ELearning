// import React from 'react';
// import { Route, Routes } from 'react-router-dom';

// import HomePage from '../Pages/Student/HomePage';
// import LoginPage from '../Pages/Student/LoginPage';
// import SignUpPage from '../Pages/Student/SignUp';
// import ForgotPasswordPage from '../Pages/Student/ForgotPasswordPage';
// import PasswordResetPage from '../Pages/Student/PasswordResetPage';
// import StudentProfilePage from '../Pages/Student/StudentProfilePage';
// import StudentCourseListPAge from '../Pages/Student/CourseListingPage';
// import CheckoutSuccessPage from '../Pages/Student/CheckoutSuccessPage';
// import EnrolledCoursesPage from '../Pages/Student/EnrolledCoursesPage';
// import TutorListPage from '../Pages/Student/TutorListPage';
// import StudentOtpPage from '../Pages/Student/OtpPage';
// import StudentSingleCourseView from '../Pages/Student/ViewSingleCourse';
// import StudentPurchaseHistoryPage from '../Pages/Student/PurchaseHistoryPage'


// import { StudentPrivateRoute, StudentNotPrivateRoute } from '../Components/Student/PrivateRoute/PrivateRoute';

// const StudentRoutes: React.FC = () => {
//     return (
//       <Routes>
//         <Route path="/" element={<HomePage />} />
//         <Route path="/courses?s" element={<StudentCourseListPAge />} />
//         <Route path="/courseDetail/:id" element={<StudentSingleCourseView />} />
//         <Route path="/instructorsList" element={<TutorListPage />} />
        
//         <Route path="" element={<StudentPrivateRoute />}>
//           <Route path="/student/profile" element={<StudentProfilePage />} />
//           <Route path="/paymentSuccess" element={<CheckoutSuccessPage />} />
//           <Route path="/enrolledCourses" element={<EnrolledCoursesPage />} />
//           <Route path='/myPurchaseHistory'  element={<StudentPurchaseHistoryPage/>}/>
//         </Route>
        
//         <Route path="" element={<StudentNotPrivateRoute />}>
//           <Route path="/student/login" element={<LoginPage />} />
//           <Route path="/student/signup" element={<SignUpPage />} />
//           <Route path="/student/forgotPassword" element={<ForgotPasswordPage />} />
//           <Route path="/student/password-reset/:userId/:token" element={<PasswordResetPage />} />
//           <Route path="/student/otp" element={<StudentOtpPage />} />
//         </Route>
        
//       </Routes>
//     );
//   };
  
//   export default StudentRoutes;




import React from 'react';
import { Route, Routes } from 'react-router-dom';
import HomePage from '../Pages/Student/HomePage';
import LoginPage from '../Pages/Student/LoginPage';
import SignUpPage from '../Pages/Student/SignUp';
import ForgotPasswordPage from '../Pages/Student/ForgotPasswordPage';
import PasswordResetPage from '../Pages/Student/PasswordResetPage';
import StudentProfilePage from '../Pages/Student/StudentProfilePage';
import StudentCourseListPAge from '../Pages/Student/CourseListingPage';
import CheckoutSuccessPage from '../Pages/Student/CheckoutSuccessPage';
import EnrolledCoursesPage from '../Pages/Student/EnrolledCoursesPage';
import TutorListPage from '../Pages/Student/TutorListPage';
import StudentOtpPage from '../Pages/Student/OtpPage';
import StudentSingleCourseView from '../Pages/Student/ViewSingleCourse';
import StudentPurchaseHistoryPage from '../Pages/Student/PurchaseHistoryPage';
import InstructorVideoRoomPage from '../Pages/Instructor/VideoRoomPage'
import { StudentPrivateRoute, StudentNotPrivateRoute } from '../Components/Student/PrivateRoute/PrivateRoute';
import NotFound from '../Components/CommonComponents/PageNotFound/NotFound';

const StudentRoutes: React.FC = () => {
  return (
    <Routes>

      <Route path="/" element={<HomePage />} />
      <Route path="/room/:roomId" element={<InstructorVideoRoomPage />} />
      <Route path="/courses?s" element={<StudentCourseListPAge />} />
      <Route path="/courseDetail/:id" element={<StudentSingleCourseView />} />
      <Route path="/instructorsList" element={<TutorListPage />} />
      <Route path="" element={<StudentPrivateRoute />}>
        <Route path="/student/profile" element={<StudentProfilePage />} />
        <Route path="/paymentSuccess" element={<CheckoutSuccessPage />} />
        <Route path="/enrolledCourses" element={<EnrolledCoursesPage />} />
        <Route path="/myPurchaseHistory" element={<StudentPurchaseHistoryPage />} />
      </Route>
      <Route path="" element={<StudentNotPrivateRoute />}>
        <Route path="/student/login" element={<LoginPage />} />
        <Route path="/student/signup" element={<SignUpPage />} />
        <Route path="/student/forgotPassword" element={<ForgotPasswordPage />} />
        <Route path="/student/password-reset/:userId/:token" element={<PasswordResetPage />} />
        <Route path="/student/otp" element={<StudentOtpPage />} />
      </Route>
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default StudentRoutes;