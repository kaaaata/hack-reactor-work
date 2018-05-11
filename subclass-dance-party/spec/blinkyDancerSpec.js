describe('blinkyDancer', function() {

  var blinkyDancer, clock;
  var timeBetweenSteps = 100;

  beforeEach(function() {
    clock = sinon.useFakeTimers();
    blinkyDancer = new BlinkyDancer(10, 20, timeBetweenSteps);
  });

  it('should have a jQuery $node object', function() {
    expect(blinkyDancer.$node).to.be.an.instanceof(jQuery);
  });

  it('should have a step function that makes its node flash', function() {
    sinon.spy(blinkyDancer.$node, 'toggleClass');
    blinkyDancer.step();
    expect(blinkyDancer.$node.toggleClass.called).to.be.true;
  });
  
  
  it('should be an instanceof Dancer', function() {
    expect(blinkyDancer).to.be.an.instanceof(Dancer);
  });
  
  it('should have a top and left property', function() {
    expect(blinkyDancer.top).to.be.equal(10);
    expect(blinkyDancer.left).to.be.equal(20);
  });

  describe('dance', function() {
    it('should call step at least once per second', function() {
      sinon.spy(blinkyDancer, 'step');
      expect(blinkyDancer.step.callCount).to.be.equal(0);
      clock.tick(timeBetweenSteps); // ? it seems an extra tick is necessary...
      clock.tick(timeBetweenSteps);

      expect(blinkyDancer.step.callCount).to.be.equal(1);

      clock.tick(timeBetweenSteps);
      expect(blinkyDancer.step.callCount).to.be.equal(2);
    });
  });
});
