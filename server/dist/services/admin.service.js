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
exports.changeInstructorStatuss = exports.getInstructorLists = exports.changeCourseStatuss = exports.changeStudentStatuss = exports.getStudentLists = void 0;
const user_repository_1 = require("../repositories/user.repository");
const instructor_repository_1 = require("../repositories/instructor.repository");
const user_repository_2 = require("../repositories/user.repository");
const course_repository_1 = require("../repositories/course.repository");
const getStudentLists = (search) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let students = yield (0, user_repository_1.getStudentList)(search);
        return students;
    }
    catch (error) {
        throw error;
    }
});
exports.getStudentLists = getStudentLists;
const changeStudentStatuss = (id) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let data = yield (0, user_repository_1.changeStudentStatus)(id);
        return data;
    }
    catch (error) {
        throw error;
    }
});
exports.changeStudentStatuss = changeStudentStatuss;
const changeCourseStatuss = (id) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let data = yield (0, course_repository_1.changeCourseStatus)(id);
        return data;
    }
    catch (error) {
        throw error;
    }
});
exports.changeCourseStatuss = changeCourseStatuss;
const getInstructorLists = (search) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let instructors = yield (0, user_repository_2.getInstructorList)(search);
        return instructors;
    }
    catch (error) {
        throw error;
    }
});
exports.getInstructorLists = getInstructorLists;
const changeInstructorStatuss = (id) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let data = yield (0, instructor_repository_1.changeInstructorStatus)(id);
        return data;
    }
    catch (error) {
        throw error;
    }
});
exports.changeInstructorStatuss = changeInstructorStatuss;
