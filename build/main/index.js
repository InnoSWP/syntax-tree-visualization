"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
let app = (0, express_1.default)();
// just for test
app.get('/users', (req, res, next) => {
    res.writeHead(200, {
        'Content-type': 'text/html;'
    });
    res.write('<h1 style="color: red; text-align: center">Hello Nikolay!!!</h1><img src="http://localhost:8080/cow.gif">');
    res.end();
    console.log('Get request on /users');
});
app.use(express_1.default.static('src/resources'));
app.listen(8080, () => {
    console.log("Server started on port 8080");
});
