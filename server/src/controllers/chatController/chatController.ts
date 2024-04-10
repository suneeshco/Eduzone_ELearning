import { Request, Response } from 'express';
import { createChats , createMessages , getConversationss , getMessagess , changeIsReads} from '../../services/chat.service';


export const createChat = async(req: Request, res: Response)=>{
    try {
      const senderId = req.body.senderId
      const receiverId = req.body.receiverId
      const chatId = await createChats(senderId,receiverId)
      res.send({chatId})
    } catch (error) {
      console.log(error)
    }
  }



  export const createMessage = async(req: Request, res: Response)=>{
    try {
      
      const chatId = req.body.chatId
      const senderId = req.body.senderId
      const text = req.body.text
      const message = await createMessages(chatId,senderId,text)
      res.send({message})
    } catch (error) {
      console.log(error)
    }
  }



  export const getConversations = async(req: Request, res: Response)=>{
    try {
      const userId = req.params.userId
      const chat = await getConversationss(userId)
      res.send({chat})
    } catch (error) {
      console.log(error)
    }
  }



  export const getMessages = async(req: Request, res: Response)=>{
    try {
      const chatId = req.params.chatId
      
      
      const messages = await getMessagess(chatId)
      res.send({messages})
    } catch (error) {
      console.log(error)
    }
  }



  export const changeIsRead = async(req: Request, res: Response)=>{
    try {
      const chatId = req.body.chatId
      const senderId = req.body.userId
      
      
      const messages = await changeIsReads(chatId,senderId )
      res.send({messages})
    } catch (error) {
      console.log(error)
    }
  }