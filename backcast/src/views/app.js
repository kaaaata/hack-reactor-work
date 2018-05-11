var AppView = Backbone.View.extend({
  el: '#app',
  dummy: new Video({
    'kind': 'youtube#searchResult',
    'etag': 'm2yskBQFythfE4irbTIeOgYYfBU/fb8yVdyj75cLQhkuYlAvqUCq69A',
    'id': {
      'kind': 'youtube#video',
      'videoId': '4WJLlWpzpP0'
    },
    'snippet': {
      'publishedAt': '2015-02-27T05:29:08.000Z',
      'channelId': 'UC8Szh5ZJeGFBWyqKyTCVPpA',
      'title': 'Learn Backbone.js Tutorial by Building an App! (1/6) - Models and Collections',
      'description': 'Learn how to create a blogroll app using BackboneJS. In this video, we talk about how to use models and collections. Github source code: This part (clientside) ...',
      'thumbnails': {
        'default': {
          'url': 'https://i.ytimg.com/vi/4WJLlWpzpP0/default.jpg',
          'width': 120,
          'height': 90
        },
        'medium': {
          'url': 'https://i.ytimg.com/vi/4WJLlWpzpP0/mqdefault.jpg',
          'width': 320,
          'height': 180
        },
        'high': {
          'url': 'https://i.ytimg.com/vi/4WJLlWpzpP0/hqdefault.jpg',
          'width': 480,
          'height': 360
        }
      },
      'channelTitle': 'Learn Coding Tutorials',
      'liveBroadcastContent': 'none'
    }
  }),

  initialize: function() {
    this.videos = new Videos(window.exampleVideoData.map(v => new Video(v)));
    this.render();
    this.videoListView.collection.on('sync', this.render, this);
    this.searchView.collection.on('sync', this.render, this);
    this.videoPlayerView.collection.on('sync', this.render, this);
  },


  render: function() {
    this.$el.html(this.template());
// pass in a single model
    this.videoPlayerView = new VideoPlayerView({ collection: this.videos, model: this.dummy, el: '.player'});
    this.videoListView = new VideoListView({ collection: this.videos, el: '.list'});
    this.searchView = new SearchView({ collection: this.videos, el: '.search'});
    this.searchView.render();
    this.videoPlayerView.render();
    this.videoListView.render();
    

    // this.$('.search').html(this.searchView.render());
    // this.$('.player').html(this.videoPlayerView.render());
    // this.$('.list').html(this.videoListView.render());
    return this;
  },
  template: templateURL('src/templates/app.html')


});





// var AppView = Backbone.View.extend({

//   events: {
//     'click form input': 'handleClick'
//   },

//   handleClick: function(e) {
//     var field = $(e.target).val();
//     this.collection.sortByField(field);
//   },

//   render: function() {
//     new MoviesView({
//       el: this.$('#movies'),
//       collection: this.collection
//     }).render();
//   }

// });





// var commentList = [
//   new Comment('Doug!'), // default to 0 votes
//   new Comment('Doug?', 1),
//   new Comment('Doug.', 2),
//   new Comment('"Doug".', 3),
//   new Comment('Doug?!', 4)];

// // Add all of these to a new collection:
// var comments = new Comments(commentList);

// // Associate a view to the collection:
// var commentsView = new CommentsView({ collection: comments });

// // Append it to the page (uncomment this when you are ready):
//  $('body').append(commentsView.render());
