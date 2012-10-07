


(function (reviews, Backbone, $, _, dust) {

  /*
   * BookReviewsView - displays all the book reviews
   *
   */
  reviews.views.BookReviewsView = Backbone.View.extend({

    el: '#content',

    events: {
       'click .bookReviewDetails'    : 'handleReviewEdit',
       'click #addBookReview'        : 'handleAddReview'

    },

    initialize: function () {
        _.bindAll(this, 'render');

        this.options.reviews.bind('reset', this.render, this);
    },

    /*
     * render the page with data
     *
    */    
    render: function () {
        var self = this,
            data = {reviews: this.options.reviews.toJSON()};

        // render the reviews page passing data to run through template proper
        //
        dust.render("home_index", data, function (err, output) {
            if (err) { throw err; }

            self.$el.html(output);

        });
      
        return this;
    },   

    handleReviewEdit: function(event) {
        console.log("handleReviewEdit");

	},

    handleAddReview: function(event) {
        console.log("handleAddReview");

	}

  });

}(window.reviews, Backbone, jQuery, _, dust));