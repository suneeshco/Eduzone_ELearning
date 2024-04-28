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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.changeIsRead = exports.unReadCounts = exports.messagesForLatest = exports.getMessages = exports.getConversations = exports.createMessage = exports.createChat = exports.findChat = void 0;
const chat_model_1 = __importDefault(require("../models/chat.model"));
const message_model_1 = __importDefault(require("../models/message.model"));
const findChat = (senderId, receiverId) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        return yield chat_model_1.default.findOne({ members: { $all: [senderId, receiverId] } });
    }
    catch (error) {
        throw error;
    }
});
exports.findChat = findChat;
const createChat = (senderId, receiverId) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const newChat = yield chat_model_1.default.create({ members: [senderId, receiverId] });
        return newChat;
    }
    catch (error) {
        throw error;
    }
});
exports.createChat = createChat;
const createMessage = (chatId, senderId, text, mediaUrl, mediaType) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const message = yield message_model_1.default.create({
            chatId: chatId,
            senderId: senderId,
            text: text,
            mediaUrl: mediaUrl,
            mediaType: mediaType
        });
        yield message.save();
        return message;
    }
    catch (error) {
        throw error;
    }
});
exports.createMessage = createMessage;
const getConversations = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        return yield chat_model_1.default.find({ members: { $in: [userId] } });
    }
    catch (error) {
        throw error;
    }
});
exports.getConversations = getConversations;
const getMessages = (chatId) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        return yield message_model_1.default.find({ chatId: chatId });
    }
    catch (error) {
        throw error;
    }
});
exports.getMessages = getMessages;
const messagesForLatest = (chatId) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        return yield message_model_1.default.findOne({ chatId: chatId }).sort({ createdAt: -1 }).limit(1);
    }
    catch (error) {
        throw error;
    }
});
exports.messagesForLatest = messagesForLatest;
const unReadCounts = (chatId, userId) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        return yield message_model_1.default.countDocuments({ chatId: chatId, isRead: false, senderId: { $ne: userId } });
    }
    catch (error) {
        throw error;
    }
});
exports.unReadCounts = unReadCounts;
const changeIsRead = (chatId, userId) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        return yield message_model_1.default.updateMany({ chatId: chatId, isRead: false, senderId: { $ne: userId } }, { $set: { isRead: true } });
    }
    catch (error) {
        throw error;
    }
});
exports.changeIsRead = changeIsRead;
