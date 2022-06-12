"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.app = void 0;
const express_1 = __importDefault(require("express"));
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const SyntaxTreeService_1 = require("main/service/SyntaxTreeService");
exports.app = (0, express_1.default)();
exports.app.use(express_1.default.static('src/resources/static'));
let servie = new SyntaxTreeService_1.SyntaxTreeService();
exports.app.get('/', (req, res) => {
    res.writeHead(200, {
        'Content-type': 'text/html;'
    });
    res.write(fs_1.default.readFileSync(path_1.default.join(__dirname, '..', 'resources', 'templates', 'index.html')));
    res.end();
    console.log('Get request on /');
});
exports.app.get('/index', (req, res) => {
    res.writeHead(200, {
        'Content-type': 'text/html;'
    });
    res.write(fs_1.default.readFileSync(path_1.default.join(__dirname, '..', 'resources', 'templates', 'index.html')));
    res.end();
    console.log('Get request on /index');
});
exports.app.post('/tree', (req, res) => {
    res.writeHead(200, {
        'Content-type': 'text/html;'
    });
    res.write(servie.getTreeFrom('let x = 1; console.log(x);'));
    // res.write(servie.getTreeFrom(req.body.code))
    res.end();
    console.log('Post request on /tree');
});
