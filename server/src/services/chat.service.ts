import { createChat, findChat , createMessage , getConversations , getMessages , messagesForLatest , unReadCounts , changeIsRead} from "../repositories/chat.repository";


export const createChats = async (senderId: string, receiverId: string) => {
  try {
    const existingChat = await findChat(senderId, receiverId)
    if (existingChat) {
      return existingChat
    } else {
      const chat = await createChat(senderId, receiverId)
      return chat;
    }

  } catch (error) {
    throw error;
  }
};


export const createMessages = async (chatId: string, senderId: string, text: string, mediaUrl : string , mediaType:string) => {
  try {
      const chat = await createMessage(chatId , senderId ,text,mediaUrl,mediaType)
      return chat;
  } catch (error) {
    throw error;
  }
};


export const getConversationss = async (userId: string ) => {
  try {
    const conversations = await getConversations(userId)
    const updatedConversations = await Promise.all(conversations.map(async(con)=>{
      const messages = await messagesForLatest(con._id)
      const unReadCount = await unReadCounts(con._id, userId)
      
      return {
        _id:con._id,
        members: con.members,
        createdAt: con.createdAt,
        recentMessage : messages?.text,
        createdAtMessage: messages?.createdAt,
        unReadCount : unReadCount
      }
    }))

    const sortedConversations = updatedConversations.sort((a, b) => {
      if (a.createdAtMessage && b.createdAtMessage) {
        return b.createdAtMessage.getTime() - a.createdAtMessage.getTime();
      } else {
        return 0;
      }
    })
    
      return sortedConversations
   

  } catch (error) {
    throw error;
  }
};


export const getMessagess = async (chatId: string) => {
  try {
    const Messages = await getMessages(chatId)
    
      return Messages
   

  } catch (error) {
    throw error;
  }
};


export const changeIsReads = async (chatId: string, senderId : string) => {
  try {
    const Messages = await changeIsRead(chatId,senderId)
    
      return Messages
   

  } catch (error) {
    throw error;
  }
};