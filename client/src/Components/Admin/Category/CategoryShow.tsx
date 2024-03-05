// import React, { useState, useEffect } from 'react';

// const CategoryPage = () => {
//  const [categories, setCategories] = useState([]);
//  const [newCategory, setNewCategory] = useState('');

//  // Simulate fetching categories from a backend service
//  useEffect(() => {
//     // Replace this with your actual API call
//     const fetchCategories = async () => {
//       // Example API call
//       const response = await fetch('/api/categories');
//       const data = await response.json();
//       setCategories(data);
//     };

//     fetchCategories();
//  }, []);

//  const addCategory = async () => {
//     // Example API call to add a new category
//     const response = await fetch('/api/categories', {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json',
//       },
//       body: JSON.stringify({ name: newCategory }),
//     });

//     const data = await response.json();
//     setCategories([...categories, data]);
//     setNewCategory('');
//  };

//  const deleteCategory = async (id) => {
//     // Example API call to delete a category
//     await fetch(`/api/categories/${id}`, {
//       method: 'DELETE',
//     });

//     setCategories(categories.filter((category) => category.id !== id));
//  };

//  return (
//     <div>
//       <div className="flex justify-between items-center mb-4">
//         <input
//           type="text"
//           value={newCategory}
//           onChange={(e) => setNewCategory(e.target.value)}
//           placeholder="Add new category"
//           className="border p-2 rounded"
//         />
//         <button onClick={addCategory} className="bg-blue-500 text-white p-2 rounded">
//           Add Category
//         </button>
//       </div>

//       <table className="table-auto">
//         <thead>
//           <tr>
//             <th className="px-4 py-2">Category Name</th>
//             <th className="px-4 py-2">Actions</th>
//           </tr>
//         </thead>
//         <tbody>
//           {categories.map((category) => (
//             <tr key={category.id}>
//               <td className="border px-4 py-2">{category.name}</td>
//               <td className="border px-4 py-2">
//                 <button className="bg-green-500 text-white p-2 rounded mr-2">
//                  Edit
//                 </button>
//                 <button
//                  onClick={() => deleteCategory(category.id)}
//                  className="bg-red-500 text-white p-2 rounded"
//                 >
//                  Delete
//                 </button>
//               </td>
//             </tr>
//           ))}
//         </tbody>
//       </table>
//     </div>
//  );
// };

// export default CategoryPage;





import React,{useState,useEffect} from 'react';
import { getCategories } from '../../../api/axiosGet';
import { Category } from '../../../utils/apiTypes/ApiTypes';
import { addCategory } from '../../../api/axiosPost';
import { deleteCategories , updateCategories } from '../../../api/axiosPatch';

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
    // Example API call to add a new category
    const response = await addCategory(newCategory)
    setCategories([...categories, response.data]);
    setNewCategory('');
 };

 const updateCategory = async () => {
  // Example API call to add a new category
  const response = await updateCategories(newCategory,editMode.id)
  setNewCategory('');
  setEditMode({active: false, id: null})
};

  const toggleStatus = async (id:string) => {
    // Example API call to delete a category
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

        {/* Heading for listing categories */}
        <h2 className="text-2xl font-bold mb-4">List of Categories</h2>
        {/* Card for listing categories */}
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




