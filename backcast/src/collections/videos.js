var Videos = Backbone.Collection.extend({

// push search button event listener, invokes search with form input



  model: Video,

  search: function(str) {
    //str = search form input
    let ajaxInput = {'q': str, 'maxResults': 5, 'key': window.YOUTUBE_API_KEY, 'part': 'snippet' };
    console.log(1, this);
//console.log(ajaxInput)
    $.ajax({
  // This is the url you should use to communicate with the parse API server.
      url: 'https://www.googleapis.com/youtube/v3/search',
      type: 'GET',
      data: ajaxInput,
      dataType: 'jsonp',
      success: function (data) {
        window.exampleVideoData = [];

        data.items.forEach(function(item) {
          window.exampleVideoData.push(item);
        });
      },
      error: function (data) {
        // See: https://developer.mozilla.org/en-US/docs/Web/API/console.error
        console.error('chatterbox: Failed to send message', data);
      }
    });
  }
});

        // // Approach 2:
        // // trigger app to re-render

        // // Approach 1: for each item from Youtube, instantiate a new video, and add to videos
        // data.items.forEach(item => new Video(item));

// dummy: new Video({
//     'kind': 'youtube#searchResult',
//     'etag': 'm2yskBQFythfE4irbTIeOgYYfBU/fb8yVdyj75cLQhkuYlAvqUCq69A',
//     'id': {
//       'kind': 'youtube#video',
//       'videoId': '4WJLlWpzpP0'
//     },
//     'snippet': {
//       'publishedAt': '2015-02-27T05:29:08.000Z',
//       'channelId': 'UC8Szh5ZJeGFBWyqKyTCVPpA',
//       'title': 'Learn Backbone.js Tutorial by Building an App! (1/6) - Models and Collections',
//       'description': 'Learn how to create a blogroll app using BackboneJS. In this video, we talk about how to use models and collections. Github source code: This part (clientside) ...',
//       'thumbnails': {
//         'default': {
//           'url': 'https://i.ytimg.com/vi/4WJLlWpzpP0/default.jpg',
//           'width': 120,
//           'height': 90
//         },
//         'medium': {
//           'url': 'https://i.ytimg.com/vi/4WJLlWpzpP0/mqdefault.jpg',
//           'width': 320,
//           'height': 180
//         },
//         'high': {
//           'url': 'https://i.ytimg.com/vi/4WJLlWpzpP0/hqdefault.jpg',
//           'width': 480,
//           'height': 360
//         }
//       },
//       'channelTitle': 'Learn Coding Tutorials',
//       'liveBroadcastContent': 'none'
//     }
//   }),