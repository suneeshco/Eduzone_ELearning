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
exports.getOverviews = exports.getAllCoursesAdmin = exports.getEnrolledCoursess = exports.getAllCoursess = void 0;
const course_repository_1 = require("../repositories/course.repository");
const order_repository_1 = require("../repositories/order.repository");
const rating_repository_1 = require("../repositories/rating.repository");
const user_repository_1 = require("../repositories/user.repository");
const getAllCoursess = (search, sort, categories) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let courses = yield (0, course_repository_1.getAllCourse)(search, sort, categories);
        return courses;
    }
    catch (error) {
        console.log(error);
    }
});
exports.getAllCoursess = getAllCoursess;
const getEnrolledCoursess = (studentId) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let courses = yield (0, order_repository_1.getStudentOrderDetails)(studentId);
        return courses;
    }
    catch (error) {
        console.log(error);
    }
});
exports.getEnrolledCoursess = getEnrolledCoursess;
const getAllCoursesAdmin = (search) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let courses = yield (0, course_repository_1.getAllCourseAd)(search);
        return courses;
    }
    catch (error) {
        console.log(error);
    }
});
exports.getAllCoursesAdmin = getAllCoursesAdmin;
const getOverviews = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let courses = yield (0, course_repository_1.getValidCourses)();
        let instructors = yield (0, user_repository_1.getAllInstructorList)();
        let instructor = instructors.length;
        let reviews = yield (0, rating_repository_1.getAllRatingCount)();
        return { courses, instructor, reviews };
    }
    catch (error) {
        console.log(error);
    }
});
exports.getOverviews = getOverviews;
