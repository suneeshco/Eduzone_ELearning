// import React from 'react';
// import { Route, Routes } from 'react-router-dom';

// import InstructorHomePage from '../Pages/Instructor/HomePage'
// import InstructorAddCoursePage from '../Pages/Instructor/AddCoursePage';
// import InstructorMyCoursesPage from '../Pages/Instructor/InstructorMyCoursesPage';
// import InstructorCourseViewPage from '../Pages/Instructor/CourseViewPage';
// import InstructorEditCoursePage from '../Pages/Instructor/EditCoursePage';
// import InstructorEditLessonPage from '../Pages/Instructor/EditLessonPage';
// import InstructorPurchaseHistoryPage from '../Pages/Instructor/PurchaseHistoryPage';
// import InstructorChatPage from '../Pages/Instructor/ChatPage';
// import InstructorProfilePage from '../Pages/Instructor/InstructorProfilePage';



// import {PrivateRoute , NotPrivateRoute} from '../Components/Instructor/PrivateRoute/PrivateRoute';



// const InstructorRoutes: React.FC = () => {
//     return (
//       <>
//         <Route path='' element={<PrivateRoute/>}>
//           <Route path='/instructor' element={<InstructorHomePage/>} />
//           <Route path='/instructor/addCourse' element={<InstructorAddCoursePage/>}/>
//           <Route path='/instructor/myCourses' element={<InstructorMyCoursesPage/>}/>
//           <Route path='/instructor/courseView/:id' element={<InstructorCourseViewPage/>}/>
//           <Route path='/instructor/editCourse/:courseId' element={<InstructorEditCoursePage/>}/>
//           <Route path='/instructor/profile' element={<InstructorProfilePage/>} />
//           {/* <Route path='/instructor/editProfile' element={<EditInstructorProfilePage/>} /> */}
//           <Route path='/instructor/editLesson/:lessonId' element={<InstructorEditLessonPage/>} />
//           {/* <Route path='/instructor/profileImage' element={<InstructorProfileImagePage/>} /> */}
//           <Route path='/instructor/purchaseHistory' element={<InstructorPurchaseHistoryPage/>} />
//           <Route path='/instructor/chat' element={<InstructorChatPage/>} />
//         </Route>
        
//       </>
//     );
//   };
  
//   export default InstructorRoutes;



import React from 'react';
import { Route, Routes } from 'react-router-dom';
import InstructorHomePage from '../Pages/Instructor/HomePage';
import InstructorAddCoursePage from '../Pages/Instructor/AddCoursePage';
import InstructorMyCoursesPage from '../Pages/Instructor/InstructorMyCoursesPage';
import InstructorCourseViewPage from '../Pages/Instructor/CourseViewPage';
import InstructorEditCoursePage from '../Pages/Instructor/EditCoursePage';
import InstructorEditLessonPage from '../Pages/Instructor/EditLessonPage';
import InstructorPurchaseHistoryPage from '../Pages/Instructor/PurchaseHistoryPage';
import InstructorChatPage from '../Pages/Instructor/ChatPage';
import InstructorProfilePage from '../Pages/Instructor/InstructorProfilePage';
import InstructorVideoCall from '../Pages/Instructor/VideoCallPage'
import { PrivateRoute } from '../Components/Instructor/PrivateRoute/PrivateRoute';
import NotFound from '../Components/CommonComponents/PageNotFound/NotFound';
import ChangePasswordInstructorPage from '../Pages/Instructor/ChangePasswordInstructorPage';

const InstructorRoutes: React.FC = () => {
  return (
    <Routes>
      <Route path="" element={<PrivateRoute />}>
        <Route path="/" element={<InstructorHomePage />} />
        <Route path="/addCourse" element={<InstructorAddCoursePage />} />
        <Route path="/myCourses" element={<InstructorMyCoursesPage />} />
        <Route path="/courseView/:id" element={<InstructorCourseViewPage />} />
        <Route path="/editCourse/:courseId" element={<InstructorEditCoursePage />} />
        <Route path="/profile" element={<InstructorProfilePage />} />
        <Route path="/changePassword" element={<ChangePasswordInstructorPage />} />
        <Route path="/editLesson/:lessonId" element={<InstructorEditLessonPage />} />
        <Route path="/purchaseHistory" element={<InstructorPurchaseHistoryPage />} />
        <Route path="/chat" element={<InstructorChatPage />} />
        <Route path="/videoCall" element={<InstructorVideoCall />} />
      </Route>
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default InstructorRoutes;