
(function (reviews, Backbone, $, _) {

    // BookReviewsCollection
    //

    //  convenience references to top level models and views namespaces
    var c = reviews.collections,
        m = reviews.models;

    c.BookReviewCollection = Backbone.Collection.extend({
        url: '/reviews',

        model: m.BookReviewModel,

        initialize: function() {
        }
    });

    
}(window.reviews, Backbone, jQuery, _));