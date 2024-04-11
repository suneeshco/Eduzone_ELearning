import Navbar from "../../Components/Admin/Header/Navbar";
import { AdminSidebar } from "../../Components/Admin/Sidebar/AdminSidebar";
import StudentList from "../../Components/Admin/Student/StudentList";


const StudentListPage = () => {
  
    return (
      <div>
      <div className='fixed z-50 top-0 left-0 w-full'>
        <Navbar />
      </div>
      <div className="flex flex-col md:flex-row bg-gray-100 ">
        <div className="md:w-1/5">
          <AdminSidebar />
        </div>

        <div className="md:w-4/5 h-full ">
          <StudentList />
        </div>
      </div>
    </div>
    )
  }
  
  export default StudentListPage