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
exports.getValidCourses = exports.getProgress = exports.createProgress = exports.findProgress = exports.changeCourseStatus = exports.getAllCourseAd = exports.updateCourseRating = exports.getAllCourse = void 0;
const course_model_1 = __importDefault(require("../models/course.model"));
const studentProgress_model_1 = __importDefault(require("../models/studentProgress.model"));
const category_model_1 = __importDefault(require("../models/category.model"));
const getAllCourse = (search, sort, categories) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let query = { isApproved: true };
        if (search && search.trim() !== '') {
            const searchRegex = new RegExp(search.trim(), 'i');
            query = Object.assign(Object.assign({}, query), { courseName: searchRegex });
        }
        let sortCriteria = {};
        if (sort === '1') {
            sortCriteria = Object.assign(Object.assign({}, sortCriteria), { courseFee: 1 });
        }
        else if (sort === '-1') {
            sortCriteria = Object.assign(Object.assign({}, sortCriteria), { courseFee: -1 });
        }
        else if (sort === 'rating') {
            sortCriteria = Object.assign(Object.assign({}, sortCriteria), { rating: -1 });
        }
        let activeCategories = yield category_model_1.default.find({ status: true }).distinct('_id');
        if (categories && categories.length > 0) {
            let categ = categories.split(',');
            query = Object.assign(Object.assign({}, query), { category: { $in: categ } });
        }
        else {
            let cate = activeCategories;
            query = Object.assign(Object.assign({}, query), { category: { $in: cate } });
        }
        return yield course_model_1.default.find(query).populate('instructorId').sort(sortCriteria);
    }
    catch (error) {
        throw error;
    }
});
exports.getAllCourse = getAllCourse;
const updateCourseRating = (courseId, rating) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const updatedCourse = yield course_model_1.default.findByIdAndUpdate(courseId, { rating: rating });
        if (updatedCourse) {
            return updatedCourse;
        }
        else {
            throw new Error(`Course with ID ${courseId} not found`);
        }
    }
    catch (error) {
        throw error;
    }
});
exports.updateCourseRating = updateCourseRating;
const getAllCourseAd = (search) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let query = {};
        if (search && search.trim() !== '') {
            const searchRegex = new RegExp(search.trim(), 'i');
            query = Object.assign(Object.assign({}, query), { courseName: searchRegex });
        }
        return yield course_model_1.default.find(query).populate('instructorId').sort({ createdAt: -1 });
    }
    catch (error) {
        throw error;
    }
});
exports.getAllCourseAd = getAllCourseAd;
const changeCourseStatus = (id) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const course = yield course_model_1.default.findOne({ _id: id });
        if (!course) {
            throw new Error('Course not found');
        }
        course.isApproved = !course.isApproved;
        yield course.save();
        return course;
    }
    catch (error) {
        throw error;
    }
});
exports.changeCourseStatus = changeCourseStatus;
const findProgress = (studentId, courseId, lessonId) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const course = yield studentProgress_model_1.default.findOne({ studentId: studentId, courseId: courseId, lessonId: lessonId });
        return course;
    }
    catch (error) {
        throw error;
    }
});
exports.findProgress = findProgress;
const createProgress = (studentId, courseId, lessonId) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const progress = yield studentProgress_model_1.default.create({
            studentId,
            courseId,
            lessonId,
            isCompleted: true
        });
        yield progress.save();
        return progress;
    }
    catch (error) {
        throw error;
    }
});
exports.createProgress = createProgress;
const getProgress = (courseId, studentId) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const count = yield studentProgress_model_1.default.countDocuments({ courseId, studentId, isCompleted: true });
        const progress = yield studentProgress_model_1.default.find({ courseId, studentId, isCompleted: true });
        return { count, progress };
    }
    catch (error) {
        throw error;
    }
});
exports.getProgress = getProgress;
const getValidCourses = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const approvedCoursesCount = yield course_model_1.default.countDocuments({ isApproved: true });
        return approvedCoursesCount;
    }
    catch (error) {
        throw error;
    }
});
exports.getValidCourses = getValidCourses;
