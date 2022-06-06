"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
let app = (0, express_1.default)();
function start() {
    app.listen(8080, () => {
        console.log("Server started on port 8080");
    });
}
function addUrl(url, callback) {
    app.get(url, callback);
}
