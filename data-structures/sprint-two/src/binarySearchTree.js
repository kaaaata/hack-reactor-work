var BinarySearchTree = function(value) {
  var newTree = {};
  extend(newTree, binaryTreeMethods);
  newTree.value = value;
  newTree.left;
  newTree.right;
  return newTree;
};

var extend = function(to, from) {
  for (var key in from) {
    to[key] = from[key];
  }
};
var binaryTreeMethods = {};

binaryTreeMethods.insert = function(value) {
  var allTreeValues = [];
  this.depthFirstLog(function() {
    allTreeValues.push(this.value);
  });
  allTreeValues.push(value);
  allTreeValues.sort(function(a, b) {
    return a - b;
  });

  var createTree = function(allTreeValues, isRightHandBranch) {
    if (!allTreeValues.length) {
      return;
    }
    var midIndex;
    if (isRightHandBranch) {
      midIndex = Math.ceil((allTreeValues.length - 1) / 2);
    } else { 
      midIndex = Math.floor((allTreeValues.length - 1) / 2);
    }

    var newTree = BinarySearchTree(allTreeValues[midIndex]);

    allTreeValues.splice(midIndex, 1);
    newTree.left = createTree(allTreeValues.slice(0, midIndex), false);
    newTree.right = createTree(allTreeValues.slice(midIndex), true);

    return newTree;
  };


  var midIndex = Math.ceil((allTreeValues.length - 1) / 2);
  this.value = allTreeValues[midIndex];
  allTreeValues.splice(midIndex, 1);
  this.left = createTree(allTreeValues.slice(0, midIndex), false);
  this.right = createTree(allTreeValues.slice(midIndex), true);
};

binaryTreeMethods.contains = function(targetValue) {

  var isContainedInTree = false;

  if (this.value === targetValue) {
    isContainedInTree = true;
  } else {
    if (this.value > targetValue) {
      if (this.left) {
        isContainedInTree = this.left.contains(targetValue);
      }
    } else {
      if (this.right) {
        isContainedInTree = this.right.contains(targetValue);
      }
    }
  }

  return isContainedInTree;
};

binaryTreeMethods.depthFirstLog = function(cb) {
  cb.call(this, this.value);

  if (this.left) {
    this.left.depthFirstLog(cb);
  }
  if (this.right) {
    this.right.depthFirstLog(cb);
  }
};

/*
 * Complexity: What is the time complexity of the above functions?
 */
