import fs from "fs";
import path from "path";
import {Router} from "express"
import {SyntaxTreeService} from "main/service/SyntaxTreeService";

const router = Router()

export default router

var service = new SyntaxTreeService()

router.get('/', (req, res) => {
    console.log('Get request on /')
    res.sendFile(path.join(__dirname, '..', '..', 'resources', 'templates', 'index.html'))
})

router.get('/edit', (req, res) => {
    console.log('Get request on /edit')
    res.sendFile(path.join(__dirname, '..', '..', 'resources', 'templates', 'texteditor.html'))
})

router.get('/tree', (req, res) => {
    console.log('Get request on /tree')
    if (req.query['code'] == undefined) {
        console.log('Internal Server Error 500: Arg \'code\' undefined')
        res.status(500)
        res.write('Arg \'code\' undefined')
    } else {
        res.json(service.getTreeFrom(req.query["code"] as string))
    }
})
router.post('/tree', (req, res) => {
    console.log('Post request on /tree')
    console.log(req.body)
    // if (req.query['code'] == undefined) {
    //     console.log('Internal Server Error 500: Arg \'code\' undefined')
    //     res.status(500)
    //     res.write('Arg \'code\' undefined')
    // } else {
    // }
    // res.json(service.getTreeFrom(req.query["code"] as string))
})
router.get('/array', (req, res) => {
    console.log('Get request on /array')
    if (req.query['code'] == undefined) {
        console.log('Internal Server Error 500: Arg \'code\' undefined')
        res.status(500)
        res.write('Arg \'code\' undefined')
    } else {
        res.json(service.getArrayFrom(req.query["code"] as string))
        console.log(service.getArrayFrom(req.query["code"] as string))
    }
})

