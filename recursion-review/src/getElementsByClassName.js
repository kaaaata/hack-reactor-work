// If life was easy, we could just do things the easy way:
// var getElementsByClassName = function (className) {
//   return document.getElementsByClassName(className);
// };

// But instead we're going to implement it from scratch:
var getElementsByClassName = function(className) {
  result = [];
  var getElements = function (node) {
    if (node.classList && node.classList.contains(className)) {
      result.push(node);
    }
  
    for (var i = 0; i < node.childNodes.length; i++) {
      getElements(node.childNodes[i]);  
    }

  };
  getElements(document.body);  
  return result;
};
