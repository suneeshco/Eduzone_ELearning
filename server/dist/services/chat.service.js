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
exports.changeIsReads = exports.getMessagess = exports.getConversationss = exports.createMessages = exports.createChats = void 0;
const chat_repository_1 = require("../repositories/chat.repository");
const createChats = (senderId, receiverId) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const existingChat = yield (0, chat_repository_1.findChat)(senderId, receiverId);
        if (existingChat) {
            return existingChat;
        }
        else {
            const chat = yield (0, chat_repository_1.createChat)(senderId, receiverId);
            return chat;
        }
    }
    catch (error) {
        throw error;
    }
});
exports.createChats = createChats;
const createMessages = (chatId, senderId, text, mediaUrl, mediaType) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const chat = yield (0, chat_repository_1.createMessage)(chatId, senderId, text, mediaUrl, mediaType);
        return chat;
    }
    catch (error) {
        throw error;
    }
});
exports.createMessages = createMessages;
const getConversationss = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const conversations = yield (0, chat_repository_1.getConversations)(userId);
        const updatedConversations = yield Promise.all(conversations.map((con) => __awaiter(void 0, void 0, void 0, function* () {
            const messages = yield (0, chat_repository_1.messagesForLatest)(con._id);
            const unReadCount = yield (0, chat_repository_1.unReadCounts)(con._id, userId);
            return {
                _id: con._id,
                members: con.members,
                createdAt: con.createdAt,
                recentMessage: messages === null || messages === void 0 ? void 0 : messages.text,
                createdAtMessage: messages === null || messages === void 0 ? void 0 : messages.createdAt,
                unReadCount: unReadCount
            };
        })));
        const sortedConversations = updatedConversations.sort((a, b) => {
            if (a.createdAtMessage && b.createdAtMessage) {
                return b.createdAtMessage.getTime() - a.createdAtMessage.getTime();
            }
            else {
                return 0;
            }
        });
        return sortedConversations;
    }
    catch (error) {
        throw error;
    }
});
exports.getConversationss = getConversationss;
const getMessagess = (chatId) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const Messages = yield (0, chat_repository_1.getMessages)(chatId);
        return Messages;
    }
    catch (error) {
        throw error;
    }
});
exports.getMessagess = getMessagess;
const changeIsReads = (chatId, senderId) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const Messages = yield (0, chat_repository_1.changeIsRead)(chatId, senderId);
        return Messages;
    }
    catch (error) {
        throw error;
    }
});
exports.changeIsReads = changeIsReads;
