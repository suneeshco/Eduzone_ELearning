import Navbar from "../../Components/Admin/Header/Navbar";
import Notification from "../../Components/Admin/Notification/Notification";



import { AdminSidebar } from "../../Components/Admin/Sidebar/AdminSidebar";

const HomePage = () => {
  return (
    <div>
    <div className='fixed z-50 top-0 left-0 w-full'>
      <Navbar />
    </div>
    <div className="flex  flex-col md:flex-row  ">
      <div className="md:w-1/5 ">
        <AdminSidebar />
      </div>
        
      <div className="md:w-4/5 h-full  ">
      <Notification/>
      </div>
    </div>
  </div>
  )
}

export default HomePage
