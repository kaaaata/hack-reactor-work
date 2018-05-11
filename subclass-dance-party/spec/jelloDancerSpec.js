describe('jelloDancer', function() {

  var jelloDancer, clock;
  var timeBetweenSteps = 100;

  beforeEach(function() {
    clock = sinon.useFakeTimers();
    jelloDancer = new JelloDancer(10, 20, timeBetweenSteps);
  });

  it('should have a jQuery $node object', function() {
    expect(jelloDancer.$node).to.be.an.instanceof(jQuery);
  });

  it('should have a step function that makes its node flash', function() {
    sinon.spy(jelloDancer.$node, 'toggleClass');
    jelloDancer.step();
    expect(jelloDancer.$node.toggleClass.called).to.be.true;
  });

  describe('dance', function() {
    it('should call step at least once per second', function() {
      sinon.spy(jelloDancer, 'step');
      expect(jelloDancer.step.callCount).to.be.equal(0);
      clock.tick(timeBetweenSteps); // ? it seems an extra tick is necessary...
      clock.tick(timeBetweenSteps);

      expect(jelloDancer.step.callCount).to.be.equal(1);

      clock.tick(timeBetweenSteps);
      expect(jelloDancer.step.callCount).to.be.equal(2);
    });
  });
});