import app from './app'
import {SyntaxTreeService} from './service/SyntaxTreeService'

let port = process.env["PORT"] ?? 8080

app.listen(port, () => {
    console.log(`Server started on port ${port}`)
})
