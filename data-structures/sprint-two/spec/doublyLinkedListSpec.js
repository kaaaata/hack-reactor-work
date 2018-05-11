describe('doublyLinkedList', function() {
  var doublyLinkedList;

  beforeEach(function() {
    doublyLinkedList = DoublyLinkedList();
  });

  it('should be able to remove nodes from middle of doubly linked list', function() {
    doublyLinkedList.addToTail(1);
    doublyLinkedList.addToTail(2);
    doublyLinkedList.addToTail(3);
    expect(doublyLinkedList.head.value).to.equal(1);
    expect(doublyLinkedList.contains(2)).to.equal(true);
    
    expect(doublyLinkedList.tail.value).to.equal(3);
    doublyLinkedList.remove(2);
    expect(doublyLinkedList.contains(2)).to.equal(false);
    expect(doublyLinkedList.head.value).to.equal(1);
    expect(doublyLinkedList.tail.value).to.equal(3);
  });

  it('should have a previous and a next for all nodes', function() {
    for (var i = 0; i < 5; i++) {
      doublyLinkedList.addToTail(i);
    }

    var allNodesHavePreviousAndNext = true;

    var cb = function(value, node, linkedList) {
      if ((!node.next && value < 4) || (!node.previous && value > 0)) {
        allNodesHavePreviousAndNext = false;
      }
    };
    doublyLinkedList.each(cb);
    expect(allNodesHavePreviousAndNext).to.equal(true);
  });

  it('should have a head and tail', function() {
    expect(doublyLinkedList).to.have.property('head');
    expect(doublyLinkedList).to.have.property('tail');
  });

  it('should have methods named "each" "addToTail", "removeHead", and "contains"', function() {
    expect(doublyLinkedList.addToTail).to.be.a('function');
    expect(doublyLinkedList.removeHead).to.be.a('function');
    expect(doublyLinkedList.contains).to.be.a('function');
    expect(doublyLinkedList.each).to.be.a('function');
  });

  it('should designate a new tail when new nodes are added', function() {
    doublyLinkedList.addToTail(4);
    expect(doublyLinkedList.tail.value).to.equal(4);
    doublyLinkedList.addToTail(5);
    expect(doublyLinkedList.tail.value).to.equal(5);
  });

  it('should remove the head from the list when removeHead is called', function() {
    doublyLinkedList.addToTail(4);
    doublyLinkedList.addToTail(5);
    expect(doublyLinkedList.head.value).to.equal(4);
    doublyLinkedList.removeHead();
    expect(doublyLinkedList.head.value).to.equal(5);
  });

  it('should return the value of the former head when removeHead is called', function() {
    doublyLinkedList.addToTail(4);
    expect(doublyLinkedList.removeHead()).to.equal(4);
  });

  it('should contain a value that was added', function() {
    doublyLinkedList.addToTail(4);
    doublyLinkedList.addToTail(5);
    expect(doublyLinkedList.contains(4)).to.equal(true);
    expect(doublyLinkedList.contains(5)).to.equal(true);
    expect(doublyLinkedList.contains(6)).to.equal(false);
  });

  it('should not contain a value that was removed', function() {
    doublyLinkedList.addToTail(4);
    doublyLinkedList.addToTail(5);
    doublyLinkedList.removeHead();
    expect(doublyLinkedList.contains(4)).to.equal(false);
  });

  // add more tests here to test the functionality of doublyLinkedList
});
