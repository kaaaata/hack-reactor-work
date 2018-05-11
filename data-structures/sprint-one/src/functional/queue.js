var Queue = function() {
  var someInstance = {};
  var storage = {};

  someInstance.enqueue = function(value) {
    storage[someInstance.size()] = value;
  };

  someInstance.dequeue = function() {
    if (Object.keys(storage).length) {
      var firstString = storage[0];
      delete storage[0];
      for (var key in storage) {
        storage[key - 1] = storage[key];
        delete storage[key];
      }
      return firstString;
    }
    return;
  };

  someInstance.size = function() {
    return Object.keys(storage).length;
  };

  return someInstance;
};