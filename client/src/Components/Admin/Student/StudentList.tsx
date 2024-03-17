import React , {useEffect, useState} from 'react'
import { UserData } from '../../../utils/apiTypes/ApiTypes'
import { getStudentList } from '../../../api/axiosGet'
import Swal from 'sweetalert2'
import { changeStudentStatus } from '../../../api/axiosPatch'
import { adminApiRequest } from '../../../api/axios'
import { studentLogout , setStudentCredentials } from '../../../Redux/Slices/StudentAuth'
import { useDispatch } from 'react-redux'

const StudentList = () => {

  const dispatch = useDispatch()

    const [studentDetails , setStudentDetails] = useState<UserData[]>([])

    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage] = useState(10);
  
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = studentDetails.slice(indexOfFirstItem, indexOfLastItem);
  
    const paginate = (pageNumber: number) => setCurrentPage(pageNumber);
  
    const pageNumbers = [];
    for (let i = 1; i <= Math.ceil(studentDetails.length / itemsPerPage); i++) {
      pageNumbers.push(i);
    }
    

    const fetchStudents = async () => {
      const response = await adminApiRequest({
        method: 'get',
        url: '/getStudentList',
    });
    setStudentDetails(response)  
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
          const response = await adminApiRequest({
            method: 'patch',
            url: '/changeStudentStatus',
            data: { id },
        });
        console.log("hello",response);
          Swal.fire(
            'Changed!',
            'Student status has been updated.',
            'success'
          );
        }
    
    
        
     };

    useEffect(()=>{
        fetchStudents()
    },[studentDetails])


  return (
    <div className='flex-1'>
    <div className="w-full p-10 space-y-10 bg-gray-100 rounded shadow">
    <h2 className="text-2xl font-bold mb-4">List of Students</h2>

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

export default StudentList
