"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const syntaxTreeService_1 = require("../service/syntaxTreeService");
const treeRouter = (0, express_1.Router)();
treeRouter.get('/tree', (req, res) => {
    if (req.query['code'] == undefined) {
        console.log('Internal Server Error 500: Arg \'code\' undefined');
        res.status(500);
        res.write('Arg \'code\' undefined');
        res.end();
    }
    else {
        res.json(syntaxTreeService_1.syntaxTreeService.getTreeFrom(req.query["code"]));
    }
});
treeRouter.post('/tree', (req, res) => {
    if (req.body.code == undefined) {
        console.log('Internal Server Error 500: Arg \'code\' undefined');
        res.status(500);
        res.write('Arg \'code\' undefined');
        res.end();
    }
    else {
        res.json(syntaxTreeService_1.syntaxTreeService.getTreeFrom(req.body.code));
    }
});
exports.default = treeRouter;
