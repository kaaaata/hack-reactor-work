var Tree = function(value, piece) {
  var newTree = {};
  newTree.value = value;
  newTree.children = window.createChildren(value, piece);
  return newTree;
};