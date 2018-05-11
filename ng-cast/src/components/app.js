angular.module('video-player')
.component('app', {
  controller: function($http, youTube) {
    this.selectVideo = () => {};
    this.currentVideo = window.exampleVideoData[0];
    this.videos = window.exampleVideoData;
    this.result = (searchresults) => { // render the page, bind to app instance};
      this.videos = searchresults;
    };
    this.searchResults = (q) => { 
      youTube.callService(q);
    };
    
  },
  templateUrl: 'src/templates/app.html'
});
/*
var searchYouTube = (options, callback) => {
  // TODO
  var query = options.query || 'the Netherlands';
  var max = options.max || 5;
  var key = options.key || window.YOUTUBE_API_KEY;
      // $.ajax({
      //   url: 'https://www.googleapis.com/youtube/v3/search',
      //   method: 'GET',
      //   dataType: 'json',
      //   data: {
      //     'key': window.YOUTUBE_API_KEY,
      //     'q': query,
      //     'maxResults': 5,
      //     'part': 'snippet',
      //     'type': 'video',
      //     'videoEmbeddable': true
      //   },
      //   success: (data) => {
      //     console.log('success got data');
          
      //     callback(data.items);
      //   },
      //   error: (data) => {
      //     console.log('FAILED to get data');
      //   }

      // }; // AJAX call function
    
  });
*/
