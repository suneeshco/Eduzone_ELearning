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
exports.getAllEnrolledStudentss = exports.getSalesDatasInstructor = exports.getSalesDatas = exports.getOrderDetailss = exports.createOrder = void 0;
const course_repository_1 = require("../repositories/course.repository");
const instructor_repository_1 = require("../repositories/instructor.repository");
const order_repository_1 = require("../repositories/order.repository");
const user_repository_1 = require("../repositories/user.repository");
const createOrder = (data) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const timestamp = Date.now();
        const orderId = `ORD-${timestamp}`;
        const orderDataWithId = Object.assign(Object.assign({}, data), { orderId });
        const order = yield (0, order_repository_1.createOrders)(orderDataWithId);
        return order;
    }
    catch (error) {
        throw error;
    }
});
exports.createOrder = createOrder;
const getOrderDetailss = (instructorId, search) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let students = yield (0, order_repository_1.getOrderDetails)(instructorId, search);
        return students;
    }
    catch (error) {
        throw error;
    }
});
exports.getOrderDetailss = getOrderDetailss;
const getSalesDatas = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let { salesData, ordersCount } = yield (0, order_repository_1.getSalesData)();
        let totalAmount = yield (0, order_repository_1.getTotalAmount)();
        let totalCourses = yield (0, course_repository_1.getAllCourseAd)('');
        let totalStudents = yield (0, user_repository_1.getStudentList)('');
        let topCourses = yield (0, course_repository_1.getAllCourse)('', 'rating', '');
        return { salesData, totalAmount, totalCourses, totalStudents, ordersCount, topCourses };
    }
    catch (error) {
        throw error;
    }
});
exports.getSalesDatas = getSalesDatas;
const getSalesDatasInstructor = (id) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let { salesData, ordersCount } = yield (0, order_repository_1.getSalesDataForInstructor)(id);
        let totalAmount = yield (0, order_repository_1.getTotalAmountInstructor)(id);
        let totalCourses = yield (0, instructor_repository_1.getCourse)(id);
        let totalStudents = yield (0, order_repository_1.getTotalStudentInstructor)(id);
        let topCourses = yield (0, order_repository_1.getCourseByRatingInstructor)(id);
        return { salesData, totalAmount, totalCourses, totalStudents, ordersCount, topCourses };
    }
    catch (error) {
        throw error;
    }
});
exports.getSalesDatasInstructor = getSalesDatasInstructor;
const getAllEnrolledStudentss = (courseId) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let students = yield (0, order_repository_1.getAllEnrolledStudents)(courseId);
        return students;
    }
    catch (error) {
        throw error;
    }
});
exports.getAllEnrolledStudentss = getAllEnrolledStudentss;
