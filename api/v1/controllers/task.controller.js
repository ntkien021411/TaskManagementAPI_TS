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
exports.deleted = exports.edit = exports.create = exports.changeMulti = exports.changeStatus = exports.detail = exports.index = void 0;
const task_model_1 = __importDefault(require("../models/task.model"));
const pagination_1 = __importDefault(require("../../../helpers/pagination"));
const search_1 = __importDefault(require("../../../helpers/search"));
const index = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const find = {
        deleted: false,
    };
    if (req.query.status) {
        find.status = req.query.status.toString();
    }
    let objectSearch = (0, search_1.default)(req.query);
    if (req.query.keyword) {
        find.title = objectSearch.regex;
    }
    let countTask = yield task_model_1.default.countDocuments(find);
    let initPagination = {
        limitItem: 2,
        currentPage: 1,
    };
    let objectPagination = (0, pagination_1.default)(req.query, initPagination, countTask);
    const sort = {};
    if (req.query.sortKey && req.query.sortValue) {
        sort[req.query.sortKey.toLocaleString()] = req.query.sortValue;
    }
    const task = yield task_model_1.default.find(find)
        .sort(sort)
        .limit(objectPagination.limitItem)
        .skip(objectPagination.skip);
    res.json(task);
});
exports.index = index;
const detail = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    try {
        const task = yield task_model_1.default.find({
            _id: id,
            deleted: false,
        });
        res.json(task);
    }
    catch (error) {
        res.json("Không tìm thấy!");
    }
});
exports.detail = detail;
const changeStatus = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req.params.id;
        const status = req.body.status;
        yield task_model_1.default.updateOne({
            _id: id,
        }, {
            status: status,
        });
        res.json({
            code: 200,
            message: "Cập nhật trạng thái thành công!",
        });
    }
    catch (error) {
        res.json({
            code: 400,
            message: "Không tồn tại!",
        });
    }
});
exports.changeStatus = changeStatus;
const changeMulti = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const ids = req.body.ids;
        const key = req.body.key;
        const value = req.body.value;
        switch (key) {
            case "status":
                yield task_model_1.default.updateMany({
                    _id: { $in: ids },
                }, {
                    status: value,
                });
                res.json({
                    code: 200,
                    message: "Cập nhật trạng thái thành công!",
                });
                break;
            case "delete":
                yield task_model_1.default.updateMany({
                    _id: { $in: ids },
                }, {
                    deleted: true,
                    deletedAt: new Date(),
                });
                res.json({
                    code: 200,
                    message: "Xóa nhiều nhiệm vụ thành công!",
                });
                break;
            default:
                res.json({
                    code: 400,
                    message: "Không tồn tại!",
                });
                break;
        }
    }
    catch (error) {
        res.json({
            code: 400,
            message: "Không tồn tại!",
        });
    }
});
exports.changeMulti = changeMulti;
const create = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const task = new task_model_1.default(req.body);
        const data = yield task.save();
        res.json({
            code: 200,
            message: "Tạo mới thành công!",
            data: data,
        });
    }
    catch (error) {
        res.json({
            code: 400,
            message: "Tạo mới thất bại!",
        });
    }
});
exports.create = create;
const edit = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req.params.id;
        yield task_model_1.default.updateOne({
            _id: id,
        }, req.body);
        res.json({
            code: 200,
            message: "Cập nhật nhiệm vụ thành công!",
        });
    }
    catch (error) {
        res.json({
            code: 400,
            message: "Cập nhật thất bại!",
        });
    }
});
exports.edit = edit;
const deleted = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req.params.id;
        yield task_model_1.default.updateOne({
            _id: id,
        }, {
            deleted: true,
            deletedAt: new Date(),
        });
        res.json({
            code: 200,
            message: "Xóa thành công!",
        });
    }
    catch (error) {
        res.json({
            code: 400,
            message: "Không tồn tại!",
        });
    }
});
exports.deleted = deleted;
