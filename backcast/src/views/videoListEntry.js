var VideoListEntryView = Backbone.View.extend({
  template: _.template('<div class="video-list-entry media"> \
                          <div class="media-left"> \
                            <img class="media-object" src="https://i.ytimg.com/vi/<%- id %>/default.jpg" /> \
                          </div> \
                          <div class="media-body"> \
                            <div class="video-list-entry-title"><%- snippet.title %></div> \
                            <div class="video-list-entry-detail"><%- snippet.description %></div> \
                          </div> \
                        </div>'),
  events: {
    'click div.video-list-entry-title': 'handleClick'
  },

  handleClick: function() {

    this.videoPlayerView = new VideoPlayerView({ model: this.model, el: '.player'});
    this.videoPlayerView.render();
  },

  initialize: function() {
    debugger;
    this.model.on('select', this.render, this);
    this.collection.on('sync', this.render, this);
  },
  
  render: function() {
    this.$el.html(this.template(this.model.attributes));
    return this.$el;
  },

  //template: templateURL('src/templates/videoListEntry.html')

});

  // template: _.template('<div class="movie"> \
  //                         <div class="like"> \
  //                           <button><img src="images/<%- like ? \'up\' : \'down\' %>.jpg"></button> \
  //                         </div> \
  //                         <span class="title"><%- title %></span> \
  //                         <span class="year">(<%- year %>)</span> \
  //                         <div class="rating">Fan rating: <%- rating %> of 10</div> \
  //                       </div>'),