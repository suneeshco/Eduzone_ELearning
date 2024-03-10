
import Navbar from "../../Components/Admin/Header/Navbar";
import { AdminSidebar } from "../../Components/Admin/Sidebar/AdminSidebar";
import CategoryPages from "../../Components/Admin/Category/CategoryShow";

const CategoryPage = () => {
    return (
      <div>
        <Navbar/>
        <div className="flex bg-gray-100 min-h-screen">
        <AdminSidebar/>
        <CategoryPages/>
        </div>
      </div>
    )
  }
  
  export default CategoryPage
