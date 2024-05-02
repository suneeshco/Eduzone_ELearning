import  { useEffect, useState } from 'react'
import { chatApiRequest } from '../../../api/axios'
import { UserData } from '../../../utils/apiTypes/ApiTypes';
import profilePhoto from '../../../assets/images/DefaultImages/Profile.png'
import { FaVideo } from 'react-icons/fa';
import { ZIM } from "zego-zim-web";
import { ZegoUIKitPrebuilt } from '@zegocloud/zego-uikit-prebuilt';
import {  parseISO } from 'date-fns';



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
  const TOKEN = ZegoUIKitPrebuilt.generateKitTokenForTest(appID, serverSecret, currentUser!._id, userID, userName);

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
    if (user) {
      const targetUser = {
        userID: user._id,
        userName: user.firstname
      };
      zp.sendCallInvitation({
        callees: [targetUser],
        callType: ZegoUIKitPrebuilt.InvitationTypeVideoCall,
        timeout: 60,
      }).then((res) => {
        console.warn(res);
      })
        .catch((err) => {
          console.warn(err);
        });
    }

  }

  const formatMessageTime = (createdAt: any) => {
    const createdAtDate = parseISO(createdAt);
    const now = new Date();
    const differenceInDays = Math.floor((now.getTime() - createdAtDate.getTime()) / (1000 * 60 * 60 * 24));
  
    if (differenceInDays === 0) {
      return new Date(createdAtDate).toLocaleTimeString([], {
        hour: '2-digit',
        minute: '2-digit',
        hour12: true,
      });
    } else if (differenceInDays === 1) {
      return "yesterday";
    } else {
      return new Date(createdAtDate).toLocaleDateString();
    }
  };
  return (
    //     <div className="flex items-center justify-between p-2 my-4 cursor-pointer relative" >

    //   <div className="flex items-center">
    //     <img src={user?.photo || profilePhoto} alt='' className="w-9 h-9 rounded-full object-cover-full mr-5" />
    //     <div>
    //       <span className='font-bold'>{user?.firstname}</span>
    //       <div className="text-xs">{conversation.recentMessage}</div>
    //     </div>
    //   </div>
    //   <div>
    //     <FaVideo onClick={(e) => {
    //       e.stopPropagation();
    //       invite()
    //     }} style={{ cursor: 'pointer' }} />
    //   </div>
    //   {(conversation.unReadCount !== undefined) && (conversation.unReadCount > 0) ? (
    //     <div className="absolute top-[33%] right-5 -mt-1 -mr-1 w-[26px] h-[26px] bg-green-500 rounded-full text-center">{conversation.unReadCount}</div>
    //   ) : (
    //     ""
    //   )}
    // </div>


    <>
      <div className="w-1/4">
        <img
          src={user?.photo || profilePhoto}
          className="object-cover h-12 w-12 rounded-full"
          alt=""
        />
      </div>
      <div className="w-full">
        <div className="text-lg font-semibold">{user?.firstname}</div>
        <span className="text-gray-500">{conversation.recentMessage}</span>
      </div>
      
      
      <div className='flex flex-col items-end'>
      <div>
      <p className='text-sm ' style={{ whiteSpace: 'nowrap' }}>{formatMessageTime(conversation.createdAtMessage)}</p>
      </div>
      {(conversation.unReadCount !== undefined) && (conversation.unReadCount > 0) ? (
        <div className="mr-2  w-[26px] h-[26px] bg-green-500 rounded-full text-center">{conversation.unReadCount}</div>
      ) : (
        ""
      )}
      <div>
      <FaVideo onClick={(e) => {
          e.stopPropagation();
          invite()
        }} style={{ cursor: 'pointer' }} />
      </div>
        
      </div>


    </>



  )
}

export default Conversations
