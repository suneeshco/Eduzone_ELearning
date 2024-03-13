import Navbar from "../../Components/Admin/Header/Navbar";
import { AdminSidebar } from "../../Components/Admin/Sidebar/AdminSidebar";
import StudentList from "../../Components/Admin/Student/StudentList";

const StudentListPage = () => {
    return (
      <div>
        <Navbar/>
        <div className="flex bg-gray-100 min-h-screen">
        <AdminSidebar/>
        <StudentList/>
        </div>
      </div>
    )
  }
  
  export default StudentListPage