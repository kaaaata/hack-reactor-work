//make a new app parent object
//make GroceryList element with list of item
var App = () => (
  <div>
  	<h2>Cat's grocery list</h2> 
  	<GroceryList todos = {['buy apple', 'buy cheese', 'buy wine']} /> 
  </div>
);
//GroceryList item declaration
//Turn each list of item above into new element
//return each element of todos from properties mapped to new element with property = html and class = GroceryListItem with ul tag 
var GroceryList = (props) => {
  return (<ul>{props.todos.map(todo => <GroceryListItem todo={todo} />)}</ul>);
};
//class declaration, used to describe each individual element populated from GroceryList in this case
//constructor: inherit all original properties (app element -> grocerylist -> new element -> here) and init state to defaults
//ongroceryitemclick: set state variable to toggle when called
//ongroceryitemhover: set state variable to toggle when called
//render: set style variable to depend on current state, return <li> with props style, onclick listener, onhover listner, with 
//  text -> iteration from todos list in App object above
//  click -> bind the onclick function above to the element
//  mover -> bind the onhover function above to thte element
//  so, when event happen, react onClick detect it, which then invoke function, which was previously bound correctly, 
//  then state change (toggle), and magically it update @_@ (style property of element dynamic??)
class GroceryListItem extends React.Component {
  constructor(props) {
  	super(props);
  	this.state = {done: false, hover: false};
  }
  onGroceryItemClick() {
  	this.setState({done: !this.state.done});
  }
  onGroceryItemHover() {
  	this.setState({hover: !this.state.hover})
  }
  render() {
  	var style = {textDecoration: this.state.done ? 'line-through' : 'none', 
                 fontWeight: this.state.hover ? '700' : '400'};
  	return (<li style={style} 
  		        onClick={this.onGroceryItemClick.bind(this)}
  		        onMouseOver={this.onGroceryItemHover.bind(this)}>{this.props.todo}</li>);
  }
}
//render parent all object to html element id app
ReactDOM.render(<App />, document.getElementById("app"));

