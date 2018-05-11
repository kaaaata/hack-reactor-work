

// Instantiate a new graph
var Graph = function() {
  this.allNodes = {};
};
var Node = function(value) {
  var node = {};

  node.value = value;
  node.edges = {};

  return node;
};
// Add a node to the graph, passing in the node's value.
Graph.prototype.addNode = function(value) {
  var newNode = Node(value);
  this.allNodes[value] = newNode;
};

// Return a boolean value indicating if the value passed to contains is represented in the graph.
Graph.prototype.contains = function(value) {
  if (this.allNodes.hasOwnProperty(value)) {
    return true;
  }
  return false;
};

// Removes a node from the graph.
Graph.prototype.removeNode = function(value) {
  delete this.allNodes[value];
  this.forEachNode(function(nodeValue) {
    var node = this.allNodes[nodeValue];
    delete node.edges[value];
  });
};

// Returns a boolean indicating whether two specified nodes are connected.  Pass in the values contained in each of the two nodes.
Graph.prototype.hasEdge = function(fromNodeValue, toNodeValue) {
  if (this.allNodes[fromNodeValue].edges.hasOwnProperty(toNodeValue)) {
    return true;
  }
  return false;
};

// Connects two nodes in a graph by adding an edge between them.
Graph.prototype.addEdge = function(fromNodeValue, toNodeValue) {
  var fromNode = this.allNodes[fromNodeValue];
  var toNode = this.allNodes[toNodeValue];
  
  fromNode.edges[toNodeValue] = toNode;
  toNode.edges[fromNodeValue] = fromNode;
};

// Remove an edge between any two specified (by value) nodes.
Graph.prototype.removeEdge = function(fromNodeValue, toNodeValue) {
  var fromNode = this.allNodes[fromNodeValue];
  var toNode = this.allNodes[toNodeValue];

  delete fromNode.edges[toNodeValue];
  delete toNode.edges[fromNodeValue];
};

// Pass in a callback which will be executed on each node of the graph.
Graph.prototype.forEachNode = function(cb) {
  for (var key in this.allNodes) {
    cb.call(this, key);
  }
};

/*
 * Complexity: What is the time complexity of the above functions?
 */


