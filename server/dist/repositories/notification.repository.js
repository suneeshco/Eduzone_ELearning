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
exports.changeIsReadStatus = exports.getNotificationss = exports.addNotification = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const notification_model_1 = __importDefault(require("../models/notification.model"));
const addNotification = (senderId, receiverId, message, category) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const notification = yield notification_model_1.default.create({
            receiverId: receiverId,
            senderId: senderId,
            message: message,
            category: category
        });
        yield notification.save();
        return notification;
    }
    catch (error) {
        throw error;
    }
});
exports.addNotification = addNotification;
const getNotificationss = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const ObjectId = new mongoose_1.default.Types.ObjectId(id);
    console.log(id);
    try {
        const notifications = yield notification_model_1.default.find({ receiverId: ObjectId, isRead: false }).sort({ createdAt: -1 });
        console.log(notifications);
        return notifications;
    }
    catch (error) {
        throw error;
    }
});
exports.getNotificationss = getNotificationss;
const changeIsReadStatus = (id) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const notifications = yield notification_model_1.default.updateOne({ _id: id }, { $set: { isRead: true } });
        return notifications;
    }
    catch (error) {
        throw error;
    }
});
exports.changeIsReadStatus = changeIsReadStatus;
