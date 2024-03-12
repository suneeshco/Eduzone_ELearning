




import React,{useState,useEffect} from 'react';
import { getCategories } from '../../../api/axiosGet';
import { Category } from '../../../utils/apiTypes/ApiTypes';
import { addCategory } from '../../../api/axiosPost';
import { deleteCategories , updateCategories } from '../../../api/axiosPatch';
import toast from 'react-hot-toast';
import Swal from 'sweetalert2';


const CategoryPage = () => {

  const [categories, setCategories] = useState<Category[]>([]);
  const [newCategory, setNewCategory] = useState('');
  const [editMode, setEditMode] = useState<{ active: boolean; id: string | null }>({ active: false, id: null });
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = categories.slice(indexOfFirstItem, indexOfLastItem);

  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(categories.length / itemsPerPage); i++) {
    pageNumbers.push(i);
  }

  useEffect(() => {
    const fetchCategories = async () => {
      const response = await getCategories();
      setCategories(response.data);
    };

    fetchCategories();
 }, [categories]);


  const addCategories = async () => {
    if(newCategory.trim().length<1){
      return toast.error("field should not be empty")
    }
    const response = await addCategory(newCategory)
    setCategories([...categories, response.data]);
    setNewCategory('');
 };

 const updateCategory = async () => {
  if(newCategory.trim().length<1){
    return toast.error("field should not be empty")
  }
  const response = await updateCategories(newCategory,editMode.id)
  setNewCategory('');
  setEditMode({active: false, id: null})
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
      await deleteCategories(id)
      Swal.fire(
        'Changed!',
        'Category status has been updated.',
        'success'
      );
    }


    
 };
 

 return (
  <div className='flex-1'>
    <div className="w-full p-10 space-y-10 bg-gray-100 rounded shadow">
      
        <h2 className="text-2xl font-bold ">{editMode.active ? "Update" : "Add New Category"}</h2>

        <div className="bg-white shadow rounded-lg p-2 w-1/2 ">
          <div className="flex justify-between items-center ">
            <input
              type="text"
              value={newCategory}
              placeholder={editMode.active ? "Update" : "Add New Category"}
              className="border p-2 rounded w-3/4"
              onChange={(e) => setNewCategory(e.target.value)}
            />
            {editMode.active ? ( <button onClick={updateCategory} className="bg-blue-500 text-white p-1 rounded w-1/4 h-10">Update</button> ) : ( <button onClick={addCategories} className="bg-blue-500 text-white p-1 rounded w-1/4 h-10">Add Category</button>)}
            {editMode.active ? (<span onClick={()=>{setEditMode({active: false, id: null})}}>Cancel</span>) : ""}
            
          </div>
        </div>


        <h2 className="text-2xl font-bold mb-4">List of Categories</h2>

        <div className="bg-white shadow rounded-lg p-6">
        <table className="table-auto w-full">
          <thead>
            <tr>
              <th className="px-4 py-2">Category Name</th>
              <th className="px-4 py-2">Status</th>
              <th className="px-4 py-2">Actions</th>
            </tr>
          </thead>
          <tbody>

            {currentItems.map((category) => (
              <tr key={category._id}>
               <td className="border px-4 py-2">{category.categoryName}</td>
                
                <td className="border px-4 py-2">
                 <button
                    onClick={() => toggleStatus(category._id)}
                    className={`border p-2 rounded ${category.status ? 'bg-green-500' : 'bg-red-500'}`}
                 >
                    {category.status ? 'Active' : 'Not Active'}
                 </button>
                </td>
                <td className="border px-4 py-2">
                 <button className="bg-green-500 text-white p-2 rounded mr-2 hover:bg-green-600" onClick={()=>{setEditMode({active: true, id: category._id})}}>
                    Edit
                 </button>
                 
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>


      <div>
        
        {pageNumbers.map((number) => (
        <button key={number} onClick={() => paginate(number)} className="rounded-md bg-green-400 text-white m-2 px-4 py-2 hover:bg-green-600">
          {number}
        </button>
        ))}

      </div>


      </div>
      </div>
 );
};

export default CategoryPage;




