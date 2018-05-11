import React from 'react';

const Movie = (props) => (
  <div className="movie">
  	<img src={'https://image.tmdb.org/t/p/w500/' + props.movie.poster_path} onClick={() => props.handleMovieClick(props.movie)} /><br/>
  </div>
)

export default Movie;