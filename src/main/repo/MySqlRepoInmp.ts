import {config} from "../../resources/config/config"

const mysql = require("mysql2");

import {hashCode} from "../utils/usefullFunctions";
import {CodeRepo} from "../repo/codeRepo"

class MySQLRepo implements CodeRepo {
    get(hash: String): String {
        throw new Error("Method not implemented.");
    }

    private connection = mysql.createConnection({
        host: config.mysql.host,
        user: config.mysql.user,
        database: config.mysql.database,
        password: config.mysql.password
    });


// const sql = `create table if not exists base(
//   id int primary key auto_increment,
//   code varchar(5000) not null,
//   hash varchar(1000) not null
// )`;

    save(Line: String): String {
        let Hash = hashCode(Line);
        const sql = `INSERT INTO base(code, hash)
                     VALUES ?`;
        const data = [[Line, Hash]];
        this.connection.query(sql, [data], function (err: String, results: String) {
        });

        this.connection.end();
        return Hash.toString();
    }

    private returnCode(Hash: String) {
        let ans = "-1";

        const sql = "SELECT * FROM base";
        this.connection.query(sql, function (err: String, results: String) {
            if (err) console.log(err);
            const users = results;
            for (let i = 0; i < users.length; i++) {
                // @ts-ignore
                if (users[i].hash == Hash) {
                    // @ts-ignore
                    ans = (users[i].code);
                }
            }

            // this.connection.end();
        });

        return ans;
    }
}

export const mySqlRepo = new MySQLRepo()