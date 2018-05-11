angular.module('video-player')
.component('videoListEntry', {
  controller: function() {
    //console.log(this);
  },
  bindings: {
    video: '<',
    onClick: '<'
  },
  templateUrl: 'src/templates/videoListEntry.html'
});
