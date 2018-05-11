var VideoPlayerView = Backbone.View.extend({

  initialize: function() {
    this.collection.on('sync', this.render, this);
  },

  render: function() {
    this.$el.html(this.template());
    return this.$el;
  }, 

  template: templateURL('src/templates/videoPlayer.html')

});

