import {Router} from "express";
import {syntaxTreeService as service} from "../service/syntaxTreeService";

const treeRouter = Router()

treeRouter.get('/tree', (req, res) => {
    if (req.query['code'] == undefined) {
        console.log('Internal Server Error 500: Arg \'code\' undefined')
        res.status(500)
        res.write('Arg \'code\' undefined')
        res.end()
    } else {
        res.json(service.getTreeFrom(req.query["code"] as string))
    }
})

treeRouter.post('/tree', (req, res) => {
    if (req.body.code == undefined) {
        console.log('Internal Server Error 500: Arg \'code\' undefined')
        res.status(500)
        res.write('Arg \'code\' undefined')
        res.end()
    } else {
        res.json(service.getTreeFrom(req.body.code as string))
    }
})

export default treeRouter