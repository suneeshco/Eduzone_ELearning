import React, { useEffect, useState } from 'react'
import { chatApiRequest } from '../../../api/axios'
import { UserData } from '../../../utils/apiTypes/ApiTypes';
import profilePhoto from '../../../assets/images/DefaultImages/Profile.png'
import { FaVideo } from 'react-icons/fa';
import { ZIM } from "zego-zim-web";
import { ZegoUIKitPrebuilt } from '@zegocloud/zego-uikit-prebuilt';



interface Conversation {
  _id: string;
  members: string[];
  createdAt: Date;
  recentMessage?: string;
  createdAtMessage?: any;
  unReadCount?: number;

}



interface ConversationsProps {
  conversation: Conversation;
  currentUser: UserData | null;
}

const Conversations = ({ conversation, currentUser }: ConversationsProps) => {
  const [user, setUser] = useState<UserData | null>(null)

  const userID = currentUser!._id.toString();
const userName = "userName" + userID;
const appID = 943120359;
const serverSecret = "83c23c3e5c270270d243b8ddbb16b0bc";
const TOKEN = ZegoUIKitPrebuilt.generateKitTokenForTest(appID, serverSecret,currentUser!._id, userID, userName);

const zp = ZegoUIKitPrebuilt.create(TOKEN);
zp.addPlugins({ ZIM });

  useEffect(() => {
    const friendId = conversation.members.find((m: any) => m !== currentUser?._id)
    const getUser = async () => {
      const userDetails = await chatApiRequest({
        method: 'get',
        url: `/getUser/${friendId}`
      })
      setUser(userDetails)
    }
    getUser()

  }, [currentUser, conversation])

  function invite() {
    if(user){
      const targetUser = {
        userID:user._id,
        userName:user.firstname
    };
   zp.sendCallInvitation({
    callees: [targetUser],
    callType: ZegoUIKitPrebuilt.InvitationTypeVideoCall,
    timeout: 60, // Timeout duration (second). 60s by default, range from [1-600s].
   }).then((res) => {
    console.warn(res);
   })
   .catch((err) => {
   console.warn(err);
   });
    }
    
 }
  return (
    <div className="flex items-center justify-between p-2 my-4 cursor-pointer relative" >
      
  <div className="flex items-center">
    <img src={user?.photo || profilePhoto} alt='' className="w-9 h-9 rounded-full object-cover-full mr-5" />
    <div>
      <span className='font-bold'>{user?.firstname}</span>
      <div className="text-xs">{conversation.recentMessage}</div>
    </div>
  </div>
  <div>
    <FaVideo onClick={(e) => {
      e.stopPropagation();
      invite()
    }} style={{ cursor: 'pointer' }} />
  </div>
  {(conversation.unReadCount !== undefined) && (conversation.unReadCount > 0) ? (
    <div className="absolute top-[33%] right-5 -mt-1 -mr-1 w-[26px] h-[26px] bg-green-500 rounded-full text-center">{conversation.unReadCount}</div>
  ) : (
    ""
  )}
</div>





  )
}

export default Conversations
