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
exports.getAllEnrolledStudents = exports.getSalesDataForInstructor = exports.getCourseByRatingInstructor = exports.getTotalStudentInstructor = exports.getTotalAmountInstructor = exports.getTotalAmount = exports.getSalesData = exports.getStudentOrderDetails = exports.getOrderDetails = exports.createOrders = void 0;
const order_model_1 = __importDefault(require("../models/order.model"));
const course_model_1 = __importDefault(require("../models/course.model"));
const mongoose_1 = __importDefault(require("mongoose"));
const createOrders = (data) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        console.log(data);
        const existingOrder = yield order_model_1.default.findOne({ studentId: data.studentId, courseId: data.courseId });
        if (!existingOrder) {
            const order = yield order_model_1.default.create({
                studentId: data.studentId,
                instructorId: data.instructorId,
                courseId: data.courseId,
                amount: data.amount,
                orderId: data.orderId
            });
            yield order.save();
            const course = yield course_model_1.default.findByIdAndUpdate(data.courseId, {
                $push: { students: data.studentId }
            });
        }
    }
    catch (error) {
        throw error;
    }
});
exports.createOrders = createOrders;
const getOrderDetails = (instructorId, search) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let query = { instructorId: instructorId };
        if (search && search.trim() !== '') {
            const searchRegex = new RegExp(search.trim(), 'i');
            const orders = yield order_model_1.default.find(query).populate('studentId').populate('courseId').sort({ createdAt: -1 });
            const filteredOrders = orders.filter(order => { var _a; return (_a = order === null || order === void 0 ? void 0 : order.courseId) === null || _a === void 0 ? void 0 : _a.courseName.match(searchRegex); });
            return filteredOrders;
        }
        else {
            const orders = yield order_model_1.default.find(query).populate('studentId').populate('courseId').sort({ createdAt: -1 });
            return orders;
        }
    }
    catch (error) {
        throw error;
    }
});
exports.getOrderDetails = getOrderDetails;
const getStudentOrderDetails = (studentId) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let query = { studentId: studentId };
        const orders = yield order_model_1.default.find(query).populate('studentId').populate('courseId').populate('instructorId').sort({ createdAt: -1 });
        return orders;
    }
    catch (error) {
        throw error;
    }
});
exports.getStudentOrderDetails = getStudentOrderDetails;
const getSalesData = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const currentYear = new Date().getFullYear();
        const startOfYear = new Date(currentYear, 0, 1);
        const endOfYear = new Date(currentYear, 11, 31, 23, 59, 59);
        const ordersCount = yield order_model_1.default.countDocuments({});
        const orders = yield order_model_1.default.aggregate([
            {
                $match: {
                    createdAt: { $gte: startOfYear, $lte: endOfYear }
                }
            },
            {
                $group: {
                    _id: { $month: "$createdAt" },
                    count: { $sum: 1 }
                }
            },
            {
                $sort: { "_id": 1 }
            }
        ]);
        const salesData = Array.from({ length: 12 }, (_, index) => {
            const monthOrder = orders.find(order => order._id === index + 1);
            return monthOrder ? monthOrder.count : 0;
        });
        return { salesData, ordersCount };
    }
    catch (error) {
        throw error;
    }
});
exports.getSalesData = getSalesData;
const getTotalAmount = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const totalAmount = yield order_model_1.default.aggregate([
            {
                $group: {
                    _id: null,
                    totalAmount: { $sum: "$amount" }
                }
            }
        ]);
        return totalAmount.length > 0 ? totalAmount[0].totalAmount : 0;
    }
    catch (error) {
        throw error;
    }
});
exports.getTotalAmount = getTotalAmount;
const getTotalAmountInstructor = (id) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const objectId = new mongoose_1.default.Types.ObjectId(id);
        const pipeline = [
            {
                $match: {
                    instructorId: objectId
                }
            },
            {
                $group: {
                    _id: null,
                    totalAmount: { $sum: "$amount" }
                }
            }
        ];
        const totalAmount = yield order_model_1.default.aggregate(pipeline);
        console.log('total', totalAmount);
        return totalAmount.length > 0 ? totalAmount[0].totalAmount : 0;
    }
    catch (error) {
        throw error;
    }
});
exports.getTotalAmountInstructor = getTotalAmountInstructor;
const getTotalStudentInstructor = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const objectId = new mongoose_1.default.Types.ObjectId(id);
    try {
        const totalAmount = yield order_model_1.default.aggregate([
            {
                $match: {
                    instructorId: objectId
                }
            },
            {
                $group: {
                    _id: "$studentId",
                    count: { $sum: 1 }
                }
            },
            {
                $group: {
                    _id: null,
                    totalStudents: { $sum: 1 }
                }
            }
        ]);
        return totalAmount.length > 0 ? totalAmount[0].totalStudents : 0;
    }
    catch (error) {
        throw error;
    }
});
exports.getTotalStudentInstructor = getTotalStudentInstructor;
const getCourseByRatingInstructor = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const objectId = new mongoose_1.default.Types.ObjectId(id);
    try {
        const courses = yield course_model_1.default.find({ instructorId: objectId }).sort({ rating: -1 });
        return courses;
    }
    catch (error) {
        throw error;
    }
});
exports.getCourseByRatingInstructor = getCourseByRatingInstructor;
const getSalesDataForInstructor = (id) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const currentYear = new Date().getFullYear();
        const startOfYear = new Date(currentYear, 0, 1);
        const endOfYear = new Date(currentYear, 11, 31, 23, 59, 59);
        const ordersCount = yield order_model_1.default.countDocuments({
            instructorId: new mongoose_1.default.Types.ObjectId(id)
        });
        const orders = yield order_model_1.default.aggregate([
            {
                $match: {
                    instructorId: new mongoose_1.default.Types.ObjectId(id),
                    createdAt: { $gte: startOfYear, $lte: endOfYear }
                }
            },
            {
                $group: {
                    _id: { $month: "$createdAt" },
                    count: { $sum: 1 }
                }
            },
            {
                $sort: { "_id": 1 }
            }
        ]);
        const salesData = Array.from({ length: 12 }, (_, index) => {
            const monthOrder = orders.find(order => order._id === index + 1);
            return monthOrder ? monthOrder.count : 0;
        });
        return { salesData, ordersCount };
    }
    catch (error) {
        throw error;
    }
});
exports.getSalesDataForInstructor = getSalesDataForInstructor;
const getAllEnrolledStudents = (courseId) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let query = { courseId: courseId };
        const orders = yield order_model_1.default.find(query).populate('studentId').sort({ createdAt: -1 });
        return orders;
    }
    catch (error) {
        throw error;
    }
});
exports.getAllEnrolledStudents = getAllEnrolledStudents;
