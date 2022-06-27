import app from './app'

let port = process.env["PORT"] ?? 8080

app.listen(port, () => {
    console.log(`Server started on port ${port}`)
})
