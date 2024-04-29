import React, { useEffect, useRef, useState } from 'react'
// import Navbar from "../../Components/Student/Header/Navbar";
import { useSelector } from 'react-redux';
import { RootState } from '../../Redux/RootState/RootState';
import { chatApiRequest } from '../../api/axios';
// import Conversations from '../../Components/Instructor/ChatInstructor/Conversations';
import Message from '../../Components/Instructor/ChatInstructor/Message';
import { io, Socket } from 'socket.io-client';
import toast from 'react-hot-toast';
import {  FaImage } from 'react-icons/fa';
import axios from 'axios';
import { ZIM } from "zego-zim-web";
import { ZegoUIKitPrebuilt } from '@zegocloud/zego-uikit-prebuilt';
import { config } from '../../config';


interface Messages {
    chatId?: string;
    senderId: string;
    text: string;
    createdAt: any;
    mediaUrl: any;
}

interface Chat {
    _id: string
    members: string[];
    createdAt: Date;
}

interface ChatPageStudentProps {
    instructorId: string;
    closeFunction: Function;
}


const ChatPageStudent: React.FC<ChatPageStudentProps> = ({ instructorId, closeFunction }) => {

    const { userInfo } = useSelector((state: RootState) => state.studentAuth);
    // const [conversations, setConversations] = useState([])
    const [currentChat, setCurrentChat] = useState<Chat | null>(null)
    const [message, setMessage] = useState<Messages[]>([])
    const [newMessage, setNewMessage] = useState("")
    const [arrivalMessage, setArrivalMessage] = useState<Messages | null>(null)
    const socket = useRef<Socket | undefined>();

    const scrollRef = useRef<HTMLDivElement | null>(null);
    const [mediaFile, setMediaFile] = useState<File | null>(null);
    const [mediaPreview, setMediaPreview] = useState<string | null>(null);


    const userID = userInfo!._id.toString();
    const userName = "userName" + userID;
    const appID = 943120359;
    const serverSecret = "83c23c3e5c270270d243b8ddbb16b0bc";
    const TOKEN = ZegoUIKitPrebuilt.generateKitTokenForTest(appID, serverSecret, userInfo!._id, userID, userName);

    const zp = ZegoUIKitPrebuilt.create(TOKEN);
    zp.addPlugins({ ZIM });

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            const fileExtension = file.name.split(".").pop();
            if (!fileExtension) {
                window.alert("Invalid file name. Please ensure the file has an extension.");
                return;
            }
            const allowedFileTypes = ["png", "jpg", "jpeg", "mp4", "mov", "avi", "wmv"];

            if (!allowedFileTypes.includes(fileExtension.toLowerCase())) {
                window.alert(`File does not support. Files type must be ${allowedFileTypes.join(", ")}`);
                return;
            }
            setMediaFile(file);
            setMediaPreview(URL.createObjectURL(file));
        }
    };



    const uploadMediaToCloudinary = async () => {
        if (!mediaFile) return null;

        const formData = new FormData();
        formData.append("file", mediaFile);
        formData.append("upload_preset", "images_preset");
        formData.append("cloud_name", "dwuy04s3s");

        try {
            const response = await axios.post(
                "https://api.cloudinary.com/v1_1/dwuy04s3s/image/upload",
                formData
            );

            if (response.data && response.data.url) {
                console.log("Image uploaded successfully. URL:", response.data.url);
                console.log(response.data.url, "url")
                return response.data.url
            } else {
                console.error("Invalid response from Cloudinary", response.data);
                toast.error(
                    "Error uploading image: Invalid response from Cloudinary"
                );
            }
        } catch (error) {
            console.error("Error uploading image to Cloudinary:", error);
            return null;
        }
    };

    useEffect(() => {
        socket.current = io(config.BaseUrl)
        socket.current?.on("getMessageStudent", data => {
            setArrivalMessage({
                chatId: currentChat?._id,
                senderId: data.senderId,
                text: data.text,
                createdAt: Date.now(),
                mediaUrl: data.mediaUrl
            })

        })
    }, [])

    useEffect(() => {
        arrivalMessage &&
            currentChat?.members.includes(arrivalMessage.senderId) &&
            setMessage((prev) => [...prev, arrivalMessage])
    }, [arrivalMessage, currentChat])

    useEffect(() => {
        socket.current?.emit("addUser", userInfo?._id)
        socket.current?.on("getUsers", users => {
            console.log("users", users);

        })
    }, [userInfo])


    useEffect(() => {
        const getConversations = async () => {
            try {
                const newData = {
                    senderId: userInfo?._id,
                    receiverId: instructorId
                }
                const response = await chatApiRequest({
                    method: 'post',
                    url: `/createChat`,
                    data: newData
                })
                console.log("This is ", response);

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
        if (!newMessage.trim() && !mediaFile) {
            return toast.error("Type the message")
        }


        const mediaUrl = await uploadMediaToCloudinary();

        const newMessageData = {
            senderId: userInfo?._id,
            text: newMessage,
            chatId: currentChat?._id,
            mediaUrl: mediaUrl,
            mediaType: mediaFile?.type.split('/')[0] || '',
        }

        const receiverId = currentChat?.members.find(member => member !== userInfo?._id)
        socket.current?.emit("sendMessageStudent", {
            senderId: userInfo?._id,
            receiverId,
            text: newMessage,
            mediaUrl: mediaPreview,
            mediaType: mediaFile?.type.split('/')[0] || '',
        })

        try {
            const response = await chatApiRequest({
                method: 'post',
                url: '/createMessage',
                data: newMessageData
            })
            setMessage([...message, response.message])
            setNewMessage("")
            setMediaPreview(null); setMediaFile(null);
        } catch (error) {
            console.log(error);
        }
    }


    useEffect(() => {
        scrollRef.current?.scrollIntoView({ behavior: "smooth" })
    }, [message])


    const handleClose = () => {
        closeFunction()
    }
    return (

        <>

            <div id="chat-container" className="  bottom-16  w-full ">
                <div className="bg-white shadow-md rounded-lg  w-full">
                    <div className="p-4 border-b bg-teal-700 text-white rounded-t-lg flex justify-between items-center">
                        <p className="text-lg font-semibold">Chat</p>
                        <button onClick={handleClose} id="close-chat" className="text-gray-300 hover:text-gray-400 focus:outline-none focus:text-gray-400">
                            <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
                            </svg>
                        </button>
                    </div>
                    <div id="chatbox" className="p-4 h-80 overflow-y-auto">

                        <div className="h-[450px] overflow-scroll overflow-x-hidden ">
                            {mediaPreview ? (
                                <>
                                    <div className='cursor-pointer' onClick={() => { setMediaPreview(null); setMediaFile(null); }}>
                                        close
                                    </div>
                                    <img src={mediaPreview} alt="Media Preview" className="w-[80%] h-[80%] mr-2" />
                                </>

                            ) : (
                                <>
                                    {message.map((m, index) => (
                                        <div key={index} ref={index === message.length - 1 ? scrollRef : null}>
                                            <Message message={m} own={m.senderId === userInfo?._id} sender={userInfo} />
                                        </div>
                                    ))}
                                </>
                            )}
                        </div>

                    </div>
                    <div className="p-4 border-t flex">
                        <label htmlFor="file-upload" className="cursor-pointer mx-2 flex items-center">
                            <FaImage size={25} />
                            <input id="file-upload" type="file" onChange={handleFileChange} accept="image/*, video/*" style={{ display: 'none' }} />
                        </label>
                        <input id="user-input" type="text" placeholder="Type a message" value={newMessage} onChange={(e) => setNewMessage(e.target.value)} className="w-full px-3 py-2 border rounded-l-md focus:outline-none focus:ring-2 focus:ring-blue-500" />
                        <button id="send-button" className="bg-blue-500 text-white px-4 py-2 rounded-r-md hover:bg-blue-600 transition duration-300" onClick={handleSubmit}>Send</button>
                    </div>
                </div>
            </div>

        </>


    )
}

export default ChatPageStudent
