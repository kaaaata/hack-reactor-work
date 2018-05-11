var express = require('express');
var bodyParser = require('body-parser');
var items = require('../database-mongo');
var app = express();


app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json())
app.use(express.static(__dirname + '/../react-client/dist'));

app.post('/items', (req, res) => {
	console.log('post received, doing saveMany');
	items.saveMany(req.body, (err, data) => {
		if (err) res.status(404).send();
		console.log('success POST to database');
		res.status(201).json(data);
	});
});
app.get('/items', (req, res) => {
	items.selectAll((err, data) => {
		if (err) res.status(404).send();
		console.log('success GET from database');
		res.status(200).json(data);	
	});
});

app.listen(3000, () => {
  console.log('listening on port 3000!');
});

