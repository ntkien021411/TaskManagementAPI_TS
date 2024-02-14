"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const pagination = (query, objectPagination, countRecords) => {
    if (query.page) {
        objectPagination.currentPage = parseInt(query.page);
    }
    if (query.limit) {
        objectPagination.limitItem = parseInt(query.limit);
    }
    objectPagination.skip =
        (objectPagination.currentPage - 1) * objectPagination.limitItem;
    let totalPage = Math.ceil(countRecords / objectPagination.limitItem);
    objectPagination.totalPage = totalPage;
    return objectPagination;
};
exports.default = pagination;
