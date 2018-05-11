const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/fetcher');

let repoSchema = mongoose.Schema({
	id: Number,
	name: String,
  owner: {
  	login: String
  },
  html_url: String,
  stargazers_count: Number
});

let Repo = mongoose.model('Repo', repoSchema);
// Next 3 lines wipes clean the database. 
// Repo.remove({}, function(err) { 
//    console.log('collection removed') 
// });

let save = (repos, callback) => {
  // TODO: Your code here
  // This function should save a repo or repos to
  // the MongoDB
  Repo.find(function(err, existingRepos) {
  	if (err) {
  		throw err;
  	}
  	existingRepos = existingRepos.map(repo => repo.id);
  	repos.forEach(repo => {
	  	if (existingRepos.includes(repo.id)) {
	  		return;
	  	}
	  	let mongoRepo = new Repo({
	  		id: repo.id,
	  		name: repo.name,
	  		owner: {
	  			login: repo.owner.login
	  		},
	  		html_url: repo.html_url,
	  		stargazers_count: repo.stargazers_count
	  	});
	  	mongoRepo.save((err, theRepo) => {
	  		if (err) {
	  			throw err;
	  		}
	  		console.log('successful save');
	  	});
	  });
	  callback(null, repos);
  });  
};

let findTop25 = (callback) => {
	Repo.find(function (err, repos) {
	  if (err) {
	  	throw err;
	  }
	  console.log('successful find');

	  let top25 = [];
	  while (top25.length < 25 && repos.length > 0) {
	  	let top = repos.reduce((a, b) => (a.stargazers_count > b.stargazers_count ? a : b));
	  	top25 = top25.concat(repos.splice(repos.indexOf(top), 1));
	  }
	  callback(null, top25);
	});
};

module.exports.save = save;
module.exports.findTop25 = findTop25;


