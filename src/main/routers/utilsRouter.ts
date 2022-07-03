import {Router} from "express";
import {saveService as service} from "../service/save";

const utilsRouter = Router()

utilsRouter.post('/save', (req, res) => {
    if (req.body.code == undefined) {
        console.log('Internal Server Error 500: Arg \'code\' undefined')
        res.status(500)
        res.write('Arg \'code\' undefined')
        res.end()
    } else {
        res.json(service.save(req.body.code as string))
    }
})

export default utilsRouter