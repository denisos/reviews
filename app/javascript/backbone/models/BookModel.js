
(function (reviews, Backbone, $, _) {

    // BookModel represents a book
    //
    reviews.models.BookModel = Backbone.Model.extend({
        parse: function(response) {
            console.log(response);
        }
    });

}(window.reviews, Backbone, jQuery, _));