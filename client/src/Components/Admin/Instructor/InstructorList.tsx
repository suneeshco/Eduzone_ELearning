import React , {useEffect, useState} from 'react'
import {  InstructorData } from '../../../utils/apiTypes/ApiTypes'
import { getInstructorList } from '../../../api/axiosGet'
import Swal from 'sweetalert2'
import { changeInstructorStatus } from '../../../api/axiosPatch'

const InstructorList = () => {

    const [InstructorDetails , setInstructorDetails] = useState<InstructorData[]>([])

    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage] = useState(10);
  
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = InstructorDetails.slice(indexOfFirstItem, indexOfLastItem);
  
    const paginate = (pageNumber: number) => setCurrentPage(pageNumber);
  
    const pageNumbers = [];
    for (let i = 1; i <= Math.ceil(InstructorDetails.length / itemsPerPage); i++) {
      pageNumbers.push(i);
    }
    

    const fetchStudents = () => {
        const resp = getInstructorList()
        resp.then((respo)=>{
            setInstructorDetails(respo.data)
        }) 
    }


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
          await changeInstructorStatus(id)
          Swal.fire(
            'Changed!',
            'Instructor status has been updated.',
            'success'
          );
        }
    
    
        
     };

    useEffect(()=>{
        fetchStudents()
    },[InstructorDetails])


  return (
    <div className='flex-1'>
    <div className="w-full p-10 space-y-10 bg-gray-100 rounded shadow">
    <h2 className="text-2xl font-bold mb-4">List of Instructors</h2>

<div className="bg-white shadow rounded-lg p-6">
<table className="table-auto w-full">
  <thead>
    <tr>
      <th className="px-4 py-2">Student Name</th>
      <th className="px-4 py-2">Status</th>
      <th className="px-4 py-2">Actions</th>
    </tr>
  </thead>
  <tbody>

    {currentItems.map((student) => (
      <tr key={student._id}>
       <td className="border px-4 py-2">{student.firstname+' '+ student.lastname}</td>
        
        <td className="border px-4 py-2 text-green-500 ">
        
           {student.status ? 'Active' : 'Not Active'}
        
        </td>
        <td className="border px-4 py-2">
         <button onClick={() => toggleStatus(student._id)} className="bg-green-500 text-white p-2 rounded mr-2 hover:bg-green-600" >
         {student.status ? 'Block' : 'Unblock'}
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
  )
}

export default InstructorList
