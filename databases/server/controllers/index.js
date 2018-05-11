var models = require('../models');

var headers = {
  'access-control-allow-origin': '*',
  'access-control-allow-methods': 'GET, POST, PUT, DELETE, OPTIONS',
  'access-control-allow-headers': 'content-type, accept',
  'access-control-max-age': 10, // Seconds.
  'Content-Type': 'application/json' // cuz we use json with c-box
};
var messages = []; // holds all messages, eventually will be SQL
var users = []; // holds all usernames, eventually will be SQL
var counter = 0; // used for make unique ID to each message/user

module.exports = {
  messages: {
    get: function (req, res) { // a function which handles a get request for all messages
      console.log('controller-messages-GET triggered. ');
      var result = [];
      messages.forEach(buffer => result.push(JSON.parse(buffer)));
      res.writeHead(200, headers);
      res.end(JSON.stringify({'results': results}));
    }, 
    post: function (req, res) { // a function which handles posting a message to the database
      console.log('controller-messages-POST triggered. ');
      var body = [];
      
      res.on('data', (chunk) => {
        chunk.createdAt = new Date();
        chunk.objectId = counter; 
        counter++;
        body.push(chunk);
      });
      res.on('end', () => {
        body = Buffer.concat(typeof body[0] === 'string' ? [Buffer.from(body[0], 'UTF-8')] : [body[0]] ).toString();
        // at this point, `body` has the entire request body stored in it as a string
      });
      messages.push(body);
      res.writeHead(201, headers);
      res.end(JSON.stringify({'results': messages}));
    }
  },

  users: {
    // Ditto as above (COPY-PASTED WORD FOR WORD BY CAT)
    get: function (req, res) {
      console.log('controller-users-GET triggered. ');
      var result = [];
      users.forEach(buffer => result.push(JSON.parse(buffer)));
      res.writeHead(200, headers);
      res.end(JSON.stringify({'results': user}));
    },
    post: function (req, res) {
      console.log('controller-users-POST triggered. ');
      var body = [];
      
      res.on('data', (chunk) => {
        chunk.createdAt = new Date();
        chunk.objectId = counter; 
        counter++;
        body.push(chunk);
      });
      res.on('end', () => {
        body = Buffer.concat(typeof body[0] === 'string' ? [Buffer.from(body[0], 'UTF-8')] : [body[0]] ).toString();
        // at this point, `body` has the entire request body stored in it as a string
      });
      users.push(body);
      res.writeHead(201, headers);
      res.end(JSON.stringify({'results': users}));
    }
  }
};

