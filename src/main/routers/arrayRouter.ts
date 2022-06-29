import {Router} from "express";
import {syntaxTreeService as service} from "../service/syntaxTreeService";

const arrayRouter = Router()

arrayRouter.get('/array', (req, res) => {
    console.log('Get request on /array')
    if (req.query['code'] == undefined) {
        console.log('Internal Server Error 500: Arg \'code\' undefined')
        res.status(500)
        res.write('Arg \'code\' undefined')
    } else {
        res.json(service.getArrayFrom(req.query["code"] as string))
        // console.log(service.getArrayFrom(req.query["code"] as string))
    }
})

arrayRouter.post('/array', (req, res) => {
    if (req.body.code == undefined) {
        console.log('Internal Server Error 500: Arg \'code\' undefined')
        res.status(500)
        res.write('Arg \'code\' undefined')
        res.end()
    } else {
        res.json(service.getArrayFrom(req.body.code as string))
    }
})

export default arrayRouter