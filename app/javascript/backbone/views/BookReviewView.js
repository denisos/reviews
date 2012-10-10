

(function (reviews, Backbone, $, _, dust) {

  //  convenience references to top level models and views namespaces
  var c = reviews.collections,
      v = reviews.views,
      r = reviews.routers;

  /*
   * View used to add a new review or display existing review
   *
   * @class BookReviewView 
   */
  v.BookReviewView = Backbone.View.extend({

    el: '#content',

    events: {
       'click #save'    : 'handleSaveBookReview',
       'keypress #title'   : 'handleTitleKeypress'
    },

    /*
     * called once at creation
     *
     * @method initialize
     */ 
    initialize: function () {
        _.bindAll(this, 'render');

        // bind to the book review
        //this.model.bind('change', this.render, this);
    },

    /*
     * show this review or allow create new
     *
     * @method render
     */    
    render: function () {
        var self = this,
            data = this.model.toJSON();

        // render the book review page passing data to run through template proper
        //
        dust.render("addreview_addreview", data, function (err, output) {
            if (err) { throw err; }

            self.$el.html(output);

        });
      
        return this;
    },   

    handleSaveBookReview: function(event) {
        console.log("handleSaveBookReview");

        var self = this;

        // prevent the default link click behavior
        event.preventDefault();

        this.model.set("isbn", $('#isbn').val());
        this.model.set("title", $('#title').val());
        this.model.set("review", $('#review').val());
        this.model.set("thumbImg", v.BookReviewView.PLACEHOLDER_THUMB_IMG);

        // on save success add the model to the local collection
        this.model.save({}, 
                       {success: function() {
                                c.bookReviewColln.add(self.model);

                                // return to home page
                                r.appRouter.navigate('', {trigger: true});
                            } 
                        }
        );
    },

    handleTitleKeypress: function(event) {
        console.log('keypress char: ', String.fromCharCode(event.which));
    }

  },
  {
    PLACEHOLDER_THUMB_IMG: "http://bks9.books.google.com/books?id=ezFihJmC8qAC&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api"

  });

}(window.reviews, Backbone, jQuery, _, dust));