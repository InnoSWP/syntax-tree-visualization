const mysql = require("mysql2");


function hashCode(string) {
  var hash = 0, i, chr;
  if (string.length === 0) return hash;
  for (i = 0; i < string.length; i++) {
    chr   = string.charCodeAt(i);
    hash  = ((hash << 5) - hash) + chr;
    hash |= 0; // Convert to 32bit integer
  }
  return hash;
};


  
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

function saveService(Line){
    let Hash = hashCode(Line);
    const sql = `INSERT INTO base(code, hash) VALUES ?`;
    data = [[Line, Hash]];
    connection.query(sql, [data], function(err, results) {
  });

  connection.end();
    return Hash;
}

function returnCode(Hash){
let ans = "-1";

  const sql = "SELECT * FROM base";
  connection.query(sql,  function(err, results) {
      if(err) console.log(err);
      const users = results;
      for(let i=0; i < users.length; i++){
        if(users[i].hash == Hash){
          ans = (users[i].code);
        }
      }

      connection.end();
  });

  return ans;
}