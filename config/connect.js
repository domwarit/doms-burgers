//first this to do is set up sql

var mysql = require("mysql");
require('dotenv').config();

if (process.env.JAWSDB_URL){
    connection = mysql.createConnection(process.env.JAWSDB_URL);
} else{
    connection = mysql.createConnection({
        host: "localhost",
        port: 3030,
        user: "root",
        password: "Armand@2911",
        database: "burgers_db"
    })
};
// Make a connection your defined data-base
connection.connect(function(error){
    if(error){
        console.error("error connecting: " + error.stack);
        return;
    }
    console.log("connected as id " + connection.threadID);
});

//Export connection for ORM
module.exports = connection;


//Things we did on this page: 1. Set up mySQL connection 2. Defined my enviorment (learn defintion of enviorment) 3. Connected to database 4. Exported connection 