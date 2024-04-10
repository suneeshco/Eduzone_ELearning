import { Router } from 'express';
import { createChat , createMessage , getConversations, getMessages, changeIsRead} from '../controllers/chatController/chatController';
import { getStudentDetails } from '../controllers/studentController/studentController';
const router = Router();

router.post('/createChat',createChat)
router.post('/createMessage',createMessage)
router.get('/getConversations/:userId', getConversations)
router.get('/getMessages/:chatId', getMessages)
router.get('/getUser/:id',getStudentDetails)
router.patch('/changeIsRead',changeIsRead)

export default router