import Chat , {ChatDocument} from '../models/chat.model'
import Message , {MessageDocument} from '../models/message.model'



export const findChat = async (senderId :string, receiverId : string) => {
    try {
        
        return await Chat.findOne({ members: { $all: [senderId, receiverId] } });
        
      } catch (error) {
        throw error;
      }
  }


  export const createChat = async (senderId :string, receiverId : string) => {
    try {
        
        const newChat = await Chat.create({ members: [senderId, receiverId] });
        return newChat;
        
      } catch (error) {
        throw error;
      }
  }



  export const createMessage = async (chatId:string,senderId :string,  text:string) => {
    try {
        
      const message = await Message.create({
        chatId:chatId,
        senderId:senderId,
        text:text
      });
      await message.save();

        return message;
        
      } catch (error) {
        throw error;
      }
  }



  export const getConversations = async (userId :string) => {
    try {
      
        return await Chat.find({ members: { $in: [userId] } });
      } catch (error) {
        throw error;
      }
  }

  export const getMessages = async (chatId :string) => {
    try {
        return await Message.find({ chatId:chatId });
      } catch (error) {
        throw error;
      }
  }



  export const messagesForLatest = async (chatId :string) => {
    try {
        return await Message.findOne({ chatId:chatId }).sort({createdAt:-1}).limit(1)
      } catch (error) {
        throw error;
      }
  }


  export const unReadCounts = async (chatId :string ,userId:string) => {
    try {
      return await Message.countDocuments({ chatId: chatId, isRead: false, senderId: { $ne: userId } });

      } catch (error) {
        throw error;
      }
  }


  export const changeIsRead = async (chatId: string, userId: string) => {
    try {
      return await Message.updateMany(
        { chatId: chatId, isRead: false, senderId: { $ne: userId } },
        { $set: { isRead: true } }
      );
       
    } catch (error) {
      throw error;
    }
  };
  