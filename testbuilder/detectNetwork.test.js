/*
 * You'll eventually be given instructions how to use this file
 * If you want to use it before then, you'll have to figure it out yourself
 */

// You don't actually want to fill *this* value in on line 9, but you'll see
// other places in this file where you'll replace the FILL_ME_IN with a
// different value.
var FILL_ME_IN = 'Fill this value in';
 
describe('Introduction to Mocha Tests - READ ME FIRST', function() {
  // A Mocha test is just a function!
  // If the function throws an error when run, it fails.
  // If it doesn't throw an error when run, it doesn't fail. 
  // To read more about mocha, visit mochajs.org

  // Once you've read and understood this section, please comment it out. 
  // You will not be able to proceed with a failing test. 

  it('Throws an error so it fails', function() {
    // dont throw an error = dont fail, so gonna comment out the throw
    // throw new Error('Delete me!');
  });

  it('Doesn\'t throw an error, so it doesn\'t fail', function() {
    // This test doesn't really test anything at all! It will pass no matter what.
    var even = function(num){
      return num/2 === 0;
    }
    return even(10) === true;
    // dont throw error = dont fail, no need to change anything
  });

  // In tests, we want to compare the expected behavior to the actual behavior.
  // A test should only fail if the expected behavior doesn't match the actual.
  it('Throws an error when expected behavior does not match actual behavior', function() {
    var even = function(num){
      return num%2 === 0;
      //need % not /
    }

    if(even(10) !== true) {
      throw new Error('10 should be even!');
    }
  });
});
describe('Diner\'s Club', function() {
  // Be careful, tests can have bugs too...

  it('has a prefix of 38 and a length of 14', function() {
    //comment out delete me line
    //throw new Error('Delete me!');
 
    if (detectNetwork('38345678901234') !== 'Diner\'s Club') {
      throw new Error('Test failed');
    }
  });

  it('has a prefix of 39 and a length of 14', function() {
    //added 0 to end of detectNetwork input
    if (detectNetwork('39345678901230') !== 'Diner\'s Club') {
      throw new Error('Test failed');
    }
 
  });
});

describe('American Express', function() {
  // It can get annoying to keep typing the if/throw, so here is a
  // helper function to throw an error if the input statement isn't true. 
  var assert = function(isTrue) {
    if(isTrue) {
      throw new Error('Test failed');
    }
 
  };

  it('has a prefix of 34 and a length of 15', function() {
    //need change === to !==
    assert(detectNetwork('343456789012345') !== 'American Express');
  });

  it('has a prefix of 37 and a length of 15', function() {
    assert(detectNetwork('373456789012345') !== 'American Express');
  });
});

describe('Visa', function() {
  // Chai is an entire library of helper functions for tests!
  // Chai provides an assert that acts the same as our previous assert.
  // Search the documentation to figure out how to access it. 
  //   http://chaijs.com/
  var assert = chai.assert;
 
  it('has a prefix of 4 and a length of 13', function() {
    assert.equal(detectNetwork('4123456789012'),'Visa')
  });
  it('has a prefix of 4 and a length of 16', function() {
    assert.equal(detectNetwork('4123456789012345'),'Visa')
  });
  it('has a prefix of 4 and a length of 19', function() {
    assert.equal(detectNetwork('4123456789012345678'),'Visa')
  });

});

