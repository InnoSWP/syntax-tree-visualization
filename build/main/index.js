"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const app_1 = require("./app");
let port = process.env["PORT"] ?? 8080;
app_1.app.listen(port, () => {
    console.log(`Server started on port ${port}`);
});
