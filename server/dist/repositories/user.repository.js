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
exports.getAllInstructorList = exports.instructorUpdatePhoto = exports.changeStudentStatus = exports.findInstructorById = exports.getInstructorList = exports.getStudentList = exports.updatePhoto = exports.instructorUpdateProfile = exports.updateProfile = exports.findUserById = exports.findUserByEmail = exports.createUser = void 0;
const user_model_1 = __importDefault(require("../models/user.model"));
const createUser = (userData) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        console.log(userData);
        return yield user_model_1.default.create(userData);
    }
    catch (error) {
        throw error;
    }
});
exports.createUser = createUser;
const findUserByEmail = (email) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        return yield user_model_1.default.findOne({ email });
    }
    catch (error) {
        throw error;
    }
});
exports.findUserByEmail = findUserByEmail;
const findUserById = (id) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        return yield user_model_1.default.findOne({ _id: id });
    }
    catch (error) {
        throw error;
    }
});
exports.findUserById = findUserById;
const updateProfile = (firstname, lastname, email, mobile, id) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const updatedProfile = yield user_model_1.default.findByIdAndUpdate(id, {
            firstname,
            lastname,
            email,
            mobile
        }, { new: true });
        return updatedProfile;
    }
    catch (error) {
        throw error;
    }
});
exports.updateProfile = updateProfile;
const instructorUpdateProfile = (firstname, lastname, mobile, id) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const updatedProfile = yield user_model_1.default.findByIdAndUpdate(id, {
            firstname,
            lastname,
            mobile
        }, { new: true });
        return updatedProfile;
    }
    catch (error) {
        throw error;
    }
});
exports.instructorUpdateProfile = instructorUpdateProfile;
const updatePhoto = (photo, userId) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const updatedProfile = yield user_model_1.default.findByIdAndUpdate(userId, {
            photo: photo
        }, { new: true });
        return updatedProfile;
    }
    catch (error) {
        throw error;
    }
});
exports.updatePhoto = updatePhoto;
const getStudentList = (search) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let query = { role: 'student' };
        if (search && search.trim() !== '') {
            const searchRegex = new RegExp(search.trim(), 'i');
            query = Object.assign(Object.assign({}, query), { firstname: searchRegex });
        }
        const students = yield user_model_1.default.find(query).sort({ _id: -1 });
        return students;
    }
    catch (error) {
        throw error;
    }
});
exports.getStudentList = getStudentList;
const getInstructorList = (search) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let query = { role: 'instructor' };
        if (search && search.trim() !== '') {
            const searchRegex = new RegExp(search.trim(), 'i');
            query = Object.assign(Object.assign({}, query), { firstname: searchRegex });
        }
        const students = yield user_model_1.default.find(query).sort({ _id: -1 });
        return students;
    }
    catch (error) {
        throw error;
    }
});
exports.getInstructorList = getInstructorList;
const findInstructorById = (id) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        return yield user_model_1.default.findOne({ _id: id });
    }
    catch (error) {
        throw error;
    }
});
exports.findInstructorById = findInstructorById;
const changeStudentStatus = (id) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const student = yield user_model_1.default.findOne({ _id: id });
        if (!student) {
            throw new Error('Student not found');
        }
        student.status = !student.status;
        yield student.save();
        return student;
    }
    catch (error) {
        throw error;
    }
});
exports.changeStudentStatus = changeStudentStatus;
const instructorUpdatePhoto = (photo, userId) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const updatedProfile = yield user_model_1.default.findByIdAndUpdate(userId, {
            photo: photo
        }, { new: true });
        return updatedProfile;
    }
    catch (error) {
        throw error;
    }
});
exports.instructorUpdatePhoto = instructorUpdatePhoto;
const getAllInstructorList = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let query = { role: 'instructor', status: true };
        const instructors = yield user_model_1.default.find(query).sort({ _id: -1 });
        return instructors;
    }
    catch (error) {
        throw error;
    }
});
exports.getAllInstructorList = getAllInstructorList;