describe('MasterCard', function() {
  // Chai lets you write more human-readable tests that throw helpful errors.
  // Expect syntax is one way to do this, but there are others. 
  // If you want to know more, check out the documentation. 
  //   http://chaijs.com/api/bdd/
  var expect = chai.expect;
 
  it('has a prefix of 51 and a length of 16', function() {
    expect(detectNetwork('5112345678901234')).to.equal('MasterCard');
  });
 
  it('has a prefix of 52 and a length of 16', function() {
    expect(detectNetwork('5212345678901234')).to.equal('MasterCard');
  });
 
  it('has a prefix of 53 and a length of 16', function() {
    expect(detectNetwork('5312345678901234')).to.equal('MasterCard');
  });
  it('has a prefix of 54 and a length of 16', function() {
    expect(detectNetwork('5412345678901234')).to.equal('MasterCard');
  });
  it('has a prefix of 55 and a length of 16', function() {
    expect(detectNetwork('5512345678901234')).to.equal('MasterCard');
  });
 

  // You can also use should instead of expect, which changes the style
  // slightly. It really doesn't matter which one you use - check out 
  // http://chaijs.com/guide/styles/ for more info, but it's important
  // to be consistent (unlike in this file, where we use BOTH expect
  // and should, but that's just for learning), so once you've gotten 
  // these tests to pass using should syntax, refactor your tests to 
  // use either expect or should, but not both. 
  
  /*
  var should = chai.should();
  
  it('has a prefix of 54 and a length of 16', function() {
    detectNetwork('5412345678901234').should.equal('MasterCard');
  });
 
  it('has a prefix of 55 and a length of 16', function() {
    detectNetwork('5512345678901234').should.equal('MasterCard');
  })
  */
 
});

describe('Discover', function() {
  // Tests without a function will be marked as "pending" and not run
  // Implement these tests (and others) and make them pass!
  
  let prefix = ["6011","644","645","646","647","648","649","65"];

  for (var i=0;i<prefix.length;i++) {
    discoverMocha(i,prefix);
  }

});
function discoverMocha(i,prefix) {
  var assert = chai.assert;
  it('has a prefix of '+prefix[i]+' and a length of 16', function() {
    assert.equal(detectNetwork(prefix[i]+'0'.repeat(16-prefix[i].length)),'Discover')
  });
  it('has a prefix of '+prefix[i]+' and a length of 19', function() {
    assert.equal(detectNetwork(prefix[i]+'0'.repeat(19-prefix[i].length)),'Discover')
  });
}

describe('Maestro', function() {

  let length_ = [12,13,14,15,16,17,18,19];
  
  for (var i=0;i<length_.length;i++) {
    maestroMocha(i,length_)
  }
});
function maestroMocha(i,length_) {

  var assert = chai.assert;
  it('has a prefix of 5018 and a length of '+length_[i].toString(), function() {
    assert.equal(detectNetwork('5018'+'0'.repeat(length_[i]-4)),'Maestro')
  });
  it('has a prefix of 5020 and a length of '+length_[i].toString(), function() {
    assert.equal(detectNetwork('5020'+'0'.repeat(length_[i]-4)),'Maestro')
  });
  it('has a prefix of 5038 and a length of '+length_[i].toString(), function() {
    assert.equal(detectNetwork('5038'+'0'.repeat(length_[i]-4)),'Maestro')
  });
  it('has a prefix of 6304 and a length of '+length_[i].toString(), function() {
    assert.equal(detectNetwork('6304'+'0'.repeat(length_[i]-4)),'Maestro')
  });
};

describe('should support China UnionPay', function() {

  let prefix = ["624","625","626"]
  let length = [16,17,18,19]

  for (var i=622126;i<=622925;i++) {
    prefix.push(i.toString())
  }
  for (var i=6282;i<=6288;i++) {
    prefix.push(i.toString())
  }
  
  for (var i=0;i<prefix.length;i++) {
    for (var j=0;j<length.length;j++) {
      chinaMocha(i,j,prefix,length)
    }
  }
});
function chinaMocha(i,j,prefix,length) {

  var assert = chai.assert;
  it('has a prefix of '+prefix[i]+' and a length of '+length[j].toString(), function() {
    assert.equal(detectNetwork(prefix[i]+'0'.repeat(length[j]-prefix[i].length)),'China UnionPay')
  });
}



describe('should support Switch', function() {

  let prefix = ["4903","4905","4911","4936","564182","633110","6333","6759"]
  let length = [16,18,19]
  
  for (var i=0;i<prefix.length;i++) {
    for (var j=0;j<length.length;j++) {
      switchMocha(i,j,prefix,length)
    }
  }
});
function switchMocha(i,j,prefix,length) {

  var assert = chai.assert;
  it('has a prefix of '+prefix[i]+' and a length of '+length[j].toString(), function() {
    assert.equal(detectNetwork(prefix[i]+'0'.repeat(length[j]-prefix[i].length)),'Switch')
  });
}


