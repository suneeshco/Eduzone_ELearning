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
exports.changeIsRead = exports.getNotificationsAdmin = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const notification_service_1 = require("../../services/notification.service");
const notification_repository_1 = require("../../repositories/notification.repository");
const getNotificationsAdmin = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer')) {
        return res.status(401).json({ error: 'No token found' });
    }
    const token = authHeader.split(' ')[1];
    if (!token) {
        return res.status(401).json({ error: 'No token found' });
    }
    const decoded = jsonwebtoken_1.default.verify(token, process.env.TOKEN_SECRET);
    try {
        const notification = yield (0, notification_service_1.getNotifications)(decoded._id);
        console.log("notifica", notification);
        res.send({ notification: notification });
    }
    catch (error) {
        console.log(error);
    }
});
exports.getNotificationsAdmin = getNotificationsAdmin;
const changeIsRead = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req.params.id;
        const response = yield (0, notification_repository_1.changeIsReadStatus)(id);
    }
    catch (error) {
        console.log(error);
    }
});
exports.changeIsRead = changeIsRead;
