import Navbar from "../../Components/Admin/Header/Navbar";
import { AdminSidebar } from "../../Components/Admin/Sidebar/AdminSidebar";
import StudentList from "../../Components/Admin/Student/StudentList";


const StudentListPage = () => {
  
    return (
      <div>
        <Navbar/>
        <StudentList/>
        
      </div>
    )
  }
  
  export default StudentListPage