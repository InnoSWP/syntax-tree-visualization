"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mysql = require("mysql2");
const usefullFunctions_1 = require("../utils/usefullFunctions");
const connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    database: "swpbase",
    password: "12345"
});
// const sql = `create table if not exists base(
//   id int primary key auto_increment,
//   code varchar(5000) not null,
//   hash varchar(1000) not null
// )`;
function saveService(Line) {
    let Hash = (0, usefullFunctions_1.hashCode)(Line);
    const sql = `INSERT INTO base(code, hash)
                 VALUES ?`;
    const data = [[Line, Hash]];
    connection.query(sql, [data], function (err, results) {
    });
    connection.end();
    return Hash;
}
function returnCode(Hash) {
    let ans = "-1";
    const sql = "SELECT * FROM base";
    connection.query(sql, function (err, results) {
        if (err)
            console.log(err);
        const users = results;
        for (let i = 0; i < users.length; i++) {
            // @ts-ignore
            if (users[i].hash == Hash) {
                // @ts-ignore
                ans = (users[i].code);
            }
        }
        connection.end();
    });
    return ans;
}
