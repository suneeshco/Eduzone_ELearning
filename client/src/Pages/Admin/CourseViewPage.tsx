import CourseList from "../../Components/Admin/Courses/CourseList";
import CourseView from "../../Components/Admin/Courses/CourseView";
import Navbar from "../../Components/Admin/Header/Navbar";
import { AdminSidebar } from "../../Components/Admin/Sidebar/AdminSidebar";

const CourseViewPage = () => {
    return (
      <div>
        <Navbar/>
        <div className="flex bg-gray-100 min-h-screen">
        <AdminSidebar/>
        <CourseView/>
        </div>
      </div>
    )
  }
  
  export default CourseViewPage