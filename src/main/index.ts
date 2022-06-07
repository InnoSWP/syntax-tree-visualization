import express from "express"
import fs from "fs"
import path from "path"

let app = express()
let port = process.env["PORT"] ?? 8080

// just for test
app.get('/', (req, res, next) => {
    res.writeHead(200, {
        'Content-type': 'text/html;'
    })
    res.write(fs.readFileSync(path.join(__dirname, '..', 'resources', 'templates', 'texteditor.html')))
    res.end()
    console.log('Get request on /')
})
app.use(express.static('src'))

app.listen(port, () => {
    console.log(`Server started on port ${port}`)
})
