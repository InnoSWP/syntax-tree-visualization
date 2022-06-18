"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const path_1 = __importDefault(require("path"));
const express_1 = require("express");
const SyntaxTreeService_1 = require("main/service/SyntaxTreeService");
const router = (0, express_1.Router)();
exports.default = router;
var service = new SyntaxTreeService_1.SyntaxTreeService();
router.get('/', (req, res) => {
    console.log('Get request on /');
    res.sendFile(path_1.default.join(__dirname, '..', '..', 'resources', 'templates', 'index.html'));
});
router.get('/edit', (req, res) => {
    console.log('Get request on /edit');
    res.sendFile(path_1.default.join(__dirname, '..', '..', 'resources', 'templates', 'texteditor.html'));
});
router.get('/tree', (req, res) => {
    console.log('Get request on /tree');
    if (req.query['code'] == undefined) {
        console.log('Internal Server Error 500: Arg \'code\' undefined');
        res.status(500);
        res.write('Arg \'code\' undefined');
    }
    else {
        res.json(service.getTreeAndArrayFrom(req.query["code"]));
    }
});
