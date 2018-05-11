class App extends React.Component {
  constructor(props) {
    super(props);
    
    this.state = {
      sourceVid: window.exampleVideoData[0],
      videos: window.exampleVideoData,
      value: ''
    };
    
    this.onVideoEntryClick = this.onVideoEntryClick.bind(this);
    this.onSearchButtonClick = this.onSearchButtonClick.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleAJAX = this.handleAJAX.bind(this);
  }
  
  onVideoEntryClick(arg) {
    this.setState({sourceVid: arg});
  }
  
  handleChange(event) {
    this.setState({value: event.target.value});
  }
  
  handleAJAX(vids) {
    // another option:
    // var videosSoFar = this.state.videos.concat(vid);
    // this.setState({ videos: videosSoFar });
    this.setState({videos: [].concat(vids)});
  }
  
  onSearchButtonClick(options, e) {
    this.setState({videos: []});
    window.searchYouTube(options, this.handleAJAX);
    console.log('videos was changed');
    console.log('videos after state change', this.state.videos);
  }
  
  render() {
    
    return (
      <div>
        <nav className="navbar">
          <Search handleChange= {this.handleChange} value={this.state.value} onSearchButtonClick={this.onSearchButtonClick} />
        </nav>
        <div className="row">
          <div className="col-md-7">
            <VideoPlayer video={this.state.sourceVid} />
          </div>
          <div className="col-md-5">
            <VideoList onVideoEntryClick={this.onVideoEntryClick} videos={this.state.videos} />
          </div>
        </div>
      </div>
    );
  }
  
}
  


// In the ES6 spec, files are "modules" and do not share a top-level scope
// `var` declarations will only exist globally where explicitly defined
window.App = App;
