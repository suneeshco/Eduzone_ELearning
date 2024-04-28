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
exports.updateCategory = exports.getActiveCategory = exports.deleteCategory = exports.getCategory = exports.addCategory = void 0;
const category_repository_1 = require("../repositories/category.repository");
const addCategory = (categoryName) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let status = true;
        let existCategory = yield (0, category_repository_1.findCategoryByName)(categoryName);
        if (existCategory) {
            return "Category exists";
        }
        const category = yield (0, category_repository_1.createCategory)({ categoryName, status });
        return category;
    }
    catch (error) {
        throw error;
    }
});
exports.addCategory = addCategory;
const getCategory = (search) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let categories = yield (0, category_repository_1.getCategories)(search);
        return categories;
    }
    catch (error) {
        throw error;
    }
});
exports.getCategory = getCategory;
const deleteCategory = (id) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let categories = yield (0, category_repository_1.findCategoryById)(id);
        return categories;
    }
    catch (error) {
        throw error;
    }
});
exports.deleteCategory = deleteCategory;
const getActiveCategory = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let categories = yield (0, category_repository_1.getActiveCategories)();
        return categories;
    }
    catch (error) {
        throw error;
    }
});
exports.getActiveCategory = getActiveCategory;
const updateCategory = (value, id) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let existCategory = yield (0, category_repository_1.findCategoryByNameUpdate)(value, id);
        if (existCategory) {
            return "Category exists";
        }
        let categories = yield (0, category_repository_1.findCategoryByIdAndUpdate)(value, id);
        return categories;
    }
    catch (error) {
        throw error;
    }
});
exports.updateCategory = updateCategory;
