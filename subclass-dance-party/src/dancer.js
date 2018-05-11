window.Dancer = class Dancer {
  
  constructor(top, left, timeBetweenSteps) {
    this.timeBetweenSteps = timeBetweenSteps;
    this.$node = $('<span class="dancer"><img src = "http://www.imagenspng.com.br/wp-content/uploads/2015/07/minions-02.png" alt="Minion"></span>');
    this.$node.hover(function() {
      let style = window.getComputedStyle(this);
      let currentX = style.getPropertyValue('left');
      let currentY = style.getPropertyValue('top');
      let dancerIndex = Math.floor(Math.random() * (window.dancers.length));
      let dancer = window.dancers[dancerIndex];
      let friendX = dancer.left;
      let friendY = dancer.top;
      currentX = friendX + 50 + Math.random() * 100;
      currentY = friendY + Math.random() * 100;     
      $(this).css({top: currentY, left: currentX});
    });
    this.$node.click(function() {
      $(this).remove();
    });
    this.step();
    this.top = top;
    this.left = left;
    this.setPosition(top, left);
  }
  
  step() {
    setTimeout(this.step.bind(this), this.timeBetweenSteps);
  }
  
  setPosition(top, left) {
    let styleSettings = {
      top,
      left
    };
    this.$node.css(styleSettings);
    
  }

  
};

// add feature to change css animation
// clearTimeout(this.timeOut);
// $(this).toggleClass('animated ' + 'rollOut');