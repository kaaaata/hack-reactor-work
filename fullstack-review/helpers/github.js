const request = require('request');
const config = require('../config.js');
const database = require('../database/index.js');

let getReposByUsername = (username, callback) => {
  // TODO - Use the request module to request repos for a specific
  // user from the github API

  // The options object has been provided to help you out, 
  // but you'll have to fill in the URL
  let options = {
    url: 'https://api.github.com/users/' + username + '/repos',
    headers: {
      'User-Agent': 'request',
      'Authorization': `token ${config.TOKEN || process.env.TOKEN}`
    }
  };
  request(options, (error, response, body) => {
    if (error) {
      throw error;
    }
    body = JSON.parse(body);
    console.log('got ' + body.length + ' repos with require request');
    if (body.message !== 'Not Found') {
      database.save(body, callback);
    }
  });
};

module.exports.getReposByUsername = getReposByUsername;