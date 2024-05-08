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
exports.userOtpExpiration = exports.adminAuth = exports.instructorAuth = exports.authenticateInstructor = exports.authenticateUser = exports.studentAuth = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const user_repository_1 = require("../repositories/user.repository");
const instructor_service_1 = require("../services/instructor.service");
const studentAuth = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const authHeader = req.headers.authorization;
        if (!authHeader || !authHeader.startsWith('Bearer')) {
            return res.status(401).json({ error: 'No token found' });
        }
        const token = authHeader.split(' ')[1];
        if (!token) {
            return res.status(401).json({ error: 'No token found' });
        }
        const decoded = jsonwebtoken_1.default.verify(token, process.env.TOKEN_SECRET);
        if (decoded.role === 'student') {
            const user = yield (0, user_repository_1.findUserById)(decoded._id);
            if (!user) {
                return res.status(401).json({ error: 'User not found' });
            }
            if (!user.status) {
                return res.status(401).json({ error: 'Account is blocked' });
            }
            next();
        }
        else {
            return res.status(401).json({ error: 'Unauthorized' });
        }
    }
    catch (error) {
        console.log(error);
    }
});
exports.studentAuth = studentAuth;
const cloudinary = require('cloudinary').v2;
cloudinary.config({
    cloud_name: 'dwuy04s3s',
    api_key: '856663183499572',
    api_secret: '5zjwqxUUN6HNugD2jQjDFurytf0',
});
const authenticateUser = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const authHeader = req.headers.authorization;
        if (!authHeader || !authHeader.startsWith('Bearer')) {
            return res.status(401).json({ error: 'No token found' });
        }
        const token = authHeader.split(' ')[1];
        if (!token) {
            return res.status(401).json({ error: 'No token found' });
        }
        const decoded = jsonwebtoken_1.default.verify(token, process.env.TOKEN_SECRET);
        if (decoded.role === 'student') {
            const user = yield (0, user_repository_1.findUserById)(decoded._id);
            if (!user) {
                return res.status(401).json({ error: 'User not found' });
            }
            if (!user.status) {
                return res.status(401).json({ error: 'Account is blocked' });
            }
            const courseId = req.query.courseId;
            const course = yield (0, instructor_service_1.getSingleCoursess)(courseId);
            if (!course) {
                return res.status(404).json({ error: 'Course not found' });
            }
            if (!course.students.includes(decoded._id)) {
                return res.status(403).json({ error: 'Unauthorized: Student not enrolled in the course' });
            }
            next();
        }
        else {
            return res.status(401).json({ error: 'Unauthorized' });
        }
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Internal server error' });
    }
});
exports.authenticateUser = authenticateUser;
const authenticateInstructor = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const authHeader = req.headers.authorization;
        if (!authHeader || !authHeader.startsWith('Bearer')) {
            return res.status(401).json({ error: 'No token found' });
        }
        const token = authHeader.split(' ')[1];
        if (!token) {
            return res.status(401).json({ error: 'No token found' });
        }
        const decoded = jsonwebtoken_1.default.verify(token, process.env.TOKEN_SECRET);
        if (decoded.role === 'instructor') {
            const user = yield (0, user_repository_1.findUserById)(decoded._id);
            if (!user) {
                return res.status(401).json({ error: 'User not found' });
            }
            if (!user.status) {
                return res.status(401).json({ error: 'Account is blocked' });
            }
            next();
        }
        else {
            return res.status(401).json({ error: 'Unauthorized' });
        }
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Internal server error' });
    }
});
exports.authenticateInstructor = authenticateInstructor;
const instructorAuth = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const authHeader = req.headers.authorization;
        if (!authHeader || !authHeader.startsWith('Bearer')) {
            return res.status(401).json({ error: 'No token found' });
        }
        const token = authHeader.split(' ')[1];
        if (!token) {
            return res.status(401).json({ error: 'No token found' });
        }
        const decoded = jsonwebtoken_1.default.verify(token, process.env.TOKEN_SECRET);
        if (decoded.role === 'instructor') {
            const user = yield (0, user_repository_1.findUserById)(decoded._id);
            if (!user) {
                return res.status(401).json({ error: 'Instructor not found' });
            }
            if (!user.status) {
                return res.status(401).json({ error: 'Account is blocked' });
            }
            next();
        }
        else {
            return res.status(401).json({ error: 'Unauthorized' });
        }
    }
    catch (error) {
        console.log(error);
    }
});
exports.instructorAuth = instructorAuth;
const adminAuth = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const authHeader = req.headers.authorization;
        if (!authHeader || !authHeader.startsWith('Bearer')) {
            return res.status(401).json({ error: 'No token found' });
        }
        const token = authHeader.split(' ')[1];
        if (!token) {
            return res.status(401).json({ error: 'No token found' });
        }
        const decoded = jsonwebtoken_1.default.verify(token, process.env.TOKEN_SECRET);
        // const user =await findUserById(decoded._id)
        // if(!user){
        //     return res.status(401).json({ error: 'Admin Details Not Found' });
        // }
        if (decoded.role === 'admin') {
            next();
        }
        else {
            return res.status(401).json({ error: 'Unauthorized' });
        }
    }
    catch (error) {
        console.log(error);
    }
});
exports.adminAuth = adminAuth;
const userOtpExpiration = (req, res, next) => {
    const now = Date.now();
    if (req.session.studentDetail && req.session.studentDetail.otpCode && req.session.studentDetail.otpSetTimestamp) {
        if (typeof req.session.studentDetail.otpSetTimestamp === 'number') {
            const timeElapsed = now - req.session.studentDetail.otpSetTimestamp;
            if (timeElapsed >= 90000) {
                req.session.studentDetail.otpCode = undefined;
                req.session.studentDetail.otpSetTimestamp = undefined;
                console.log("Expired OTP code cleaned up");
                return res.send({ expired: "Otp Expired" });
            }
        }
    }
    next();
};
exports.userOtpExpiration = userOtpExpiration;
