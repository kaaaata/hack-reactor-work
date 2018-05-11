var LinkedList = function() {
  var list = {};
  list.head = null;
  list.tail = null;

  list.addToTail = function(value) {
    var newNode = Node(value);
    if (!list.head) {
      list.head = newNode;
      list.tail = newNode;
    } else {
      var previousTail = list.tail;
      previousTail.next = newNode;
      list.tail = newNode;
    }
  };

  list.removeHead = function() {
    var secondNode = list.head.next;
    var formerHead = list.head;
    list.head = secondNode;
    return formerHead.value;
  };

  list.contains = function(target, currentNode) {

    if (!currentNode) {
      currentNode = list.head;
    }
    
    if (currentNode.value === target) {
      return true;
    }

    if (currentNode.next) {
      return list.contains(target, currentNode.next);
    } else {
      return false;
    }
  };

  return list;
};

var Node = function(value) {
  var node = {};

  node.value = value;
  node.next = null;

  return node;
};

/*
 * Complexity: What is the time complexity of the above functions?
 */
