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
exports.authController = void 0;
const auth_service_1 = require("../../services/auth.service");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const sendOtpMail_1 = __importDefault(require("../../utils/sendOtpMail"));
const user_repository_1 = require("../../repositories/user.repository");
exports.authController = {
    studentSignup(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { firstname, lastname, email, mobile, password, confirmPassword, role } = req.body;
                const user = yield (0, user_repository_1.findUserByEmail)(email);
                if (user) {
                    res.send({ error: "Email Already Exists" });
                }
                else {
                    const otpCode = yield (0, sendOtpMail_1.default)(email);
                    console.log(otpCode);
                    if (otpCode !== undefined) {
                        req.session.studentDetail = {
                            firstname: firstname,
                            lastname: lastname,
                            email: email,
                            mobile: mobile,
                            password: password,
                            otpCode: otpCode,
                            otpSetTimestamp: Date.now(),
                            role: role
                        };
                        res.send({ success: "Otp Send Successfully" });
                        console.log(req.session);
                    }
                }
            }
            catch (error) {
                console.log("error", error);
                res.status(500).send({ message: 'Server Error' });
            }
        });
    },
    verifyOtp(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { otp } = req.body;
                const sendOtp = req.session.studentDetail.otpCode;
                const users = req.session.studentDetail;
                console.log(otp);
                console.log(sendOtp);
                console.log(users);
                console.log(req.session);
                if (otp === sendOtp) {
                    const user = yield (0, auth_service_1.signup)(users === null || users === void 0 ? void 0 : users.firstname, users === null || users === void 0 ? void 0 : users.lastname, users === null || users === void 0 ? void 0 : users.email, users === null || users === void 0 ? void 0 : users.mobile, users === null || users === void 0 ? void 0 : users.password, users === null || users === void 0 ? void 0 : users.role);
                    res.send({ user });
                }
                else {
                    res.send({ error: "Incorrect Otp" });
                }
            }
            catch (error) {
                console.log(error);
            }
        });
    },
    ResendOtp(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const userData = req.session.studentDetail;
                if (!userData) {
                    res.send({ error: "Session Not Found , Please SignUp Again" });
                    return;
                }
                const email = userData.email;
                const newOtp = yield (0, sendOtpMail_1.default)(email);
                if (req.session.studentDetail) {
                    req.session.studentDetail.otpCode = newOtp;
                }
                else {
                    console.error("Session user data is unexpectedly undefined.");
                    res.status(500).send({ error: "Something Went Wrong, Please SignUp Again" });
                    return;
                }
                res.status(200).send({ success: "New OTP sent to email" });
            }
            catch (error) {
                console.error(error);
                res.status(500).send({ error: "Server Error" });
            }
        });
    },
    studentLogin(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { email, password } = req.body;
                let response = yield (0, auth_service_1.login)(email, password);
                console.log(response);
                if ('error' in response) {
                    res.send({ error: response.error });
                }
                else {
                    console.log(response.token);
                    res.send({ user: response.user, token: response.token });
                }
            }
            catch (error) {
                console.log(error);
                res.status(500).json({ message: "Server Error" });
            }
        });
    },
    studentForgot(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { email } = req.body;
                const message = yield (0, auth_service_1.sendForgotRequest)(email);
                res.status(200).json({ message: message });
            }
            catch (error) {
                console.log(error);
                res.status(500).json({ message: "Server Error" });
            }
        });
    },
    studentResetPassword(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { userId, token, password } = req.body;
                const reset = yield (0, auth_service_1.studentResetPass)(userId, token, password);
                res.status(200).json({ message: reset });
            }
            catch (error) {
                console.log(error);
                res.status(500).json({ message: "Server Error" });
            }
        });
    },
    // async instructorSignup(req: Request, res: Response): Promise<void> {
    //   try {
    //     const { firstname, lastname, email, mobile, password } = req.body;
    //     const instructor = await instructorSignup(firstname, lastname, email, mobile, password);
    //     res.send({ instructor });
    //   } catch (error) {
    //     console.error(error);
    //     res.status(500).json({ message: 'Server Error' });
    //   }
    // },
    // async instructorLogin(req:Request , res: Response): Promise <void> {
    //   try {
    //       const {email,password} = req.body;
    //       const response = await instructorLogin(email,password);
    //       if ('error' in response) {
    //         res.send({ error: response.error });
    //     } else {
    //         console.log(response.token);
    //         res.send({ instructor: response.user, token: response.token });
    //     }
    //   } catch (error) {
    //       console.log(error);
    //       res.status(500).json({message:"Server Error"})  
    //   }
    // },
    adminLogin(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { email, password } = req.body;
                const response = yield (0, auth_service_1.adminLogin)(email, password);
                if ('error' in response) {
                    res.send({ error: response.error });
                }
                else {
                    res.send({ admin: response.user, token: response.token });
                }
            }
            catch (error) {
                console.log(error);
                res.status(500).json({ message: "Server Error" });
            }
        });
    },
    googleRegister(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                console.log("This is credential in body: ", req.body.credential);
                const token = req.body.credential;
                console.log(token);
                const decodedData = jsonwebtoken_1.default.decode(req.body.credential);
                console.log("Decoded data: ", decodedData);
                const { name, email, jti, } = decodedData;
                let role = 'student';
                const user = yield (0, auth_service_1.googleSignup)(email, jti, name, role);
                console.log("user", user);
                if ('error' in user) {
                    res.send({ error: user.error });
                }
                else if (user) {
                    res.status(200).json({ message: "user saved successfully" });
                }
            }
            catch (error) {
                console.log("Haiiiiii");
                res.status(400).json({ error: "User already exists" });
            }
        });
    },
    googleLogin(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const decodedData = jsonwebtoken_1.default.decode(req.body.credential);
                console.log(decodedData);
                if (!decodedData) {
                    return res.status(400).json({ error: "Invalid credentials" });
                }
                const { email, jti } = decodedData;
                const password = jti;
                const response = yield (0, auth_service_1.googleLogin)(email, password);
                if ('error' in response) {
                    res.send({ error: response.error });
                }
                else {
                    console.log(response.token);
                    res.send({ user: response.user, token: response.token });
                }
            }
            catch (error) {
                console.log(error);
                res.status(500).json({ message: "Server Error" });
            }
        });
    }
};
