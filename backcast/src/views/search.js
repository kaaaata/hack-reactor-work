var SearchView = Backbone.View.extend({

  events: {
    'click button.btn': 'handleClick'
  },

  handleClick: function() {
    console.log($('.form-control').val());
    this.collection.search($('.form-control').val());
    this.collection.trigger('sync');
  },
  render: function() {
    this.$el.html(this.template());
    return this.$el;
  },

  template: templateURL('src/templates/search.html')

});


// <div class="search-bar form-inline">
//   <input class="form-control" type="text" />
//   <button class="btn">
//     <span class="glyphicon glyphicon-search"></span>
//   </button>
// </div>
