var Tree = function(value, parent) {
  var newTree = {};
  extend(newTree, treeMethods);
  newTree.value = value;
  newTree.children = [];
  newTree.parent = parent;
  return newTree;
};

var extend = function(to, from) {
  for (var key in from) {
    to[key] = from[key];
  }
};
var treeMethods = {};

treeMethods.addChild = function(value) {
  var childTree = Tree(value, this);
  this.children.push(childTree);
};

treeMethods.contains = function(targetValue) {
  
  if (this.value === targetValue) {
    return true;
  }

  for (var i = 0; i < this.children.length; i++) {
    if (this.children[i].contains(targetValue)) {
      return true;
    }
  }

  return false; 
};

treeMethods.removeFromParent = function() {

  if (!this.parent) {
    return;
  }

  // remove child tree from parent tree children array
  var parentTree = this.parent;
  for (var i = 0; i < parentTree.children.length; i++) {
    if (parentTree.children[i].value = this.value) {
      parentTree.children.splice(i, 1);
      break;
    }
  }  

  // remove from children tree parent property
  this.parent = null;

};

treeMethods.forEach = function(cb) {

  var currentTree = this;
  var currentValue = currentTree.value;
  cb.call(currentTree, currentValue, currentTree);

  for (var i = 0; i < currentTree.children.length; i++) {
    this.forEach.call(currentTree.children[i], cb);
  }

};

/*
 * Complexity: What is the time complexity of the above functions?
 */
