const connection = require('../config/connect.js');

// prepair question marks and object key/pair values b4 passing ORM


//Helper functions 

function printQuestions(input) {
    var array = [];
    for (var i = 0; i < input; i++) {
        array.push("?");
    }
    return array.toString()
}

// Create a second helper function to convert key/value pairs to mySql syntax. This function accepts the object from pulled from the client-side.

function objectToSql(object) {
    var arr = [];
    //set values for keys
    for (var key in object) {
        var value = object[key];
        var value = object[key];
        if (Object.hasOwnProperty.call(object, key)) {
            if (typeof value === "sring" && value.indexOf(" ") >= 0) {
                value = "'" + value + "'";
            }
            // ex {name: 'Frank Ocean'} => ["name='Frank Ocean'"]
            //ex {hungry=true} => ["hungry=true"]

            array.push(key + "=" + value);
        }
        return array.toString();
    }

}

//build orm-object for all sql statement funtions 

var orm = {
    selectAll: function (tableInput, cb) {
        var qString = "SELECT * FROM" + tableInput + ";";
        connection.query(qString, function (error, results) {
            if (error) {
                console.log(error);
                throw error
            }
            cb(results);
        });
    },
    makeOne: function (table, cols, vals, cb) {
        var qString = "INSERT INTO " + table;
        qString += " (" + cols.toString() + ") VALUES (";
        qString += printQuestions(vals.length) + ") ";
        console.log("insertOne queryString: ", qString);

        connection.query(qString, vals, function (error, results) {
            if (error) {
                console.log("insertOne error", error)
                throw error;
            }
            cb(results);
        })
    },
    updateOne: function (table, objColVals, condition, cb) {
        var qString = "UPDATE" + table + "SET";
        qString += objectToSql(objColVals) + "WHERE" + condition;
        console.log("updateOne qString", qString);

        connection.query(qString, function (error, results) {
            if (err) {
                console.log("updateOne error", error);
                throw err
            }
            cb(results)
        });
    }
}
module.exports = orm;

        // selectAll: function(tableInput, cb){
        // var qString = "SELECT * FROM" + tableInput + ";";
        // connection.query(qString, function (err, results)
