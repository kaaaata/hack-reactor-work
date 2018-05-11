window.WobbleDancer = class WobbleDancer extends Dancer {
  
  constructor(top, left, timeBetweenSteps) {
    super(top, left, timeBetweenSteps);
  }
  
  step() {
    super.step();
    this.$node.toggleClass('animated ' + 'wobble');
  }
  
};


