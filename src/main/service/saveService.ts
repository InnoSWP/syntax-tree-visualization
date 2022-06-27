const mysql = require("mysql2");

import {hashCode} from "../utils/usefullFunctions";

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

function saveService(Line: String) {
    let Hash = hashCode(Line);
    const sql = `INSERT INTO base(code, hash)
                 VALUES ?`;
    const data = [[Line, Hash]];
    connection.query(sql, [data], function (err: String, results: String) {
    });

    connection.end();
    return Hash;
}

function returnCode(Hash: String) {
    let ans = "-1";

    const sql = "SELECT * FROM base";
    connection.query(sql, function (err: String, results: String) {
        if (err) console.log(err);
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