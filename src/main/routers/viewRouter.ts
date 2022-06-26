import path from "path";
import {Router} from "express";

const viewRouter = Router()

viewRouter.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '..', '..', 'resources', 'templates', 'index.html'))
})

viewRouter.get('/edit', (req, res) => {
    res.sendFile(path.join(__dirname, '..', '..', 'resources', 'templates', 'texteditor.html'))
})

export default viewRouter
