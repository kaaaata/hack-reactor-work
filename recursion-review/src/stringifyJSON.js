// this is what you would do if you liked things to be easy:
// var stringifyJSON = JSON.stringify;

// but you don't so you're going to write it from scratch:

var stringifyJSON = function(obj) {
  if (typeof(obj) === 'string') {
    return '"' + obj + '"';
  } else if (typeof(obj) === 'number') {
    return obj.toString();
  } else if (typeof(obj) === 'boolean') {
    return obj.toString();
  } else if (obj === null || obj === undefined) { 
    return 'null';
  } else if (Array.isArray(obj)) {
    if (typeof(obj) === 'function' || obj === undefined) { return; }
    for (var i = 0; i < obj.length; i++) {
      obj[i] = stringifyJSON(obj[i]);
    }
    return '[' + (obj + '') + ']';
  } else if (typeof(obj) === 'object') {
    var arr = [];
    for (var key in obj) { 
      if (typeof(obj[key]) === 'function' || obj[key] === undefined) {
      } else {
        arr.push(stringifyJSON(key) + ':' + stringifyJSON(obj[key]));
      }      
    } 
    return '{' + arr.join() + '}';
  } else {
    return 'null';
  }
};