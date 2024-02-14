"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateRandomSNumber = exports.generateRandomString = void 0;
const generateRandomString = (length) => {
    const characters = "ABCDEFGHJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    let result = "";
    for (let index = 0; index < length; index++) {
        result += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    return result;
};
exports.generateRandomString = generateRandomString;
const generateRandomSNumber = (length) => {
    const characters = "0123456789";
    let result = "";
    for (let index = 0; index < length; index++) {
        result += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    return result;
};
exports.generateRandomSNumber = generateRandomSNumber;
