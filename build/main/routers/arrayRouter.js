"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const syntaxTreeService_1 = require("../service/syntaxTreeService");
const arrayRouter = (0, express_1.Router)();
arrayRouter.get('/array', (req, res) => {
    console.log('Get request on /array');
    if (req.query['code'] == undefined) {
        console.log('Internal Server Error 500: Arg \'code\' undefined');
        res.status(500);
        res.write('Arg \'code\' undefined');
    }
    else {
        res.json(syntaxTreeService_1.syntaxTreeService.getArrayFrom(req.query["code"]));
        // console.log(service.getArrayFrom(req.query["code"] as string))
    }
});
arrayRouter.post('/array', (req, res) => {
    if (req.body.code == undefined) {
        console.log('Internal Server Error 500: Arg \'code\' undefined');
        res.status(500);
        res.write('Arg \'code\' undefined');
        res.end();
    }
    else {
        res.json(syntaxTreeService_1.syntaxTreeService.getArrayFrom(req.body.code));
    }
});
exports.default = arrayRouter;
