import React, { useEffect, useRef, useState } from 'react'
import Navbar from '../../Components/Instructor/Header/Navbar';
import { InstructorSidebar } from '../../Components/Instructor/Sidebar/InstructorSidebar';
import Conversations from '../../Components/Instructor/ChatInstructor/Conversations';
import Message from '../../Components/Instructor/ChatInstructor/Message';
import { useSelector } from 'react-redux';
import { RootState } from '../../Redux/RootState/RootState';
import { chatApiRequest } from '../../api/axios';
import { io, Socket } from 'socket.io-client';
import NoConversations from '../../assets/images/DefaultImages/noConversation.jpg'
import toast from 'react-hot-toast';
// import { useNavigate } from 'react-router-dom';
import {  FaImage } from 'react-icons/fa';
import axios from 'axios';
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
  recentMessage: string;
  createdAtMessage: any;
  unReadCount: number;

}


const ChatPage: React.FC = () => {
  const { userInfo } = useSelector((state: RootState) => state.studentAuth);
  const [conversations, setConversations] = useState<Chat[]>([]);
  // const [search,setSearch] = useState<string>("")
  const [currentChat, setCurrentChat] = useState<Chat | null>(null)
  const [message, setMessage] = useState<Messages[]>([])
  const [newMessage, setNewMessage] = useState("")
  const [arrivalMessage, setArrivalMessage] = useState<Messages | null>(null)
  const socket = useRef<Socket | undefined>();
  // const navigate = useNavigate();

  const scrollRef = useRef<HTMLDivElement | null>(null);

  const [mediaFile, setMediaFile] = useState<File | null>(null);
  const [mediaPreview, setMediaPreview] = useState<string | null>(null);


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
    socket.current?.on("getMessageInstructor", data => {
      setArrivalMessage({
        chatId: currentChat?._id,
        senderId: data.senderId,
        text: data.text,
        createdAt: Date.now(),
        mediaUrl: data.mediaUrl,
      })
    })
  }, [])


  useEffect(() => {
    arrivalMessage &&
      currentChat?.members.includes(arrivalMessage.senderId) &&
      setMessage((prev) => [...prev, arrivalMessage])
    getConversations()

  }, [arrivalMessage, currentChat])

  useEffect(() => {
    socket.current?.emit("addUser", userInfo?._id)
    socket.current?.on("getUsers", users => {
      console.log("users", users);

    })
  }, [userInfo])


  const getConversations = async () => {
    try {
      const response = await chatApiRequest({
        method: 'get',
        url: `/getConversations/${userInfo?._id}`,
      })
      setConversations(response.chat)

    } catch (error) {
      console.log(error);

    }
  }


  useEffect(() => {

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
  }, [currentChat, mediaPreview])


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
    socket.current?.emit("sendMessageInstructor", {
      senderId: userInfo?._id,
      receiverId,
      text: newMessage,
      mediaUrl: mediaUrl,
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
      getConversations()

    } catch (error) {
      console.log(error);
    }
  }




  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [message])



  const changeIsRead = async (chatId: string) => {
    try {
      const datas = {
        chatId,
        senderId: userInfo?._id
      }
      const response = await chatApiRequest({
        method: 'patch',
        url: '/changeIsRead',
        data: datas
      })

      if (response.messages) {
        getConversations()
      }
    } catch (error) {
      console.log(error);

    }
  }

  return (





    <div>
      <div className='fixed z-50 top-0 left-0 w-full'>
        <Navbar />
      </div>
      <div className="flex flex-col md:flex-row bg-gray-100 ">
        <div className="md:w-1/5 ">
          <InstructorSidebar />
        </div>

        <div className="md:w-4/5 h-full">
          <div className="w-full pt-14 m-1 ">
            {/* <div className="h-[650px] bg-gray-200 p-5 flex flex-col md:flex-row md:justify-center">
              <div className="w-full md:w-3/12 border-2 border-gray-800 rounded-3xl bg-white mb-5 md:mb-0">

                <div className="p-5 h-full overflow-y-auto">

                  {conversations.map((c, index) => (
                    <div
                      key={index}
                      className={`rounded-2xl ${currentChat?._id === c._id ? "bg-gray-400" : ""}`}
                      onClick={() => {
                        setCurrentChat(c);
                        changeIsRead(c._id);
                      }}
                    >
                      <Conversations conversation={c} currentUser={userInfo} />
                    </div>
                  ))}
                </div>

              </div>
              <div className="w-full md:w-9/12 border-2 border-gray-800 rounded-3xl bg-white">
                <div className="p-5 h-full flex flex-col">
                  {currentChat ? (
                    <>
                      <div className="flex-grow overflow-y-auto px-16">
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
                      <div className="flex mt-5 pb-5">
                        <div className="flex items-center">
                          <label htmlFor="file-upload" className="cursor-pointer mx-2">
                            <FaCamera size={20} />
                            <input id="file-upload" type="file" onChange={handleFileChange} accept="image/*, video/*" style={{ display: 'none' }} />
                          </label>
                        </div>
                        <textarea
                          className="flex-grow border-2 border-gray-700 mx-4 p-1 rounded-xl"
                          value={newMessage}
                          onChange={(e) => setNewMessage(e.target.value)}
                          placeholder="Message..."
                        ></textarea>
                        <button
                          className="w-1/3 md:w-2/12 border-none rounded-xl cursor-pointer bg-green-400 text-white"
                          onClick={handleSubmit}
                        >
                          Send
                        </button>
                      </div>
                    </>
                  ) : (
                    <div className="flex-grow flex items-center justify-center">
                      <img src={NoConversations} className='w-[90%] h-[90%] rounded-2xl' alt="Please select a conversation to start" />
                    </div>
                  )}

                </div>
              </div>
            </div> */}


            <div className="container mx-auto shadow-lg rounded-lg h-[600px]">

              

              <div className="px-5 py-5 flex justify-between items-center border-b-2 " >
                <div className="font-semibold  text-2xl">Chat</div>
              </div>

              <div className="flex flex-row justify-between bg-white h-[550px]">

                <div className="flex flex-col w-2/5 border-r-2 overflow-y-auto bg-gray-50" >


                  {conversations.map((c, index) => (
                    <div
                      key={index}
                      className={`flex flex-row py-4 px-2 justify-center cursor-pointer items-center border-b-2 ${currentChat?._id === c._id ? "border-l-4 border-teal-800" : ""}`}
                      onClick={() => {
                        setCurrentChat(c);
                        changeIsRead(c._id);
                      }}
                    >
                      <Conversations conversation={c} currentUser={userInfo} />
                    </div>
                  ))}




                </div>

                <div className="w-full px-5 flex flex-col justify-between">
                  <div className="flex flex-col mt-5 overflow-y-auto">
                  {currentChat ? (
                    <>
                      <div className="flex-grow h-screen overflow-y-auto px-16">
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
                      <div className="flex mt-5 pb-5">
                        <div className="flex items-center">
                          <label htmlFor="file-upload" className="cursor-pointer mx-2">
                            <FaImage size={30} />
                            <input id="file-upload" type="file" onChange={handleFileChange} accept="image/*, video/*" style={{ display: 'none' }} />
                          </label>
                        </div>
                        <input
                        type='text'
                          className="flex-grow border-2 border-black bg-gray-300 py-3 px-3 rounded-xl"
                          value={newMessage}
                          onChange={(e) => setNewMessage(e.target.value)}
                          placeholder="Message..."
                        ></input>
                        <button
                          className="w-1/3 md:w-2/12 mx-2 border-2 border-black  rounded-xl cursor-pointer bg-green-400 text-white"
                          onClick={handleSubmit}
                        >
                          Send
                        </button>
                      </div>
                    </>
                  ) : (
                    <div className="flex-grow flex items-center justify-center">
                      <img src={NoConversations} className='w-[90%] h-[90%] rounded-2xl' alt="Please select a conversation to start" />
                    </div>
                  )}
                  </div>
                  
                </div>


              </div>
            </div>





          </div>
        </div>

      </div>
    </div>

  );
};

export default ChatPage
