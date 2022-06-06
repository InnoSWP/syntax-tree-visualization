import express from "express"

let app = express()

// just for test
app.get('/users', (req, res, next) => {
    res.writeHead(200, {
        'Content-type': 'text/html;'
    })
    res.write('<h1 style="color: red; text-align: center">Hello Nikolay!!!</h1><img src="http://localhost:8080/cow.gif">')
    res.end()
    console.log('Get request on /users')
})
app.use(express.static('src/resources'))

app.listen(8080, () => {
    console.log("Server started on port 8080")
})