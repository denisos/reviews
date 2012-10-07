
(function (reviews, Backbone, $, _) {

    // BookCollection
    //

    //  convenience references to top level models and views namespaces
    var c = reviews.collections,
        m = reviews.models;

    c.BookCollection = Backbone.Collection.extend({
		model: m.BookRModel,

        initialize: function() {
        }
    });

}(window.reviews, Backbone, jQuery, _));