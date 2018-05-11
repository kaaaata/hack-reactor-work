let mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/app');

let db = mongoose.connection;

db.on('error', () => {
  console.log('mongoose connection error');
});

db.once('open', () => {
  console.log('mongoose connected successfully');
});

let movieSchema = mongoose.Schema({
  id: Number,
  original_title: String,
  popularity: Number,
  poster_path: String,
  genre: [{id: Number, name: String}],
  overview: String
});

let Movie = mongoose.model('Movies', movieSchema);
// Uncomment below line to wipe database

Movie.remove({}, (err) => {});

let saveMany = (objArray, callback) => {
  for (let i = 0; i < objArray.length; i++) {
    let movie = new Movie({
      id: objArray[i].id,
      original_title: objArray[i].original_title,
      popularity: objArray[i].popularity,
      poster_path: objArray[i].poster_path,
      genre: objArray[i].genre,
      overview: objArray[i].overview
    });
    selectAll((err, data) => {
      if (data.map(item => item.id).includes(parseInt(objArray[i].id))) {
        return;
      }
      movie.save((err, movie) => {
        if (err) return console.error(err);
        if (i === objArray.length - 1) {
          callback(null, objArray);
        }
      });
    });
  };
};

let selectAll = (callback) => {
  Movie.find({}, function(err, items) {
    if(err) callback(err, null);
    callback(null, items);
  });
};

module.exports.selectAll = selectAll;
module.exports.saveMany = saveMany;
