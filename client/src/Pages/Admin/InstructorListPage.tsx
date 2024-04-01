import Navbar from "../../Components/Admin/Header/Navbar";
import InstructorList from "../../Components/Admin/Instructor/InstructorList";
import { AdminSidebar } from "../../Components/Admin/Sidebar/AdminSidebar";

const InstructorListPage = () => {
    return (
      <div>
        <Navbar/> 
        <InstructorList/>
      </div>
    )
  }
  
  export default InstructorListPage