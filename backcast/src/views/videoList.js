var VideoListView = Backbone.View.extend({

  initialize: function() {
    this.collection.forEach(function(item) {
      item.collection.on('sync', this.render, this);
    }, this);
    this.collection.on('sync', this.render, this);
  },

  render: function() {
    alert('rendered');
    this.$el.children().detach();
    this.$el.html(this.template());
    this.collection.forEach(this.renderVideo, this);
    return this.$el;
  },

  renderVideo: function(video) {
    this.$('.video-list').append(new VideoListEntryView({collection: this.collection, model: video}).render());
  },

  // renderVideo: function(video) {
  //   var videoListEntry = new VideoListEntryView({model: video});
  //   this.$el.append(videoListEntry.render().el);
  // },

  template: templateURL('src/templates/videoList.html')

});


// videoListEntry.render()