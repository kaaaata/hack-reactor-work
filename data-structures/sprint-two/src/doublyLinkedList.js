var DoublyLinkedList = function() {
  var list = {};
  list.head = null;
  list.tail = null;

  list.addToTail = function(value) {
    var newNode = LinkedListNode(value);
    if (!list.head) {
      list.head = newNode;
      list.tail = newNode;
    } else {
      var previousTail = list.tail;
      newNode.previous = previousTail;
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

  list.remove = function(targetValue) {
    this.each(function(value, node, linkedList) {
      if (value === targetValue) {
        var oldPreviousNode = node.previous;
        var oldNextNode = node.next;
        oldPreviousNode.next = oldNextNode;
        oldNextNode.previous = oldPreviousNode;
      }
    });
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

  list.each = function(cb) {
    var currentNode = this.head;
    while (currentNode.next) {
      cb(currentNode.value, currentNode, this);
      currentNode = currentNode.next;
    }
    cb(this.tail.value, this.tail, this);
  };

  return list;
};

var LinkedListNode = function(value) {
  var node = {};

  node.value = value;
  node.next = null;
  node.previous = null;

  return node;
};

/*
 * Complexity: What is the time complexity of the above functions?
 */
