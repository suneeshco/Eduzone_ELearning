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
exports.getActiveCategories = exports.updateCategories = exports.deleteCategories = exports.getCategories = exports.addCategories = void 0;
const category_service_1 = require("../../services/category.service");
const addCategories = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { categoryName } = req.body;
        const status = true;
        const category = yield (0, category_service_1.addCategory)(categoryName);
        res.send(category);
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Server Error' });
    }
});
exports.addCategories = addCategories;
const getCategories = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let search = req.query.search;
        const categories = yield (0, category_service_1.getCategory)(search);
        res.send(categories);
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Server Error' });
    }
});
exports.getCategories = getCategories;
const deleteCategories = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.body;
        const deletedcategories = yield (0, category_service_1.deleteCategory)(id);
        res.send(deletedcategories);
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Server Error' });
    }
});
exports.deleteCategories = deleteCategories;
const updateCategories = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { value, id } = req.body;
        const categories = yield (0, category_service_1.updateCategory)(value, id);
        res.send(categories);
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Server Error' });
    }
});
exports.updateCategories = updateCategories;
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
