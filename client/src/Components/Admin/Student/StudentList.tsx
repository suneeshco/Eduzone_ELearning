import React , {useEffect, useState} from 'react'
import { UserData } from '../../../utils/apiTypes/ApiTypes'
import { getStudentList } from '../../../api/axiosGet'

const StudentList = () => {

    const [studentDetails , setStudentDetails] = useState<UserData[]>([])
    

    const fetchStudents = () => {
        const resp = getStudentList()
        console.log(resp);
        
    }

    useEffect(()=>{
        fetchStudents()
    })
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

    {/* {currentItems.map((category) => ( */}
      <tr>
       <td className="border px-4 py-2">Student</td>
        
        <td className="border px-4 py-2">
         <button
            // onClick={() => toggleStatus(category._id)}
            className={`border p-2 rounded bg-green-500`}
         >
            Active'
         </button>
        </td>
        <td className="border px-4 py-2">
         <button className="bg-green-500 text-white p-2 rounded mr-2 hover:bg-green-600" >
            Edit
         </button>
         
        </td>
      </tr>
    {/* ))} */}
  </tbody>
</table>
</div>

    </div>
    </div>   
  )
}

export default StudentList
