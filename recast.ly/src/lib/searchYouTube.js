var searchYouTube = (options, callback) => {
  //{ key: 'API_KEY', query: 'cats', max: 10 } options and send them in GET request
  let ajaxInput = {'q': options.query, 'maxResults': options.max, 'key': options.key || window.YOUTUBE_API_KEY, 'part': 'snippet' };
  $.ajax({
// This is the url you should use to communicate with the parse API server.
    url: 'https://www.googleapis.com/youtube/v3/search',
    type: 'GET',
    data: ajaxInput,
    dataType: 'jsonp',
    success: function (data) {
      callback.call(this, data.items);
      
    },
    error: function (data) {
      // See: https://developer.mozilla.org/en-US/docs/Web/API/console.error
      console.error('react: Failed to send message', data);
    }
  });
};

window.searchYouTube = searchYouTube;
