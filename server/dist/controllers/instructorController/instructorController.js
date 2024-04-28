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
exports.instructorChangeImage = exports.deleteLesson = exports.editLesson = exports.getLessonDetails = exports.getInstructorDetails = exports.updateProfile = exports.editCourse = exports.getActiveCategories = exports.getLessons = exports.addLesson = exports.getSingleCourse = exports.getCourses = exports.addCourse = void 0;
const category_service_1 = require("../../services/category.service");
const instructor_service_1 = require("../../services/instructor.service");
const addCourse = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const courseData = req.body;
        console.log(req.body.data);
        const course = yield (0, instructor_service_1.addCourses)(courseData);
        res.send(course);
    }
    catch (error) {
        console.error(error);
        res.status(500).send({ message: "Error adding course" });
    }
});
exports.addCourse = addCourse;
const getCourses = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req.params.id;
        console.log(id);
        const courses = yield (0, instructor_service_1.getCoursess)(id);
        res.send(courses);
    }
    catch (error) {
        console.error(error);
        res.status(500).send({ message: "Error adding course" });
    }
});
exports.getCourses = getCourses;
const getSingleCourse = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req.params.id;
        console.log(id);
        const courses = yield (0, instructor_service_1.getSingleCoursess)(id);
        res.send(courses);
    }
    catch (error) {
        console.error(error);
        res.status(500).send({ message: "Error adding course" });
    }
});
exports.getSingleCourse = getSingleCourse;
const addLesson = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const lessonData = req.body;
        const lesson = yield (0, instructor_service_1.addLessons)(lessonData);
        res.send(lesson);
    }
    catch (error) {
        console.error(error);
        res.status(500).send({ message: "Error adding lesson" });
    }
});
exports.addLesson = addLesson;
const getLessons = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req.params.id;
        const lessons = yield (0, instructor_service_1.getLessonss)(id);
        res.send(lessons);
    }
    catch (error) {
        console.error(error);
        res.status(500).send({ message: "Error " });
    }
});
exports.getLessons = getLessons;
const getActiveCategories = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const categories = yield (0, category_service_1.getActiveCategory)();
        res.send(categories);
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Server Error' });
    }
});
exports.getActiveCategories = getActiveCategories;
const editCourse = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const courseData = req.body;
        console.log(req.body);
        const course = yield (0, instructor_service_1.editCourses)(courseData);
        res.send(course);
    }
    catch (error) {
        console.error(error);
        res.status(500).send({ message: "Error editing course" });
    }
});
exports.editCourse = editCourse;
const updateProfile = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { firstname, lastname, mobile, id } = req.body;
        const user = yield (0, instructor_service_1.updateProfiles)(firstname, lastname, mobile, id);
        res.send({ user });
    }
    catch (error) {
        console.log("error", error);
        res.status(500).send({ message: 'Server Error' });
    }
});
exports.updateProfile = updateProfile;
const getInstructorDetails = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req.params.id;
        const details = yield (0, instructor_service_1.getInstructorDetailss)(id);
        res.send(details);
    }
    catch (error) {
        console.error(error);
        res.status(500).send({ message: "Error " });
    }
});
exports.getInstructorDetails = getInstructorDetails;
const getLessonDetails = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req.params.id;
        const lesson = yield (0, instructor_service_1.getLessonDetail)(id);
        res.send(lesson);
    }
    catch (error) {
        console.error(error);
        res.status(500).send({ message: "Error adding course" });
    }
});
exports.getLessonDetails = getLessonDetails;
const editLesson = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const lessonData = req.body;
        console.log(req.body);
        const course = yield (0, instructor_service_1.editLessons)(lessonData);
        res.send(course);
    }
    catch (error) {
        console.error(error);
        res.status(500).send({ message: "Error editing course" });
    }
});
exports.editLesson = editLesson;
const deleteLesson = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const lessonId = req.params.id;
        yield (0, instructor_service_1.deleteLessonById)(lessonId);
        res.status(200).json({ message: "Lesson deleted successfully" });
    }
    catch (error) {
        console.error("Error deleting lesson:", error);
        res.status(500).json({ message: "Error deleting lesson" });
    }
});
exports.deleteLesson = deleteLesson;
const instructorChangeImage = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { photo, userId } = req.body;
        const user = yield (0, instructor_service_1.instructorChangeImages)(photo, userId);
        res.send({ user });
    }
    catch (error) {
        console.log("error", error);
        res.status(500).send({ message: 'Server Error' });
    }
});
exports.instructorChangeImage = instructorChangeImage;
