import express from "express"
import path from "path"
import { SyntaxTreeService } from './service/SyntaxTreeService'

export let app = express()

app.use(express.static('src/resources/static'))

var service = new SyntaxTreeService()

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'resources', 'templates', 'index.html'))
    console.log('Get request on /')
})

app.get('/index', (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'resources', 'templates', 'texteditor.html'))
    console.log('Get request on /index')
})

app.post('/tree', (req, res) => {
    // let ans = service.getTreeFrom('let x = 1; console.log(x);')
    console.log(req.body)
    // let ans = service.getTreeFrom(req.body.code)
    // res.write(ans.ansTree)
    res.json({code : "XAXAX"})
    res.end()
    console.log('Post request on /tree')
})
