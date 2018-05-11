var Queue = function() {
  // Hey! Rewrite in the new style. Your code will wind up looking very similar,
  // but try not not reference your old code in writing the new style.
  this.storage = {};
};

Queue.prototype.enqueue = function(value) {
  this.storage[this.size()] = value;
};

Queue.prototype.dequeue = function() {

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

Queue.prototype.size = function() {
  return Object.keys(this.storage).length;
};

