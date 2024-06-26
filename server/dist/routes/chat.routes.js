"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const chatController_1 = require("../controllers/chatController/chatController");
const studentController_1 = require("../controllers/studentController/studentController");
const router = (0, express_1.Router)();
router.post('/createChat', chatController_1.createChat);
router.post('/createMessage', chatController_1.createMessage);
router.get('/getConversations/:userId', chatController_1.getConversations);
router.get('/getMessages/:chatId', chatController_1.getMessages);
router.get('/getUser/:id', studentController_1.getStudentDetails);
router.patch('/changeIsRead', chatController_1.changeIsRead);
exports.default = router;
