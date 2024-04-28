import React,{useState,useCallback} from 'react'
import Navbar from '../../Components/Instructor/Header/Navbar';
import { InstructorSidebar } from '../../Components/Instructor/Sidebar/InstructorSidebar';
import {useNavigate} from 'react-router-dom'
const VideoCallPage : React.FC= () => {
    const [value,setValue] = useState<string>("")
    const navigate = useNavigate()
    const handleJoinRoom = useCallback(()=>{
        navigate(`/room/${value}`)
    },[navigate,value])
  return (
    <div>
      <div className='fixed z-50 top-0 left-0 w-full'>
        <Navbar />
      </div>
      <div className="flex flex-col md:flex-row  ">
        <div className="md:w-1/5">
          <InstructorSidebar />
        </div>

         <div className="md:w-4/5 h-full ">
            <div className='mt-24'>
            <input type='text' placeholder='Room Id' value={value} onChange={(e)=>{setValue(e.target.value)}} />
          <button onClick={handleJoinRoom}>Create</button>
            </div>
          
        </div>
      </div>
    </div>
  )
}

export default VideoCallPage
