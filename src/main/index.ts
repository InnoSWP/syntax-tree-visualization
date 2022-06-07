import express from "express"
import fs from "fs"
import path from "path"
//import JavaScript from "tree-sitter-javascript"
//import Parser from "tree-sitter"

//let parser = new Parser()
//parser.setLanguage(JavaScript)
let app = express()

let port = 8080

// just for test
app.get('/', (req, res, next) => {
    res.writeHead(200, {
        'Content-type': 'text/html;'
    })
    res.write(fs.readFileSync(path.join(__dirname, '..', 'resources', 'templates', 'index.html')))
    res.end()
    console.log('Get request on /')
})
app.use(express.static('src/resources'))

app.listen(port, () => {
    console.log(`Server started on port ${port}`)
})
