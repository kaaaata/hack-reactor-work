describe('tree', function() {
  var tree;

  beforeEach(function() {
    tree = Tree(1);
  });

  it('should have methods named "addChild" and "contains", and a property named "value"', function() {
    expect(tree.addChild).to.be.a('function');
    expect(tree.contains).to.be.a('function');
    expect(tree.hasOwnProperty('value')).to.equal(true);
  });

  it('should add children to the tree', function() {
    tree.addChild(5);
    expect(tree.children[0].value).to.equal(5);
  });

  it('should return true for a value that the tree contains', function() {
    tree.addChild(5);
    expect(tree.contains(5)).to.equal(true);
  });

  it('should return false for a value that was not added', function() {
    tree.addChild(5);
    expect(tree.contains(6)).to.equal(false);
  });

  it('should be able to add children to a tree\'s child', function() {
    tree.addChild(5);
    tree.children[0].addChild(6);
    expect(tree.children[0].children[0].value).to.equal(6);
  });

  it('should correctly detect nested children', function() {
    tree.addChild(5);
    tree.addChild(6);
    tree.children[0].addChild(7);
    tree.children[1].addChild(8);
    expect(tree.contains(7)).to.equal(true);
    expect(tree.contains(8)).to.equal(true);
  });

/*  Add parent links to your tree

A .parent property, which refers to the parent node or null when there is no node
A .removeFromParent() method, which disassociates the tree with its parent (in both directions)
    ensure references to both child tree and parent tree are retained so that neither is garbage collected by js
    */

  it('should be able to run .forEach successfully on each tree', function() {
    var resultsArray = [];
    tree.addChild(5);
    tree.forEach(function(value, currentTree) {
      resultsArray.push(value);
    });

    expect(JSON.stringify(resultsArray)).to.equal(JSON.stringify([1, 5]));
  });


  it('should have a parent property for all nodes except root node', function() {
    tree.addChild(5);
    tree.addChild(6);
    tree.children[0].addChild(7);
    tree.children[0].addChild(4);
    tree.children[1].addChild(8);
    tree.children[1].addChild(3);

    var allTreesHaveParentProperty = true;

    tree.forEach(function(value, currentTree) {
      if (!currentTree.parent && currentTree !== tree) {
        allTreesHaveParentProperty = false;
      }
    });

    expect(allTreesHaveParentProperty).to.equal(true);
  });

  it('should have a remove from parent method for all trees', function() {
    tree.addChild(5);
    tree.addChild(6);
    tree.children[0].addChild(7);
    tree.children[1].addChild(8);

    var allHaveRemoveFromParentMethod = true;
    tree.forEach(function(value, currentTree) {
      if (!currentTree.removeFromParent) {
        allHaveRemoveFromParentMethod = false;
      }
    });

    expect(allHaveRemoveFromParentMethod).to.equal(true);
  });  

  it('should successfully implement .removeFromParent for all nodes except root node', function() {
    tree.addChild(5);
    tree.addChild(6);
    tree.children[0].addChild(7);
    tree.children[1].addChild(8);

    tree.children[0].removeFromParent();

    var doesTreeContainFive = tree.contains(5);
    var doesTreeContainSeven = tree.contains(7);

    expect(doesTreeContainFive).to.equal(false);
    expect(doesTreeContainSeven).to.equal(false);

  });

  it('should successfully deal with .removeFromParent being called on the root node', function() {
    tree.addChild(5);
    tree.addChild(6);
    tree.children[0].addChild(7);
    tree.children[1].addChild(8);
    
    var resultRemoveRootTreeFromParent = tree.removeFromParent();
    
    expect(resultRemoveRootTreeFromParent).to.equal(undefined);
  });

});
