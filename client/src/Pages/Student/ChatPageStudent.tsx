import React, { useEffect, useRef, useState } from 'react'
import Navbar from "../../Components/Student/Header/Navbar";
import { useSelector } from 'react-redux';
import { RootState } from '../../Redux/RootState/RootState';
import { chatApiRequest } from '../../api/axios';
import Conversations from '../../Components/Instructor/ChatInstructor/Conversations';
import Message from '../../Components/Instructor/ChatInstructor/Message';
import { io , Socket } from 'socket.io-client';
import toast from 'react-hot-toast';

interface Messages {
    chatId ?: string;
    senderId: string;
    text: string;
    createdAt: any;
}

interface Chat {
    _id: string
    members: string[];
    createdAt: Date;
}

interface ChatPageStudentProps {
    instructorId: string;
}


const ChatPageStudent:React.FC<ChatPageStudentProps> = ({instructorId}) => {

    const { userInfo } = useSelector((state: RootState) => state.studentAuth);
    const [conversations, setConversations] = useState([])
    const [currentChat, setCurrentChat] = useState<Chat | null>(null)
    const [message, setMessage] = useState<Messages[]>([])
    const [newMessage, setNewMessage] = useState("")
    const [arrivalMessage, setArrivalMessage] = useState <Messages  | null>(null)
    const socket = useRef<Socket | undefined>();

    const scrollRef = useRef<HTMLDivElement | null>(null);



    useEffect(()=>{
        socket.current = io("ws://localhost:8900")
        socket.current?.on("getMessageStudent",data =>{
            setArrivalMessage({
                chatId:currentChat?._id,
                senderId : data.senderId,
                text: data.text,
                createdAt : Date.now()
            })
            
        })
    },[])

    useEffect(()=>{
        arrivalMessage && 
        currentChat?.members.includes(arrivalMessage.senderId) && 
        setMessage((prev)=>[...prev,arrivalMessage])
    },[arrivalMessage,currentChat])

    useEffect(()=>{
        socket.current?.emit("addUser", userInfo?._id)
        socket.current?.on("getUsers",users =>{
            console.log("users",users);
            
        })
    },[userInfo])


    useEffect(() => {
        const getConversations = async () => {
            try {
                const newData = {
                    senderId:userInfo?._id,
                    receiverId: instructorId
                }
                const response = await chatApiRequest({
                    method: 'post',
                    url: `/createChat`,
                    data:newData
                })
                console.log("This is ",response);
                
                setCurrentChat(response.chatId)

            } catch (error) {
                console.log(error);

            }
        }
        getConversations();
    }, [userInfo?._id])


    useEffect(() => {
        const getMessages = async () => {
            const response = await chatApiRequest({
                method: 'get',
                url: `/getMessages/${currentChat?._id}`
            })
            setMessage(response.messages)
        }
        getMessages()
    }, [currentChat])


    const handleSubmit = async (e: { preventDefault: () => void; }) => {
        e.preventDefault()
        if(newMessage.trim().length<1){
            return toast.error("Type the message")
        }
        const newMessageData = {
            senderId: userInfo?._id,
            text: newMessage,
            chatId: currentChat?._id
        }

        const receiverId = currentChat?.members.find(member => member !== userInfo?._id)
        socket.current?.emit("sendMessageStudent",{
            senderId : userInfo?._id,
            receiverId,
            text : newMessage
        })

        try {
            const response = await chatApiRequest({
                method: 'post',
                url: '/createMessage',
                data: newMessageData
            })
            setMessage([...message, response.message])
            setNewMessage("")
        } catch (error) {
            console.log(error);
        }
    }


    useEffect(() => {
        scrollRef.current?.scrollIntoView({ behavior: "smooth" })
    }, [message])
    return (
//         <div style={{ display: 'flex', flexDirection: 'column', height: '100vh' }}>
//     <div style={{ display: 'flex', justifyContent: 'space-between', flexGrow: 1 }}>
//         <Navbar />
//         <div className='w-full pt-20 '>
//             <div className='h-full bg-gray-200 p-5 '>
//                 <div className='w-full bg-white h-full flex'>
//                     <div className='w-4/12'>
//                         <div className="p-5">
//                             <input placeholder='Search for the students' className="w-full py-2 px-2 mb-4 border-b border-gray-400" />
//                             {conversations.map((c, index) => (
//                                 <div key={index} onClick={() => setCurrentChat(c)}>
//                                     <Conversations conversation={c} currentUser={userInfo} />
//                                 </div>
//                             ))}
//                         </div>
//                     </div>
//                     <div className='w-8/12 border-l'>
//                         <div className="p-5  "> 
//                             {currentChat ? (
//                                 <div className=''>
//                                     <div className="h-[500px] overflow-scroll ">
//                                         {message.map((m, index) => (
//                                             <div key={index} ref={index === message.length - 1 ? scrollRef : null}> {/* Only set ref to the last message */}
//                                                 <Message message={m} own={m.senderId === userInfo?._id} sender={userInfo} />
//                                             </div>
//                                         ))}
//                                     </div>
//                                     <div className='flex mt-5 pb-5 z-5 justify-between w-full'>
//                                         <textarea className='w-full border mx-4 p-1 rounded-xl' value={newMessage} onChange={(e) => setNewMessage(e.target.value)} placeholder='Message...'></textarea>
//                                         <button className="w-2/12  border-none rounded-xl cursor-pointer bg-green-400 text-white" onClick={handleSubmit}>Send</button>
//                                     </div>
//                                 </div>
//                             ) : (
//                                 <span>Please Open A Conversation to start</span>
//                             )}
//                         </div>
//                     </div>
//                 </div>
//             </div>
//         </div>
//     </div>
// </div>




        
         
        <div className=' h-full rounded-3xl shadow-2xl border-4 '>
            <div className="p-5">
                    <div className=''>
                        <div className="h-[450px] overflow-scroll overflow-x-hidden ">
                            {message.map((m, index) => (
                                <div key={index} ref={index === message.length - 1 ? scrollRef : null}> {/* Only set ref to the last message */}
                                    <Message message={m} own={m.senderId === userInfo?._id} sender={userInfo} />
                                </div>
                            ))}
                        </div>
                        <div className='flex mt-5 pb-5 z-5 justify-between w-full'>
                            <textarea className='w-full border mx-4 p-1 rounded-xl' value={newMessage} onChange={(e) => setNewMessage(e.target.value)} placeholder='Message...'></textarea>
                            <button className="w-2/12  border-none rounded-xl cursor-pointer bg-green-400 text-white" onClick={handleSubmit}>Send</button>
                        </div>
                    </div>
                
            </div>
        </div>
    

   

    )
}

export default ChatPageStudent
