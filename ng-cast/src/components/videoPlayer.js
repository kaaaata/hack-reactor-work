angular.module('video-player')
.component('videoPlayer', {
  controller: function() {
    //work on iframeContent property below
    this.checkIfVideo = function() {
      if (this.video) {
        return 'https://www.youtube.com/embed/' + this.video.id.videoId;
      } else {
        console.log('no video');
        return '';
      }
    };
  },
  bindings: {
    video: '<'
  },
  
  templateUrl: 'src/templates/videoPlayer.html'
});
