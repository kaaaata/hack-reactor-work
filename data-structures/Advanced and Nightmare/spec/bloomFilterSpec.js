describe('bloomFilter', function() {
  var bloomFilter;

  beforeEach(function() {
    bloomFilter = new BloomFilter();
  });

  it('should have an array with 18 slots', function() {
    expect(Array.isArray(bloomFilter.bitArray)).to.equal(true);
    expect(bloomFilter.bitArray.length).to.equal(18);
  });

  it('should have 3 hashing functions', function() {
    expect(bloomFilter.hashMix5).to.be.a('function');
    expect(bloomFilter.hashMix10).to.be.a('function');
    expect(bloomFilter.hashMix15).to.be.a('function');    
  });

  it('should have each hashing function returning a valid index value for key input', function() {
    var hashMix5HashingOutput = bloomFilter.hashMix5('dog', 18);
    var hashMix10HashingOutput = bloomFilter.hashMix10('cat', 18);
    var hashMix15HashingOutput = bloomFilter.hashMix15('fish', 18); 

    expect(hashMix5HashingOutput >= 0 && hashMix5HashingOutput < 18).to.equal(true);    
    expect(hashMix10HashingOutput >= 0 && hashMix10HashingOutput < 18).to.equal(true); 
    expect(hashMix15HashingOutput >= 0 && hashMix15HashingOutput < 18).to.equal(true); 

    expect((Number.isInteger(hashMix5HashingOutput))).to.equal(true);
    expect((Number.isInteger(hashMix10HashingOutput))).to.equal(true);
    expect((Number.isInteger(hashMix15HashingOutput))).to.equal(true);


  });

  it('should have methods named "insert", and "retrieve', function() {
    expect(bloomFilter.insert).to.be.a('function');
    expect(bloomFilter.retrieve).to.be.a('function');
  });
  
  it('Empirical rate of false-positives should tend towards approximation equation as n tends towards 10,000', function() {
    var keysEnteredIntoFilter = ['dog', 'cat', 'fish'];
    
    bloomFilter.insert('dog');
    bloomFilter.insert('cat');
    bloomFilter.insert('fish');

    var sumOfFalsePositives = 0;

    var rateDiffAt100Retrievals, rateDiffAtEndOfRetrievals;

    for (var i = 0; i < 10000; i++) {
      if (bloomFilter.retrieve('dog' + i)) {
        sumOfFalsePositives++;
      }
      if (i === 100) {
        debugger;
        rateDiffAt100Retrievals = Math.abs((sumOfFalsePositives / i) - Math.pow((1 - (Math.pow(Math.E, (-3 * 3 / 18)))), 3));
      }

      if (i === 9999) {
        debugger;
        rateDiffAtEndOfRetrievals = Math.abs((sumOfFalsePositives / i) - Math.pow((1 - (Math.pow(Math.E, (-3 * 3 / 18)))), 3));
      }
    }

    expect(rateDiffAt100Retrievals > rateDiffAtEndOfRetrievals).to.equal(true);

  });



});