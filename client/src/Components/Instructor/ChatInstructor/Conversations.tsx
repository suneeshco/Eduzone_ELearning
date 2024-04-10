import React, { useEffect, useState } from 'react'
import { chatApiRequest } from '../../../api/axios'
import { UserData } from '../../../utils/apiTypes/ApiTypes';
import profilePhoto from '../../../assets/images/DefaultImages/Profile.png'



interface Conversation {
  _id: string;
  members: string[];
  createdAt: Date;
  recentMessage?:string;
  createdAtMessage?:any;
  unReadCount?:number;

}



interface ConversationsProps {
  conversation: Conversation;
  currentUser: UserData | null;
}

const Conversations = ({conversation, currentUser}:ConversationsProps) => {
  const [user,setUser] = useState<UserData|null>(null)
  useEffect(()=>{
    const friendId = conversation.members.find((m: any)=> m !== currentUser?._id)
    const getUser = async ()=>{
      const userDetails = await chatApiRequest({
        method: 'get',
        url: `/getUser/${friendId}`
      })
      setUser(userDetails)
    }
    getUser()

  },[currentUser,conversation])
  return (
    <div className="flex items-center p-2 my-4 cursor-pointer relative">
  <img src={user?.photo || profilePhoto} alt='' className="w-9 h-9 rounded-full object-cover-full mr-5" />
  <div>
    <span className='font-bold'>{user?.firstname}</span>
    <div className="text-xs">{conversation.recentMessage}</div>
  </div>
  {(conversation.unReadCount !== undefined) &&(conversation.unReadCount > 0 )? (
        <div className="absolute top-[33%] right-5 -mt-1 -mr-1 w-[26px] h-[26px] bg-green-500 rounded-full text-center">{conversation.unReadCount}</div>

  ):(
    ""
  )}

</div>

  


  )
}

export default Conversations
