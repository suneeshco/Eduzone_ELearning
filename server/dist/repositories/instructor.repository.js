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
exports.getCloudinaryUrl = exports.deleteLessonByIds = exports.editLesson = exports.getLessonDetails = exports.changeInstructorStatus = exports.getInstructorList = exports.updateProfile = exports.editCourse = exports.getLesson = exports.addLesson = exports.getSingleCourse = exports.getCourse = exports.addCourse = void 0;
const course_model_1 = __importDefault(require("../models/course.model"));
const lesson_model_1 = __importDefault(require("../models/lesson.model"));
const user_model_1 = __importDefault(require("../models/user.model"));
// export const createInstructor = async (instructorData: Partial<InstructorDocument>): Promise<InstructorDocument> => {
//   try {
//     return await Instructor.create(instructorData);
//   } catch (error) {
//     throw error;
//   }
// };
// export const findInstructorByEmail = async (email: string): Promise<InstructorDocument | null> => {
//   try {
//     return await User.findOne({ email });
//   } catch (error) {
//     throw error;
//   }
// };
const addCourse = (course) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        return yield course_model_1.default.create(course);
    }
    catch (error) {
        throw error;
    }
});
exports.addCourse = addCourse;
const getCourse = (id) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        return yield course_model_1.default.find({ instructorId: id }).sort({ createdAt: -1 });
    }
    catch (error) {
        throw error;
    }
});
exports.getCourse = getCourse;
const getSingleCourse = (id) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        return yield course_model_1.default.findOne({ _id: id });
    }
    catch (error) {
        throw error;
    }
});
exports.getSingleCourse = getSingleCourse;
const addLesson = (course) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        return yield lesson_model_1.default.create(course);
    }
    catch (error) {
        throw error;
    }
});
exports.addLesson = addLesson;
const getLesson = (id) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        return yield lesson_model_1.default.find({ courseId: id });
    }
    catch (error) {
        throw error;
    }
});
exports.getLesson = getLesson;
const editCourse = ({ courseId, courseName, courseDuration, courseFee, courseDescription, category, imageUrl }) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const updatedCourse = yield course_model_1.default.findByIdAndUpdate(courseId, {
            courseName,
            courseDuration,
            courseFee,
            courseDescription,
            category,
            imageUrl
        }, { new: true });
        return updatedCourse;
    }
    catch (error) {
        throw error;
    }
});
exports.editCourse = editCourse;
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
const getInstructorList = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const instructors = yield user_model_1.default.find({});
        return instructors;
    }
    catch (error) {
        throw error;
    }
});
exports.getInstructorList = getInstructorList;
const changeInstructorStatus = (id) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const instructor = yield user_model_1.default.findOne({ _id: id });
        if (!instructor) {
            throw new Error('Student not found');
        }
        instructor.status = !instructor.status;
        yield instructor.save();
        return instructor;
    }
    catch (error) {
        throw error;
    }
});
exports.changeInstructorStatus = changeInstructorStatus;
const getLessonDetails = (id) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        return yield lesson_model_1.default.findOne({ _id: id });
    }
    catch (error) {
        throw error;
    }
});
exports.getLessonDetails = getLessonDetails;
const editLesson = ({ lessonTitle, lessonDescription, lessonVideo, courseId, lessonId }) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const updatedCourse = yield lesson_model_1.default.findByIdAndUpdate(lessonId, {
            lessonTitle,
            lessonDescription,
            lessonVideo,
            courseId
        }, { new: true });
        console.log(updatedCourse);
        return updatedCourse;
    }
    catch (error) {
        throw error;
    }
});
exports.editLesson = editLesson;
const deleteLessonByIds = (id) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield lesson_model_1.default.deleteOne({ _id: id });
        return result;
    }
    catch (error) {
        throw error;
    }
});
exports.deleteLessonByIds = deleteLessonByIds;
const getCloudinaryUrl = (publicId) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield lesson_model_1.default.findOne({ _id: publicId });
        return result === null || result === void 0 ? void 0 : result.lessonVideo;
    }
    catch (error) {
        throw error;
    }
});
exports.getCloudinaryUrl = getCloudinaryUrl;
