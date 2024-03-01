import Navbar from "../../Components/Admin/Header/Navbar";



import HomeComponent from "../../Components/Admin/HomePage/HomePage";
import { AdminSidebar } from "../../Components/Admin/Sidebar/AdminSidebar";

const HomePage = () => {
  return (
    <div>
      <Navbar/>
      <div className="flex bg-gray-100 min-h-screen">
      <AdminSidebar/>
      <HomeComponent/>
      </div>
    </div>
  )
}

export default HomePage
