var Stack = function() {
  // Hey! Rewrite in the new style. Your code will wind up looking very similar,
  // but try not not reference your old code in writing the new style.
  var someInstance = Object.create(stackMethods);
  someInstance.storage = {};
  return someInstance;
};

var stackMethods = {};

stackMethods.push = function(value) {
  this.storage[this.size()] = value;
};
stackMethods.pop = function() {

  if (this.size()) {
    var lastString = this.storage[this.size() - 1];
    delete this.storage[this.size() - 1];
    return lastString;
  }
  return;
};
stackMethods.size = function() {
  return Object.keys(this.storage).length;
};
