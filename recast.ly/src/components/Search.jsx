var Search = (props) => (
  <div className="search-bar form-inline">
    <input className="form-control" type="text" 
    onChange={(e) => props.handleChange(e)} />
    <button className="btn hidden-sm-down" onClick={(e) => {
      props.onSearchButtonClick({ key: window.YOUTUBE_API_KEY, query: props.value, max: 5 }, e); 
      
    }}>
      <span className="glyphicon glyphicon-search"></span>
    </button>
  </div> 
);

//  'e' is react's synthetic event variable that is always passed as the first argument in anonymous functions properties in 'on' events
// e.target.value is the value of the element's contents. 
// it's generally good practice to pass in e into anonymous functions in the case you want to do something with e.target.value


// In the ES6 spec, files are "modules" and do not share a top-level scope
// `var` declarations will only exist globally where explicitly defined
window.Search = Search;

