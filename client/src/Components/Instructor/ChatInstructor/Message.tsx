import React from 'react'
import { UserData } from '../../../utils/apiTypes/ApiTypes';
import profilePhoto from '../../../assets/images/DefaultImages/Profile.png'
import {format} from "timeago.js"

interface Messages {
    chatId?: string;
    senderId: string;
    text: string;
    createdAt: Date;
}

interface MessageProps {
    own: boolean; 
    message : Messages
    sender : UserData | null
}

const Message: React.FC<MessageProps> = ({message, own ,sender}) => {
    return (
        <>
        {own ? (
    <div className="flex items-end mt-5 flex-col">
    <div className='w-9/12 items-end flex flex-row-reverse'>
        <div className='flex flex-col-reverse mr-5'> 
        <div className='text-xs mt-3 text-right'>{format(message.createdAt)}</div>
            <div className='flex'>
                <p className="p-2 rounded-2xl text-white bg-pink-500">{message.text} </p>
                <img src={sender?.photo || profilePhoto} alt='Photo' className="w-8 h-8 rounded-full object-cover-full mr-5"/>
            </div>
        </div>
    </div>  
</div>
) : (
    <div className="flex mt-5 flex-col">
        <div className='w-9/12'>
            <div className='flex'>
                <img src='https://ashisheditz.com/wp-content/uploads/2023/09/profile-picture-cute-whatsapp.jpg' alt='' className="w-8 h-8 rounded-full object-cover-full mr-5" />
                <p className="p-2 rounded-2xl text-white bg-indigo-500">{message.text} </p>
            </div>
            <div className='text-xs mt-3 text-left'>{format(message.createdAt)}</div>
        </div>  
    </div>
)}

        

        
        </>
    )
}


export default Message
