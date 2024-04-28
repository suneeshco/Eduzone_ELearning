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
exports.getAllRatingCount = exports.calculateOverallRating = exports.getAllRating = exports.getMyRating = exports.courseRating = void 0;
const ratings_model_1 = __importDefault(require("../models/ratings.model"));
const courseRating = (data) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let courseId = data.courseId;
        let studentId = data.studentId;
        let rating = data.rating;
        let review = data.review;
        if (!courseId || !studentId || rating === undefined || review === undefined) {
            throw new Error('Missing required data for course rating.');
        }
        let existingRating = yield ratings_model_1.default.findOne({ courseId, studentId });
        if (existingRating) {
            existingRating.rating = rating;
            existingRating.createdAt = new Date();
            existingRating.review = review;
            yield existingRating.save();
            return existingRating;
        }
        else {
            const newRating = new ratings_model_1.default({
                courseId,
                studentId,
                rating: rating,
                review: review,
                createdAt: new Date()
            });
            yield newRating.save();
            return newRating;
        }
    }
    catch (error) {
        throw error;
    }
});
exports.courseRating = courseRating;
const getMyRating = (courseId, studentId) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let existingRating = yield ratings_model_1.default.findOne({ courseId, studentId });
        if (existingRating) {
            console.log(existingRating);
        }
        else {
            console.log("no existing rating");
        }
        return existingRating;
    }
    catch (error) {
        throw error;
    }
});
exports.getMyRating = getMyRating;
const getAllRating = (courseId) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let existingRating = yield ratings_model_1.default.find({ courseId }).populate('studentId').sort({ createdAt: -1 });
        return existingRating;
    }
    catch (error) {
        throw error;
    }
});
exports.getAllRating = getAllRating;
const calculateOverallRating = (courseId) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const ratings = yield ratings_model_1.default.find({ courseId: courseId });
        if (ratings.length === 0) {
            return 0;
        }
        const totalRating = ratings.reduce((acc, rating) => acc + rating.rating, 0);
        const overallRating = totalRating / ratings.length;
        return overallRating;
    }
    catch (error) {
        console.error("Error calculating overall rating:", error);
        throw error;
    }
});
exports.calculateOverallRating = calculateOverallRating;
const getAllRatingCount = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let ratingCount = yield ratings_model_1.default.countDocuments({});
        return ratingCount;
    }
    catch (error) {
        throw error;
    }
});
exports.getAllRatingCount = getAllRatingCount;
