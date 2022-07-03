import path from "path";
import {Router} from "express";
import {templateEngine} from "../utils/templateEngine"
import {saveService} from "../service/save"
import * as fs from "fs";

const viewRouter = Router()

viewRouter.get('/index', (req, res) => {
    res.sendFile(path.join(__dirname, '..', '..', 'resources', 'templates', 'index.html'))
})

viewRouter.get('/', (req, res) => {
    let map = new Map<String, Object>()
    if (req.query['hash'] != undefined) {
        map.set('default_text', saveService.get(req.query['hash'].toString()))
    } else {
        map.set('default_text', '')
    }
    res.send(
        templateEngine(
            fs.readFileSync(path.join(__dirname, '..', '..', 'resources', 'templates', 'texteditor.html'), 'utf-8'),
            map
        )
    )
})

export default viewRouter
