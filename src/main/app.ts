import express from "express"
import path from "path"
import router from "main/controllers/syntaxTreeController"

const app = express()
export default app

app.use(router)
app.use(express.static('src/resources/static'))

