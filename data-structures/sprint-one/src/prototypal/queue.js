var Queue = function() {
  var someInstance = Object.create(queueMethods);
  someInstance.storage = {};
  return someInstance;
};

var queueMethods = {};

queueMethods.enqueue = function(value) {
  this.storage[this.size()] = value;
};

queueMethods.dequeue = function() {
  if (this.size()) {
    var firstString = this.storage[0];
    delete this.storage[0];
    for (var key in this.storage) {
      this.storage[key - 1] = this.storage[key];
      delete this.storage[key];
    }
    return firstString;
  }
  return;
};

queueMethods.size = function() {
  return Object.keys(this.storage).length;
};

