// import React from 'react';
// import { Route, Routes } from 'react-router-dom';

// import AdminHomePage from '../Pages/Admin/HomePage';
// import CategoryPage from '../Pages/Admin/CategoryPage';
// import StudentListPage from '../Pages/Admin/StudentListPage';
// import InstructorListPage from '../Pages/Admin/InstructorListPage';
// import CourseListPage from '../Pages/Admin/CourseListPage';
// import AdminCourseViewPage from '../Pages/Admin/CourseViewPage'

// import { AdminPrivateRoute , AdminNotPrivateRoute } from '../Components/Admin/PrivateRoute/PrivateRoute';

// const AdminRoutes: React.FC = () => {
//     return (
//       <>

//         <Route path='' element={<AdminPrivateRoute/>}>
//           <Route path='/admin' element={<AdminHomePage/>} />
//           <Route path='/admin/category' element={<CategoryPage/>}/>
//           <Route path='/admin/studentList' element={<StudentListPage/>}/>
//           <Route path='/admin/instructorList' element={<InstructorListPage/>}/>
//           <Route path='/admin/courseList' element={<CourseListPage/>}/>
//           <Route path='/admin/courseView/:id' element={<AdminCourseViewPage/>}/>
//         </Route>

//       </>
//     );
//   };
  
//   export default AdminRoutes;


import React from 'react';
import { Route, Routes } from 'react-router-dom';
import AdminHomePage from '../Pages/Admin/HomePage';
import CategoryPage from '../Pages/Admin/CategoryPage';
import StudentListPage from '../Pages/Admin/StudentListPage';
import InstructorListPage from '../Pages/Admin/InstructorListPage';
import CourseListPage from '../Pages/Admin/CourseListPage';
import AdminCourseViewPage from '../Pages/Admin/CourseViewPage';
import AdminNotificationPage from '../Pages/Admin/NotificationPage';
import { AdminPrivateRoute } from '../Components/Admin/PrivateRoute/PrivateRoute';
import NotFound from '../Components/CommonComponents/PageNotFound/NotFound';

const AdminRoutes: React.FC = () => {
  return (
    <Routes>
      <Route path="" element={<AdminPrivateRoute />}>
        <Route path="/" element={<AdminHomePage />} />
        <Route path="/category" element={<CategoryPage />} />
        <Route path="/studentList" element={<StudentListPage />} />
        <Route path="/instructorList" element={<InstructorListPage />} />
        <Route path="/courseList" element={<CourseListPage />} />
        <Route path="/courseView/:id" element={<AdminCourseViewPage />} />
        <Route path="/notifications" element={<AdminNotificationPage/>}/>
      </Route>
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default AdminRoutes;