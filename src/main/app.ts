import express from "express"
import {logger} from "./utils/usefullFunctions";
import treeRouter from "./routers/treeRouter";
import arrayRouter from "./routers/arrayRouter";
import viewRouter from "./routers/viewRouter";
import utilsRouter from "./routers/utilsRouter";
import bodyParser from "body-parser";

const app = express()

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json())
app.use(bodyParser.raw());
app.use(treeRouter)
app.use(viewRouter)
app.use(arrayRouter)
app.use(utilsRouter)
app.use(logger)
app.use(express.json())
app.use(express.static('src/resources/static'))

export default app
