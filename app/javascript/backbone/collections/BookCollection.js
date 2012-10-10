
(function (reviews, Backbone, $, _) {

    // BookCollection
    //

    //  convenience references to top level models and views namespaces
    var c = reviews.collections,
        m = reviews.models;

    c.BookCollection = Backbone.Collection.extend({
        url: function() {
            return 'https://www.googleapis.com/books/v1/volumes?q=' + this.searchTerm;
        },

		model: m.BookModel


    });

}(window.reviews, Backbone, jQuery, _));