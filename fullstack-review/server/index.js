const express = require('express');
const helpers = require('../helpers/github.js');
const database = require('../database/index.js');
let app = express();

app.use(express.static(__dirname + '/../client/dist'));

app.post('/repos/:username', function (req, res) {
  helpers.getReposByUsername(req.params.username, (err, data) => {
  	if (err) {
  		throw err;
  	}
		res.status(201).send(data);
  }) 
  
  // TODO - your code here!
  // This route should take the github username provided
  // and get the repo information from the github API, then
  // save the repo information in the database
});

app.get('/repos', function (req, res) {
  // TODO - your code here!
  // This route should send back the top 25 repos
  // Let's say 'top' means most starred
  database.findTop25((err, data) => {
  	if (err) {
  		throw err;
  	}
  	res.status(200).send(data);
  });
});

let port = 1128;

app.listen(port, function() {
  console.log(`listening on port ${port}`);
});

