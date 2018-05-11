angular.module('video-player')
.service('youTube', function($http) {
  this.callService = function(q) {
    $http({
      method: 'GET',
      url: 'https://www.googleapis.com/youtube/v3/search',
      params: {query: q,
        maxResults: 5, 
        key: window.YOUTUBE_API_KEY, 
        videoEmbeddable: true
      },
    }).then(function successCallback(response) {
      console.log('the response from $http is :', response);
      this.currentVideo = response.data[0];
      this.videos = response.data;
      return;
    }, function errorCallback(response) {
      console.log(response);
      console.log('error callback in search');
      return;
        // called asynchronously if an error occurs
        // or server returns response with an error status.
    });
  };
});

/*
function fetch(){
  $http.get("http://www.omdbapi.com/?t=" + $scope.search + "&tomatoes=true&plot=full")
  .then(function(response){ $scope.details = response.data; });

  $http.get("http://www.omdbapi.com/?s=" + $scope.search)
  .then(function(response){ $scope.related = response.data; });
}
*/