import express from "express"

let app = express()

function start() {
    app.listen(8080, () => {
        console.log("Server started on port 8080")
    })
}

function addUrl(url: string, callback: (req: Object, res: Object) => void) {
    app.get(url, callback)
}
