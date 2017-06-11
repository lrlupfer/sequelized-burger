// MySQL connection
var mysql = require("mysql");

var connection;

// JAWSDB
if (process.env.NODE_ENV === "production") {
  connection = mysql.createConnection(process.env.JAWSDB_URL);
} else {
  var keys = require('./keys');

  connection = mysql.createConnection({
    host     : keys.db.host,
    user     : keys.db.user,
    password : keys.db.password,
    database : keys.db.database
  });
}

connection.connect(function(err) {
    if (err) {
        console.error('Connection error: ' + err.stack);
        return;
    }
    console.log('Connection threadId: ' + connection.threadId);
});

module.exports = connection;