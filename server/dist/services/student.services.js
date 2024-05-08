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
exports.getProgresses = exports.updateProgressLesson = exports.getInstructorss = exports.getInstructors = exports.getAllRatings = exports.getMyRatings = exports.updateOverallRating = exports.courseRatings = exports.studentChangeImages = exports.getStudentDetailss = exports.updateProfiles = void 0;
const course_repository_1 = require("../repositories/course.repository");
const instructor_repository_1 = require("../repositories/instructor.repository");
const rating_repository_1 = require("../repositories/rating.repository");
const user_repository_1 = require("../repositories/user.repository");
const updateProfiles = (firstname, lastname, email, mobile, id) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield (0, user_repository_1.findUserById)(id);
        if (!user) {
            throw new Error('User not exists');
        }
        const updatedUser = (0, user_repository_1.updateProfile)(firstname, lastname, email, mobile, id);
        return updatedUser;
    }
    catch (error) {
        throw error;
    }
});
exports.updateProfiles = updateProfiles;
const getStudentDetailss = (id) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield (0, user_repository_1.findUserById)(id);
        if (!user) {
            throw new Error('User not exists');
        }
        return user;
    }
    catch (error) {
        throw error;
    }
});
exports.getStudentDetailss = getStudentDetailss;
const studentChangeImages = (photo, userId) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield (0, user_repository_1.findUserById)(userId);
        if (!user) {
            throw new Error('User not exists');
        }
        const updatedUser = (0, user_repository_1.updatePhoto)(photo, userId);
        return updatedUser;
    }
    catch (error) {
        throw error;
    }
});
exports.studentChangeImages = studentChangeImages;
const courseRatings = (data) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const rating = yield (0, rating_repository_1.courseRating)(data);
        return rating;
    }
    catch (error) {
        throw error;
    }
});
exports.courseRatings = courseRatings;
const updateOverallRating = (courseId) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const overallRating = yield (0, rating_repository_1.calculateOverallRating)(courseId);
        const updated = yield (0, course_repository_1.updateCourseRating)(courseId, overallRating);
        return updated;
    }
    catch (error) {
        throw error;
    }
});
exports.updateOverallRating = updateOverallRating;
const getMyRatings = (courseId, studentId) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const rating = yield (0, rating_repository_1.getMyRating)(courseId, studentId);
        return rating;
    }
    catch (error) {
        throw error;
    }
});
exports.getMyRatings = getMyRatings;
const getAllRatings = (courseId) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const rating = yield (0, rating_repository_1.getAllRating)(courseId);
        return rating;
    }
    catch (error) {
        throw error;
    }
});
exports.getAllRatings = getAllRatings;
const getInstructors = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const instructors = yield (0, user_repository_1.getAllInstructorList)();
        return instructors;
    }
    catch (error) {
        throw error;
    }
});
exports.getInstructors = getInstructors;
const getInstructorss = (search) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const instructors = yield (0, user_repository_1.getAllInstructorLists)(search);
        return instructors;
    }
    catch (error) {
        throw error;
    }
});
exports.getInstructorss = getInstructorss;
const updateProgressLesson = (studentId, courseId, lessonId) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const progress = yield (0, course_repository_1.findProgress)(studentId, courseId, lessonId);
        console.log("progressDoc", progress);
        let newProgress;
        if (progress) {
            return progress;
        }
        else {
            newProgress = yield (0, course_repository_1.createProgress)(studentId, courseId, lessonId);
        }
        return newProgress;
    }
    catch (error) {
        throw error;
    }
});
exports.updateProgressLesson = updateProgressLesson;
const getProgresses = (courseId, studentId) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let progressCount = 0;
        const { count, progress } = yield (0, course_repository_1.getProgress)(courseId, studentId);
        const totalLesson = yield (0, instructor_repository_1.getLesson)(courseId);
        if (count > 0) {
            progressCount = (count / totalLesson.length) * 100;
        }
        return { progressCount, progress };
    }
    catch (error) {
        throw error;
    }
});
exports.getProgresses = getProgresses;
