var mysql = require('mysql');

// Create a database connection and export it from this file.
// You will need to connect with the user "root", no password,
// and to the database "chat".

// lets try to connect to the student first. 
exports.connection = mysql.createConnection({
  host: localhost, 
  user: 'student', 
  password: 'student'
});

exports.connection.connect((err) => {
  if (err) {
    console.log('error connection, please advise. ');
    return;  
  }
  console.log('connected as id ' + connection.threadId);
});
