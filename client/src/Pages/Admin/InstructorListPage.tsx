import Navbar from "../../Components/Admin/Header/Navbar";
import InstructorList from "../../Components/Admin/Instructor/InstructorList";
import { AdminSidebar } from "../../Components/Admin/Sidebar/AdminSidebar";

const InstructorListPage = () => {
    return (
      <div>
        <Navbar/>
        <div className="flex bg-gray-100 min-h-screen">
        <AdminSidebar/>
        <InstructorList/>
        </div>
      </div>
    )
  }
  
  export default InstructorListPage