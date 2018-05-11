angular.module('video-player')
.component('search', {
  bindings: {
    searchResults: '<',
    result: '<'
  },
  controller: function() {
    this.query = '';
  },

  templateUrl: 'src/templates/search.html'
});
