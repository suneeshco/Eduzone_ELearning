"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.changeIsRead = exports.getMessages = exports.getConversations = exports.createMessage = exports.createChat = void 0;
const chat_service_1 = require("../../services/chat.service");
const createChat = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const senderId = req.body.senderId;
        const receiverId = req.body.receiverId;
        const chatId = yield (0, chat_service_1.createChats)(senderId, receiverId);
        res.send({ chatId });
    }
    catch (error) {
        console.log(error);
    }
});
exports.createChat = createChat;
const createMessage = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const chatId = req.body.chatId;
        const senderId = req.body.senderId;
        const text = req.body.text;
        const mediaUrl = req.body.mediaUrl;
        const mediaType = req.body.mediaType;
        const message = yield (0, chat_service_1.createMessages)(chatId, senderId, text, mediaUrl, mediaType);
        res.send({ message });
    }
    catch (error) {
        console.log(error);
    }
});
exports.createMessage = createMessage;
const getConversations = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userId = req.params.userId;
        const chat = yield (0, chat_service_1.getConversationss)(userId);
        res.send({ chat });
    }
    catch (error) {
        console.log(error);
    }
});
exports.getConversations = getConversations;
const getMessages = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const chatId = req.params.chatId;
        const messages = yield (0, chat_service_1.getMessagess)(chatId);
        res.send({ messages });
    }
    catch (error) {
        console.log(error);
    }
});
exports.getMessages = getMessages;
const changeIsRead = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const chatId = req.body.chatId;
        const senderId = req.body.userId;
        const messages = yield (0, chat_service_1.changeIsReads)(chatId, senderId);
        res.send({ messages });
    }
    catch (error) {
        console.log(error);
    }
});
exports.changeIsRead = changeIsRead;
