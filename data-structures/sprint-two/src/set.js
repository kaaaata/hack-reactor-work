var Set = function() {
  var set = Object.create(setPrototype);
  set._storage = {};
  return set;
};

var setPrototype = {};

setPrototype.add = function(value) {
  this._storage[value] = true;
};

setPrototype.contains = function(value) {
  return this._storage.hasOwnProperty(value);
};

setPrototype.remove = function(value) {
  delete this._storage[value];
};

/*
 * Complexity: What is the time complexity of the above functions?
 */
