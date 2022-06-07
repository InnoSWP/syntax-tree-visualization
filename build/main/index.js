"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
//import JavaScript from "tree-sitter-javascript"
//import Parser from "tree-sitter"
//let parser = new Parser()
//parser.setLanguage(JavaScript)
let app = (0, express_1.default)();
let port = 8080;
// just for test
app.get('/', (req, res, next) => {
    res.writeHead(200, {
        'Content-type': 'text/html;'
    });
    res.write(fs_1.default.readFileSync(path_1.default.join(__dirname, '..', 'resources', 'templates', 'index.html')));
    res.end();
    console.log('Get request on /');
});
app.use(express_1.default.static('src/resources'));
app.listen(port, () => {
    console.log(`Server started on port ${port}`);
});
