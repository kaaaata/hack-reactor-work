import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
import Search from './components/Search.jsx';
import RepoList from './components/RepoList.jsx';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = { 
      repos: []
    }
    this.load25 = this.load25.bind(this);
  }

  componentDidMount() {
    this.load25();
  }

  load25() {
    let _this = this;
    $.ajax({
      type: 'GET',
      url: 'http://localhost:1128/repos',
      success: function (data) {
        console.log('success get ajax, data = ', data);
        console.log(_this.state);
        _this.setState({repos: data});
      },
      error: function() {
        console.log('ajax error get');
      }
    });    
  }

  search (term) {
    console.log(`${term} was searched`);
    let _this = this;
    $.ajax({
      type: 'POST',
      url: `http://localhost:1128/repos/${term}`,
      success: function (data) {
        console.log('success post ajax, data = ', data);
        _this.load25();
      },
      error: function() {
        console.log('ajax error post');
      }
    });
  }

  render () {
    return (<div>
      <h1>Github Fetcher</h1>
      <RepoList repos={this.state.repos}/>
      <Search onSearch={this.search.bind(this)}/>
    </div>)
  }
}

ReactDOM.render(<App />, document.getElementById('app'));