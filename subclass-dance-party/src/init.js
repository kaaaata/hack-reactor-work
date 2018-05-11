$(document).ready(function() {
  window.dancers = [];

  $('.addDancerButton').on('click', function(event) {
    /* This function sets up the click handlers for the create-dancer
     * buttons on dancefloor.html. You should only need to make one small change to it.
     * As long as the "data-dancer-maker-function-name" attribute of a
     * class="addDancerButton" DOM node matches one of the names of the
     * maker functions available in the global scope, clicking that node
     * will call the function to make the dancer.
     */

    /* dancerMakerFunctionName is a string which must match
     * one of the dancer maker functions available in global scope.
     * A new object of the given type will be created and added
     * to the stage.
     */
    var dancerMakerFunctionName = $(this).data('dancer-maker-function-name');

    // get the maker function for the kind of dancer we're supposed to make
    var dancerMakerFunction = window[dancerMakerFunctionName];
    

    // make a dancer with a random position

    var dancer = new dancerMakerFunction(
      ($('body').height() - 175) * Math.random(),
      ($('body').width() - 175) * Math.random(),
      Math.random() * 1000
    );
    $('body').append(dancer.$node);
    window.dancers.push(dancer);
  });
  
  $('.eventButton').on('click', function(event) {
    
    let viewportWidth = $(window).width();
    let spacing = viewportWidth / window.dancers.length;
    let xPosition = 0;

    window.dancers.forEach(function(dancer) {
      xPosition += spacing;
      dancer.setPosition(200, xPosition);
    });

  });
  
  
  $('.partyButton').on('click', function(event) {
    window.dancers.forEach(function(dancer) {
      dancer.interval = setInterval(function() {
        dancer.$node.trigger('mouseenter');
      }, 1000);
    });

  });
  
  $('.endPartyButton').on('click', function(event) {
    window.dancers.forEach(function(dancer) {
      clearInterval(dancer.interval);
    });
  });
  
  
  $('.terminateButton').on('click', function(event) {
    let dancerIndex = Math.floor(Math.random() * (window.dancers.length));
    window.dancers[dancerIndex].$node.remove();
    window.dancers.splice([dancerIndex], 1);
  });
  
  
});
