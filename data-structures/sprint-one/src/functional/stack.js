var Stack = function() {
  var someInstance = {};
  var storage = {};

  someInstance.push = function(value) {
    storage[someInstance.size()] = value;
  };

  someInstance.pop = function() {
    var popKey = someInstance.size() - 1;
    var lastString = storage[popKey];
    delete storage[popKey];
    return lastString;
  };

  someInstance.size = function() {
    return Object.keys(storage).length;
  };

  return someInstance;
};