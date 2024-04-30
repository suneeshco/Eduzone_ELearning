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
exports.changePasswords = exports.googleLogin = exports.googleSignup = exports.studentResetPass = exports.sendForgotRequest = exports.adminLogin = exports.login = exports.signup = void 0;
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const crypto_1 = __importDefault(require("crypto"));
const user_repository_1 = require("../repositories/user.repository");
// import {findInstructorByEmail} from '../repositories/instructor.repository';
const admin_repository_1 = require("../repositories/admin.repository");
const token_repository_1 = require("../repositories/token.repository");
const nodemailer_1 = __importDefault(require("nodemailer"));
const randomToken = () => {
    return crypto_1.default.randomBytes(48).toString('hex');
};
function generateRandomPassword(length) {
    const charset = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()';
    let password = '';
    for (let i = 0; i < length; i++) {
        const randomIndex = Math.floor(Math.random() * charset.length);
        password += charset[randomIndex];
    }
    return password;
}
const signup = (firstname, lastname, email, mobile, password, role) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const salt = yield bcryptjs_1.default.genSalt(10);
        const hashedPassword = yield bcryptjs_1.default.hash(password, salt);
        const newUser = yield (0, user_repository_1.createUser)({ firstname, lastname, email, mobile, password: hashedPassword, role });
        const token = jsonwebtoken_1.default.sign({ _id: newUser._id }, process.env.TOKEN_SECRET);
        return newUser;
    }
    catch (error) {
        throw error;
    }
});
exports.signup = signup;
const login = (email, password) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const existingUser = yield (0, user_repository_1.findUserByEmail)(email);
        if (!existingUser) {
            return { error: 'User Not Exists' };
        }
        const passwordMatch = yield bcryptjs_1.default.compare(password, existingUser.password);
        if (!passwordMatch) {
            return { error: 'Incorrect Password' };
        }
        if (!(existingUser === null || existingUser === void 0 ? void 0 : existingUser.status)) {
            console.log(existingUser === null || existingUser === void 0 ? void 0 : existingUser.status);
            return { error: 'User Blocked' };
        }
        const token = jsonwebtoken_1.default.sign({ _id: existingUser._id, role: existingUser.role }, process.env.TOKEN_SECRET);
        return { user: existingUser, token: token };
    }
    catch (error) {
        throw error;
    }
});
exports.login = login;
// export const instructorSignup = async (firstname: string,lastname:string, email: string, mobile:string, password: string , role : string): Promise<InstructorDocument | string> => {
//   try {
//     const existingUser = await findInstructorByEmail(email);
//     if (existingUser) {
//       throw new Error('Instructor already exists');
//     }
//     const salt = await bcrypt.genSalt(10);
//     const hashedPassword = await bcrypt.hash(password, salt);
//     const newUser = await createInstructor({ firstname, lastname, email, mobile, password: hashedPassword , role});
//     const token = jwt.sign({ _id: newUser._id }, process.env.INSTRUCTOR_SECRET!);
//     return newUser;
//   } catch (error) {
//     throw error;
//   }
// };
// export const instructorLogin = async (email:string , password : string): Promise<LoginResponse | ErrorResponse> =>{
//     try {
//         const existingUser = await findInstructorByEmail(email);
//         if (!existingUser) {
//           return { error: 'Instructor Not Exists' };
//         }
//         const passwordMatch = await bcrypt.compare( password, existingUser.password);
//         if (!passwordMatch) {
//           return { error: 'Incorrect Password' };
//         }
//         if(!existingUser?.status){
//           console.log(existingUser?.status);
//           return { error: 'Instructor Blocked' };
//         }
//         const token = jwt.sign({ _id: existingUser._id , role : existingUser.role}, process.env.TOKEN_SECRET!);
//         return {user:existingUser,token:token};
//       } catch (error) {
//         throw error;
//       }
// }
const adminLogin = (email, password) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const existingUser = yield (0, admin_repository_1.findAdminByEmail)(email);
        if (!existingUser) {
            return { error: 'Incorrect Username' };
        }
        const passwordMatch = yield bcryptjs_1.default.compare(password, existingUser.password);
        if (!passwordMatch) {
            return { error: 'Incorrect Password' };
        }
        const token = jsonwebtoken_1.default.sign({ _id: existingUser._id }, process.env.ADMIN_SECRET);
        return { user: existingUser, token: token };
    }
    catch (error) {
        throw error;
    }
});
exports.adminLogin = adminLogin;
const sendForgotRequest = (email) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield (0, user_repository_1.findUserByEmail)(email);
        if (!user) {
            return { error: 'User Not Found' };
        }
        const randToken = randomToken();
        const createTok = yield (0, token_repository_1.createToken)({ userId: user._id, token: randToken });
        const link = `${process.env.BASE_URL}/student/password-reset/${user._id}/${createTok.token}`;
        const transporter = nodemailer_1.default.createTransport({
            host: "smtp.gmail.com",
            port: 587,
            secure: false,
            requireTLS: true,
            auth: {
                user: process.env.USER_NAME,
                pass: process.env.USER_PASSWORD
            }
        });
        const mailOptions = {
            from: process.env.USER_NAME,
            to: email,
            subject: "Reset Password",
            text: `We have recieved your request for reset password. Click ${link} to reset your password.`
        };
        const info = yield transporter.sendMail(mailOptions);
        console.log("Email sent: " + info.response);
        return { success: "Email sent successfully" };
    }
    catch (error) {
        throw error;
    }
});
exports.sendForgotRequest = sendForgotRequest;
const studentResetPass = (userId, token, password) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield (0, user_repository_1.findUserById)(userId);
        if (!user) {
            return { error: 'User Not Found' };
        }
        const getToken = yield (0, token_repository_1.findToken)(userId, token);
        if (!token) {
            return { error: 'User Not Found' };
        }
        const salt = yield bcryptjs_1.default.genSalt(10);
        const hashedPassword = yield bcryptjs_1.default.hash(password, salt);
        if (user && getToken) {
            user.password = hashedPassword;
            yield user.save();
            yield (getToken === null || getToken === void 0 ? void 0 : getToken.deleteOne());
        }
        return { user: user };
    }
    catch (error) {
        throw error;
    }
});
exports.studentResetPass = studentResetPass;
const googleSignup = (email, password, name, role) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const existingUser = yield (0, user_repository_1.findUserByEmail)(email);
        console.log(existingUser);
        if (existingUser) {
            return { error: 'User Already Exists' };
        }
        let newPassword = generateRandomPassword(12);
        const salt = yield bcryptjs_1.default.genSalt(10);
        const hashedPassword = yield bcryptjs_1.default.hash(newPassword, salt);
        const isActive = true;
        const newUser = yield (0, user_repository_1.createUser)({ firstname: name, lastname: "", email: email, mobile: "", password: hashedPassword, role: role });
        const token = jsonwebtoken_1.default.sign({ _id: newUser._id }, process.env.TOKEN_SECRET);
        // if(newUser){
        //     console.log(newPassword);
        //     const transporter = nodemailer.createTransport({
        //         host: "smtp.gmail.com",
        //         port: 587,
        //         secure: false,
        //         requireTLS: true,
        //         auth: {
        //             user: process.env.USER_NAME,
        //             pass: process.env.USER_PASSWORD
        //         }
        //     });
        //     const mailOptions = {
        //         from: process.env.USER_NAME,
        //         to: newUser.email,
        //         subject: "Verification Code",
        //         text: `Thank you for creating account. Your Password Is ${newPassword}`
        //     };
        //     const info = await transporter.sendMail(mailOptions);
        //     console.log("Email sent: " + info.response);
        // }
        return { token: token, user: newUser };
    }
    catch (error) {
        throw error;
    }
});
exports.googleSignup = googleSignup;
const googleLogin = (email, password) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const existingUser = yield (0, user_repository_1.findUserByEmail)(email);
        if (!existingUser) {
            return { error: 'User Not Exists' };
        }
        if (!(existingUser === null || existingUser === void 0 ? void 0 : existingUser.status)) {
            console.log(existingUser === null || existingUser === void 0 ? void 0 : existingUser.status);
            return { error: 'User Blocked' };
        }
        const token = jsonwebtoken_1.default.sign({ _id: existingUser._id, role: existingUser.role }, process.env.TOKEN_SECRET);
        return { user: existingUser, token: token };
    }
    catch (error) {
        throw error;
    }
});
exports.googleLogin = googleLogin;
const changePasswords = (userId, oldPassword, password) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield (0, user_repository_1.findUserById)(userId);
        if (!user) {
            return { error: 'User Not Found' };
        }
        const passwordMatch = yield bcryptjs_1.default.compare(oldPassword, user.password);
        if (!passwordMatch) {
            return { error: 'Password Incorrect' };
        }
        const salt = yield bcryptjs_1.default.genSalt(10);
        const hashedPassword = yield bcryptjs_1.default.hash(password, salt);
        if (user) {
            user.password = hashedPassword;
            yield user.save();
        }
        return { user: user };
    }
    catch (error) {
        throw error;
    }
});
exports.changePasswords = changePasswords;
