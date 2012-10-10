
(function (reviews, Backbone, $, _) {

    // BookReviewModel a single book review
    //
    reviews.models.BookReviewModel = Backbone.Model.extend({
        url: function() {
            return '/reviews/' + this.get("isbn");
        }
    });

}(window.reviews, Backbone, jQuery, _));