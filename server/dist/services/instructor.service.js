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
exports.instructorChangeImages = exports.deleteLessonById = exports.editLessons = exports.getLessonDetail = exports.getInstructorDetailss = exports.updateProfiles = exports.editCourses = exports.getLessonss = exports.addLessons = exports.getSingleCoursess = exports.getCoursess = exports.addCourses = void 0;
const instructor_repository_1 = require("../repositories/instructor.repository");
const notification_repository_1 = require("../repositories/notification.repository");
const user_repository_1 = require("../repositories/user.repository");
const addCourses = (data) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let courseData = yield (0, instructor_repository_1.addCourse)(data);
        if (courseData) {
            let res = yield (0, notification_repository_1.addNotification)(data.instructorId, '65dc7fc13cf5dc2e16a28402', 'New Course Added ! Verify It.', 'CourseAdded');
        }
        return courseData;
    }
    catch (error) {
        console.log(error);
    }
});
exports.addCourses = addCourses;
const getCoursess = (id) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let courses = yield (0, instructor_repository_1.getCourse)(id);
        return courses;
    }
    catch (error) {
        console.log(error);
    }
});
exports.getCoursess = getCoursess;
const getSingleCoursess = (id) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let courses = yield (0, instructor_repository_1.getSingleCourse)(id);
        return courses;
    }
    catch (error) {
        console.log(error);
    }
});
exports.getSingleCoursess = getSingleCoursess;
const addLessons = (data) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let lessonData = yield (0, instructor_repository_1.addLesson)(data);
        return lessonData;
    }
    catch (error) {
        console.log(error);
    }
});
exports.addLessons = addLessons;
const getLessonss = (id) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let lessons = yield (0, instructor_repository_1.getLesson)(id);
        return lessons;
    }
    catch (error) {
        console.log(error);
    }
});
exports.getLessonss = getLessonss;
const editCourses = (data) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let courseId = data.courseId;
        let courseData = yield (0, instructor_repository_1.getSingleCourse)(courseId);
        if (!courseData) {
            throw new Error("No Course Found");
        }
        let updated = yield (0, instructor_repository_1.editCourse)(data);
        return updated;
    }
    catch (error) {
        console.log(error);
    }
});
exports.editCourses = editCourses;
const updateProfiles = (firstname, lastname, mobile, id) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield (0, user_repository_1.findUserById)(id);
        if (!user) {
            throw new Error('User not exists');
        }
        const updatedUser = (0, user_repository_1.instructorUpdateProfile)(firstname, lastname, mobile, id);
        return updatedUser;
    }
    catch (error) {
        throw error;
    }
});
exports.updateProfiles = updateProfiles;
const getInstructorDetailss = (id) => __awaiter(void 0, void 0, void 0, function* () {
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
exports.getInstructorDetailss = getInstructorDetailss;
const getLessonDetail = (id) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let lesson = yield (0, instructor_repository_1.getLessonDetails)(id);
        return lesson;
    }
    catch (error) {
        console.log(error);
    }
});
exports.getLessonDetail = getLessonDetail;
const editLessons = (data) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let courseId = data.courseId;
        let courseData = yield (0, instructor_repository_1.getSingleCourse)(courseId);
        console.log(data);
        if (!courseData) {
            throw new Error("No Course Found");
        }
        let updated = yield (0, instructor_repository_1.editLesson)(data);
        return updated;
    }
    catch (error) {
        console.log(error);
    }
});
exports.editLessons = editLessons;
const deleteLessonById = (id) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let deleted = yield (0, instructor_repository_1.deleteLessonByIds)(id);
        return deleted;
    }
    catch (error) {
        console.log(error);
    }
});
exports.deleteLessonById = deleteLessonById;
const instructorChangeImages = (photo, userId) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield (0, user_repository_1.findUserById)(userId);
        if (!user) {
            throw new Error('User not exists');
        }
        const updatedUser = (0, user_repository_1.instructorUpdatePhoto)(photo, userId);
        return updatedUser;
    }
    catch (error) {
        throw error;
    }
});
exports.instructorChangeImages = instructorChangeImages;
