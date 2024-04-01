import CourseList from "../../Components/Admin/Courses/CourseList";
import Navbar from "../../Components/Admin/Header/Navbar";
import { AdminSidebar } from "../../Components/Admin/Sidebar/AdminSidebar";

const CourseListPage = () => {
    return (
      <div>
        <Navbar/>
       
        <CourseList/>
     
      </div>
    )
  }
  
  export default CourseListPage