export let config = {
    "mysql": {
        "host": process.env["MYSQL_HOST"],
        "user": process.env["MYSQL_USER"],
        "database": process.env["MYSQL_DATABASE"],
        "password": process.env["MYSQL_PASSWORD"]
    }
}