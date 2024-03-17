import CourseList from "../../Components/Admin/Courses/CourseList";
import Navbar from "../../Components/Admin/Header/Navbar";
import { AdminSidebar } from "../../Components/Admin/Sidebar/AdminSidebar";

const CourseListPage = () => {
    return (
      <div>
        <Navbar/>
        <div className="flex bg-gray-100 min-h-screen">
        <AdminSidebar/>
        <CourseList/>
        </div>
      </div>
    )
  }
  
  export default CourseListPage