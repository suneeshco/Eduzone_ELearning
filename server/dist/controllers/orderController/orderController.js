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
exports.getAllEnrolledStudents = exports.getSalesDataInstructor = exports.getSalesData = exports.getOrderDetails = void 0;
const order_service_1 = require("../../services/order.service");
const getOrderDetails = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let instructorId = req.query.instructorId;
        let search = req.query.search;
        const instructors = search ? yield (0, order_service_1.getOrderDetailss)(instructorId, search) : yield (0, order_service_1.getOrderDetailss)(instructorId, "");
        res.send(instructors);
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Server Error' });
    }
});
exports.getOrderDetails = getOrderDetails;
const getSalesData = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        console.log("hai");
        const { salesData, totalAmount, totalCourses, totalStudents, ordersCount, topCourses } = yield (0, order_service_1.getSalesDatas)();
        let totalCourse = totalCourses.length;
        let totalStudent = totalStudents.length;
        let topCourse = topCourses;
        if (topCourses.length > 5) {
            topCourse = topCourses.slice(0, 5);
        }
        const b = {
            salesData, totalAmount, totalCourse, totalStudent, ordersCount, topCourse
        };
        console.log(b);
        res.send({ salesData, totalAmount, totalCourse, totalStudent, ordersCount, topCourse });
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Server Error' });
    }
});
exports.getSalesData = getSalesData;
const getSalesDataInstructor = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req.params.id;
        const { salesData, totalAmount, totalCourses, totalStudents, ordersCount, topCourses } = yield (0, order_service_1.getSalesDatasInstructor)(id);
        let totalCourse = totalCourses.length;
        let totalStudent = totalStudents;
        let topCourse = topCourses;
        if (topCourses.length > 5) {
            topCourse = topCourses.slice(0, 5);
        }
        res.send({ salesData, totalAmount, totalCourse, totalStudent, ordersCount, topCourse });
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Server Error' });
    }
});
exports.getSalesDataInstructor = getSalesDataInstructor;
const getAllEnrolledStudents = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let courseId = req.query.courseId;
        const data = yield (0, order_service_1.getAllEnrolledStudentss)(courseId);
        res.send(data);
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Server Error' });
    }
});
exports.getAllEnrolledStudents = getAllEnrolledStudents;
