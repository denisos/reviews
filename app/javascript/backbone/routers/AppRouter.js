
(function (reviews, Backbone, $, _) {

    // Application Router
    // -------------------
    // The router will listen for URL changes and 
    // map to the specific controller that will handle the 
    // request.
    //

    //  convenience references to top level models and views namespaces
    var r = reviews.routers;

    r.AppRouter = Backbone.Router.extend({
        // keys are url paths and values methods to call
        // for prototype, home is productList
        routes: {
            '': 'home',
            'review': 'home'
        },

        initialize: function() {
        },

        // intro
        //
        home: function() {
            console.log("AppRouter - intro page");

            // render home view
           // var homeView = new v.HomeView();
           // homeView.render();
        }
    });

}(window.reviews, Backbone, jQuery, _));
