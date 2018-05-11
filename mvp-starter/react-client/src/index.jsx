import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
import Movie from './components/Movie.jsx';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      input: '',
      moviesWatched: [],
      moviesRecommended1: [],
      moviesRecommended2: []
    }  

    this.addToDatabase = this.addToDatabase.bind(this);
    this.pullFromDatabase = this.pullFromDatabase.bind(this);
    this.fillDatabase = this.fillDatabase.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleInputClick = this.handleInputClick.bind(this);
    this.handleMovieClick = this.handleMovieClick.bind(this);
  }

  componentDidMount() {
    // let _this = this;
    // this.fillDatabase(data => {
    //   $.ajax({
    //     url: 'http://localhost:3000/items',
    //     type: 'POST',
    //     contentType: 'application/json',
    //     data: JSON.stringify(data.results),
    //     success: (data) => {
    //       console.log('success AJAX POST ping to server, sent back data: ');
    //       console.log(data);
    //       _this.setState({moviesRecommended1: data.slice(0, 5)});
    //       _this.setState({moviesRecommended2: data.slice(5, 10)});
    //     },
    //     error: (err) => {
    //       console.log('err', err);
    //     }
    //   });
    // }); 
  }

  // use a callback on all the items in the database
  pullFromDatabase(callback) {
    $.ajax({
      url: 'http://localhost:3000/items',
      type: 'GET',
      success: (data) => {
        console.log('success AJAX get to server, got data: ');
        console.log(data);
        callback(data);
      },
      error: (err) => {
        console.log('err', err);
      }
    });
  }

  // fill database with a bunch of popular movies
  fillDatabase(callback) {
    $.ajax({
      url: `https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc?&api_key=${window.TOKEN}`, 
      type: 'GET',
      success: (data) => {
        console.log('success AJAX get to API, got data (FILL): ');
        console.log(data); // results array length 20
        callback(data); // this callback is an ajax call
      },
      error: (err) => {
        console.log('err', err);
      }
    });
  }

  addToDatabase(hardAdd = undefined, callback) {
    let query = typeof hardAdd === 'string' ? hardAdd : this.state.input;
    $.ajax({
      url: `https://api.themoviedb.org/3/search/movie?api_key=${window.TOKEN}&query=${query}`, 
      type: 'GET',
      success: (data) => {
        console.log('success AJAX get to API, got data: ');
        console.log(data);
        callback(data);
        //nested ajax
        $.ajax({
          url: 'http://localhost:3000/items',
          type: 'POST',
          data: [data.results[0]],
          success: (data) => {
            console.log('success AJAX POST ping to server, sent back data: ');
            console.log(data);
            callback(data);
          },
          error: (err) => {
            console.log('err', err);
          }
        });
        //nested ajax end
      },
      error: (err) => {
        console.log('err', err);
      }
    });
  }

  handleInputChange(e) {
    this.setState({input: e.target.value});
    console.log(this.state.input);
  }

  handleInputClick() {
    let _this = this;
    this.addToDatabase(null, (data) => {
      if (_this.state.moviesWatched.map(item => item.id).includes(data.results[0].id)) return;
      let newState = this.state.moviesWatched;
      let newRecs = [];
      newState.unshift(data.results[0]);
      _this.setState({moviesWatched: newState.slice(0, 5)});
      for (let i = 0; i < 5; i++) {
        $.ajax({
          url: `https://api.themoviedb.org/3/movie/${newState[i] ? newState[i].id : newState[0].id}/recommendations?api_key=${window.TOKEN}`,
          type: 'GET',
          success: (data) => {
            console.log('success AJAX get-recs to API, got data: ');
            console.log(data);
            if (i === 0) {
              console.log(i);
              newRecs = newRecs.concat(data.results.slice(0, 4));
            } else if (i === 1) {
              console.log(i);
              newRecs = newRecs.concat(data.results.slice(0, 2));
            } else if (i === 2) {
              console.log(i);
              newRecs = newRecs.concat(data.results.slice(0, 2));
            } else if (i === 3) {
              console.log(i);
              newRecs = newRecs.concat(data.results.slice(0, 1));
            } else if (i === 4) {
              console.log(i);
              newRecs = newRecs.concat(data.results.slice(0, 1));
            }
            if (newRecs.length === 10) {
              _this.setState({moviesRecommended1: newRecs.slice(0, 5)});
              _this.setState({moviesRecommended2: newRecs.slice(5, 10)});
            }
          }, 
          error: (err) => {
            console.log('err', err);
          }
        });
      }
    });
  }

  handleMovieClick(movie) {
    let _this = this;
    if (_this.state.moviesWatched.map(item => item.id).includes(movie.id)) return;
    let newState = this.state.moviesWatched;
    let newRecs = [];
    newState.unshift(movie);
    _this.setState({moviesWatched: newState.slice(0, 5)});
    for (let i = 0; i < 5; i++) {
      $.ajax({
        url: `https://api.themoviedb.org/3/movie/${newState[i] ? newState[i].id : newState[0].id}/recommendations?api_key=${window.TOKEN}`,
        type: 'GET',
        success: (data) => {
          console.log('success AJAX get-recs to API, got data: ');
          console.log(data);
          if (i === 0) {
            console.log(i);
            newRecs = newRecs.concat(data.results.slice(0, 4));
          } else if (i === 1) {
            console.log(i);
            newRecs = newRecs.concat(data.results.slice(0, 2));
          } else if (i === 2) {
            console.log(i);
            newRecs = newRecs.concat(data.results.slice(0, 2));
          } else if (i === 3) {
            console.log(i);
            newRecs = newRecs.concat(data.results.slice(0, 1));
          } else if (i === 4) {
            console.log(i);
            newRecs = newRecs.concat(data.results.slice(0, 1));
          }
          if (newRecs.length === 10) {
            _this.setState({moviesRecommended1: newRecs.slice(0, 5)});
            _this.setState({moviesRecommended2: newRecs.slice(5, 10)});
          }
        }, 
        error: (err) => {
          console.log('err', err);
        }
      });
    }
    
  }

  render() {
    return (
      <div>
        <h1>Recommended Movies Generator</h1>
        <h2>Watch a movie: </h2>
        <input value={this.state.input} onChange={this.handleInputChange}></input><button onClick={this.handleInputClick}>Watch</button>
        <h2>Last 5 movies you watched</h2>
        <div className="container">
          {this.state.moviesWatched.map((movie, index) => <Movie key={index} movie={movie} handleMovieClick={this.handleMovieClick} />)}
        </div>
        <h2>Recommended for you</h2>
        <div className="container">
          {this.state.moviesRecommended1.map((movie, index) => <Movie key={index} movie={movie} handleMovieClick={this.handleMovieClick} />)}
        </div>
        <div className="container">
          {this.state.moviesRecommended2.map((movie, index) => <Movie key={index} movie={movie} handleMovieClick={this.handleMovieClick} />)}
        </div>

      </div>
    )
  }
}

ReactDOM.render(<App />, document.getElementById('app'));