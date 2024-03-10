




import React,{useState,useEffect} from 'react';
import { getCategories } from '../../../api/axiosGet';
import { Category } from '../../../utils/apiTypes/ApiTypes';
import { addCategory } from '../../../api/axiosPost';
import { deleteCategories , updateCategories } from '../../../api/axiosPatch';
import toast from 'react-hot-toast';

const CategoryPage = () => {

  const [categories, setCategories] = useState<Category[]>([]);
  const [newCategory, setNewCategory] = useState('');
  const [editMode, setEditMode] = useState<{ active: boolean; id: string | null }>({ active: false, id: null });

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
    await deleteCategories(id)
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

            {categories.map((category) => (
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
      </div>
      </div>
 );
};

export default CategoryPage;




