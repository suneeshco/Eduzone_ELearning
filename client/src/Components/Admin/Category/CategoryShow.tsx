
import { useState, useEffect } from 'react';
import { Category } from '../../../utils/apiTypes/ApiTypes';
import toast from 'react-hot-toast';
import Swal from 'sweetalert2';
import { apiRequest, adminApiRequest } from '../../../api/axios';
import {
 Card,
 CardHeader,
 Input,
 Typography,
 Button,
 CardBody,
 Chip,
 CardFooter,
 Tabs,
 TabsHeader,
 Tab,
 Avatar,
 IconButton,
 Tooltip,
 List,
 ListItem,
 ListItemPrefix,
} from "@material-tailwind/react";
import { PresentationChartBarIcon, ShoppingBagIcon, UserCircleIcon, PowerIcon } from '@heroicons/react/24/solid';
import { Link } from 'react-router-dom';

interface EditMode {
 active: boolean;
 id: string | null;
}

const CategoryPage: React.FC = () => {
 const TABLE_HEAD = ["Category Name", "Status", "Action", "Edit"];

 const [search, setSearch] = useState<string>('');
 const [categories, setCategories] = useState<Category[]>([]);
 const [newCategory, setNewCategory] = useState<string>('');
 const [editMode, setEditMode] = useState<EditMode>({ active: false, id: null });
 const [currentPage, setCurrentPage] = useState<number>(1);
 const [itemsPerPage] = useState<number>(10);

 const indexOfLastItem = currentPage * itemsPerPage;
 const indexOfFirstItem = indexOfLastItem - itemsPerPage;
 const currentItems = categories.slice(indexOfFirstItem, indexOfLastItem);
 const paginate = (pageNumber: number) => setCurrentPage(pageNumber);
 const pageNumbers = [];
 for (let i = 1; i <= Math.ceil(categories.length / itemsPerPage); i++) {
    pageNumbers.push(i);
 }



  //Functions

  const fetchCategories = async () => {
    const response = await adminApiRequest({
      method: 'get',
      url: '/categories',
      params:{search:search}
    });
    setCategories(response);
  };




  const addCategories = async () => {
    if(newCategory.trim().length<1){
      return toast.error("field should not be empty")
    }
    const response = await adminApiRequest({
      method: 'post',
      url: '/addCategory',
      data: { categoryName: newCategory },
    });
    console.log("HI",response);
    
    if(response?._id){
      toast.success("Category Added")
      setCategories([...categories, response]);
      setNewCategory('');
    }else{
      toast.error("Category Already Exists")
    }
    
    
 };



 const updateCategory = async () => {
  if(newCategory.trim().length<1){
    return toast.error("field should not be empty")
  }
   const response = await adminApiRequest({
      method: 'patch',
      url: '/updateCategory',
      data: { value : newCategory, id : editMode.id },
    });
    if(response._id){
      toast.success("Category Updated")
      setNewCategory('');
      setEditMode({active: false, id: null})
    }else{
      toast.error("Category Exists")
    }

};





const toggleStatus = async (id:string) => {
  const confirmation = await Swal.fire({
    title: 'Are you sure?',
    text: 'You are about to change the status of this category!',
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    confirmButtonText: 'Yes, change status!'
  });
  if (confirmation.isConfirmed) {
    await adminApiRequest({
      method: 'patch',
      url: '/deleteCategory',
      data: { id },
    });
    Swal.fire(
      'Changed!',
      'Category status has been updated.',
      'success'
    );
  } 
};




  useEffect(() => {

    fetchCategories();

 }, [categories]);




 return (
  <div className="flex flex-col md:flex-row bg-gray-100 min-h-screen">
  <Card className="h-auto md:h-screen md:max-h-[calc(100vh-2rem)] md:w-[16rem] p-4 shadow-xl shadow-blue-gray-900/5"  placeholder={undefined}>
    <List  placeholder={undefined}>
      <Link to={'/admin'}>
        <ListItem className='text-black'  placeholder={undefined}>
          <ListItemPrefix  placeholder={undefined}>
            <PresentationChartBarIcon className="h-5 w-5" />
          </ListItemPrefix>
          Dashboard
        </ListItem>
      </Link>
      <Link to={'/admin/category'}>
        <ListItem className='text-black'  placeholder={undefined}>
          <ListItemPrefix  placeholder={undefined}>
            <ShoppingBagIcon className="h-5 w-5" />
          </ListItemPrefix>
          Categories
        </ListItem>
      </Link>
      <Link to={'/admin/studentList'}>
        <ListItem className='text-black'  placeholder={undefined}>
          <ListItemPrefix  placeholder={undefined}>
            <UserCircleIcon className="h-5 w-5" />
          </ListItemPrefix>
          Student List
        </ListItem>
      </Link>
      <Link to={'/admin/instructorList'}>
        <ListItem className='text-black'  placeholder={undefined}>
          <ListItemPrefix  placeholder={undefined}>
            <UserCircleIcon className="h-5 w-5" />
          </ListItemPrefix>
          Instructor List
        </ListItem>
      </Link>
      <Link to={'/admin/courseList'}>
        <ListItem className='text-black'  placeholder={undefined}>
          <ListItemPrefix  placeholder={undefined}>
            <ShoppingBagIcon className="h-5 w-5" />
          </ListItemPrefix>
          Course List
        </ListItem>
      </Link>
    </List>
  </Card>

  
  <div className="flex-1">
    <div className="w-full p-5 sm:p-10 space-y-5 sm:space-y-10 bg-gray-100 rounded shadow">
     <Card className="h-full w-full m-3 px-5 sm:px-10 py-5 sm:py-10" placeholder={undefined} >
        <h2 className="text-2xl font-bold">{editMode.active ? "Update" : "Add New Category"}</h2>
        <div className="bg-white shadow rounded-lg p-2 w-full sm:w-1/2">
          <div className="flex justify-between items-center">
            <input
              type="text"
              value={newCategory}
              placeholder={editMode.active ? "Update" : "Add New Category"}
              className="border p-2 rounded w-full"
              onChange={(e) => setNewCategory(e.target.value)}
            />
            {editMode.active ? (
              <button onClick={updateCategory} className="bg-blue-500 text-white p-1 rounded w-1/4 h-10">Update</button>
            ) : (
              <button onClick={addCategories} className="bg-blue-500 text-white p-1 rounded w-1/4 h-10">Add Category</button>
            )}
            {editMode.active ? (
              <button onClick={() => { setEditMode({ active: false, id: null }); setNewCategory("") }} className='bg-orange-500 text-white p-1 rounded w-1/4 h-10'>Cancel</button>
            ) : ("")}
          </div>
        </div>
        <CardHeader floated={false} shadow={false} className="rounded-none" placeholder={undefined} >
          <div className="mb-8 flex flex-col sm:flex-row items-center justify-between gap-8">
            <div>
              <Typography variant="h5" color="blue-gray" className='font-bold' placeholder={undefined} >
                Category list
              </Typography>
              <Typography color="gray" className="mt-1 font-normal" placeholder={undefined} >
                See information about categories
              </Typography>
            </div>
            <div className="w-full sm:w-72">
              <Input  placeholder='Search...' className='border border-black' value={search} onChange={(e)=>{setSearch(e.target.value)}}  crossOrigin={undefined} /> 
            </div>
          </div>
        </CardHeader>
        <CardBody className="overflow-scroll px-0" placeholder={undefined} >
          <table className="mt-4 w-full min-w-max table-auto text-left">
            <thead>
              <tr>
                {TABLE_HEAD.map((head) => (
                  <th key={head} className="border-y border-blue-gray-100 bg-blue-gray-50/50 p-4">
                    <Typography variant="small" color="blue-gray" className="font-normal leading-none opacity-70" placeholder={undefined} >
                      {head}
                    </Typography>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {currentItems.map((category) => (
                <tr key={category._id}>
                  <td className='p-4'>
                    <div className="flex items-center gap-3">
                      <div className="flex flex-col">
                        <Typography variant="small" color="blue-gray" className="font-normal" placeholder={undefined} >
                          {category.categoryName}
                        </Typography>
                      </div>
                    </div>
                  </td>
                  <td className='p-4'>
                    <div className="w-max">
                      <Chip
                        variant="ghost"
                        size="sm"
                        value={category.status ? "Active" : "Inactive"}
                        color={category.status ? "green" : "blue-gray"}
                      />
                    </div>
                  </td>
                  <td className='p-4'>
                    <Tooltip content="">
                      <button onClick={() => toggleStatus(category._id)} className="bg-green-500 text-white p-1 rounded mr-2 hover:bg-green-600">
                        {category.status ? 'Disable' : 'Enable'}
                      </button>
                    </Tooltip>
                  </td>
                  <td className='p-4'>
                    <Tooltip content="Edit User">
                      <button className="bg-green-500 text-white p-2 rounded mr-2 hover:bg-green-600" onClick={() => { setEditMode({ active: true, id: category._id }) }}>
                        Edit
                      </button>
                    </Tooltip>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </CardBody>
        <CardFooter className="flex items-center justify-between border-t border-blue-gray-50 p-4" placeholder={undefined} >
          <div>
            {pageNumbers.map((number) => (
              <button key={number} onClick={() => paginate(number)} className="rounded-md bg-green-400 text-white m-1 px-4 py-2 hover:bg-green-600">
                {number}
              </button>
            ))}
          </div>
        </CardFooter>
      </Card>
    </div>
  </div>
  
</div>

  
 );
};

export default CategoryPage;




