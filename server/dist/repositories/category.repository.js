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
exports.findCategoryByIdAndUpdate = exports.getActiveCategories = exports.findCategoryById = exports.getCategories = exports.findCategoryByNameUpdate = exports.findCategoryByName = exports.createCategory = void 0;
const category_model_1 = __importDefault(require("../models/category.model"));
const createCategory = (categoryData) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        return yield category_model_1.default.create(categoryData);
    }
    catch (error) {
        throw error;
    }
});
exports.createCategory = createCategory;
const findCategoryByName = (categoryName) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const category = yield category_model_1.default.findOne({ categoryName: { $regex: new RegExp('^' + categoryName + '$', 'i') } });
        return category || null;
    }
    catch (error) {
        throw error;
    }
});
exports.findCategoryByName = findCategoryByName;
const findCategoryByNameUpdate = (categoryName, id) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const category = yield category_model_1.default.findOne({
            _id: { $ne: id },
            categoryName: { $regex: new RegExp('^' + categoryName + '$', 'i') }
        });
        return category || null;
    }
    catch (error) {
        throw error;
    }
});
exports.findCategoryByNameUpdate = findCategoryByNameUpdate;
const getCategories = (search) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let query = {};
        if (search && search.trim() !== '') {
            const searchRegex = new RegExp(search.trim(), 'i');
            query = Object.assign(Object.assign({}, query), { categoryName: searchRegex });
        }
        const categories = yield category_model_1.default.find(query).sort({ _id: -1 });
        return categories;
    }
    catch (error) {
        throw error;
    }
});
exports.getCategories = getCategories;
const findCategoryById = (id) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const category = yield category_model_1.default.findOne({ _id: id });
        if (!category) {
            throw new Error('Category not found');
        }
        category.status = !category.status;
        yield category.save();
        return category;
    }
    catch (error) {
        throw error;
    }
});
exports.findCategoryById = findCategoryById;
const getActiveCategories = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const categories = yield category_model_1.default.find({ status: true });
        return categories;
    }
    catch (error) {
        throw error;
    }
});
exports.getActiveCategories = getActiveCategories;
const findCategoryByIdAndUpdate = (value, id) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const category = yield category_model_1.default.findOne({ _id: id });
        if (!category) {
            throw new Error('Category not found');
        }
        category.categoryName = value;
        yield category.save();
        return category;
    }
    catch (error) {
        throw error;
    }
});
exports.findCategoryByIdAndUpdate = findCategoryByIdAndUpdate;
