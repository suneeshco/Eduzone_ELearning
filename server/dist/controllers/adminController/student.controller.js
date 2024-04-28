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
exports.changeStudentStatus = exports.getStudentList = void 0;
const admin_service_1 = require("../../services/admin.service");
const getStudentList = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let search = req.query.search;
        const students = yield (0, admin_service_1.getStudentLists)(search);
        res.send(students);
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Server Error' });
    }
});
exports.getStudentList = getStudentList;
const changeStudentStatus = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.body;
        const data = yield (0, admin_service_1.changeStudentStatuss)(id);
        res.send(data);
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Server Error' });
    }
});
exports.changeStudentStatus = changeStudentStatus;
