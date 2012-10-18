
/*
 * This module exports a constructor function which provides the means to construct
 *  objects which provide basic crud options (in this case to a mongo db)
 *
 * The object constructor api provides methods as follows:
 *   list - returns array of all reviews as javascript objects 
 *   seed - populates reviewDocs into storage
 *   remove - removes all reviewDocs from storage
 *   add - adds a review javascript object into storage
 *
 *  To use:
 *   1. require the module e.g. StorageCrud = require('./storeCrud');
 *   2. create a new object instance passing db options e.g.
 *     var reviewsStore = new StorageCrud({databaseName: '...'} );
 *   3. call methods on the new instance passing callback success & error
 *    reviewsStore.method(successCallback, errorCallback);
 *   e.g.
 *    reviewsStore.seed(successCallback, errorCallback);
 *
 */
module.exports = (function() {

    function StorageCrud(options) {
        this.dbConfig = _isOptionsValid(options); 

        console.log("StorageCrud ctor: ", options, this.dbConfig);

        // even if not called with new will create a new object
        if (! (this instanceof StorageCrud)) {
            console.log("StorageCrud ctor not instance of this");

            return new StorageCrud();
        }

        // initialize the db connection
        //  auto_reconnect tells the driver to retry sending a command 
        //   to the server if there is a failure
        // http://mongodb.github.com/node-mongodb-native/api-generated/db.html
        //
        this.db = new mongodb.Db(this.dbConfig.databaseName,
            new mongodb.Server(this.dbConfig.server, 
                               this.dbConfig.port, 
                               {auto_reconnect: true})
        );

        // open the db connection at start, 
        // will be available for all subsequent requests
        // expect there's a cleaner way to do this but this is just a POC
        //
        this.db.open(function (err, db_p) {
            if (err) { throw err; }
        }); 

        console.log("StorageCrud ctor finished ok");

    }

    /*
     * this function will check options and an object with the options
     *  in it if valid, else throws Error
     *
     * @param {Object} options
     * @return {Object} dbConfig
     */  
    function _isOptionsValid(options) {     
        var dbConfig = {};

        if (!options) {
            throw new Error("Please pass db options");
        }

        dbConfig.databaseName = options.databaseName;
        dbConfig.server = options.server || 'localhost';
        dbConfig.port = options.port || 27017;
        dbConfig.collection = options.collection;

        if (options.authInfo) {
            console.log("setting authInfo");

            dbConfig.authInfo = {};
            dbConfig.authInfo.user = options.authInfo.user;
            dbConfig.authInfo.password = options.authInfo.password; 
        } 
        dbConfig.authenticate = dbConfig.authInfo !== null;

        return dbConfig;
    }

    /*
     * this function will add a new docs to the storage, thereby seeding it
     *
     * @param [array] docsToAdd to persist
     * @param {Function} succcess callback
     * @param {Function} error callback
     */  
    StorageCrud.prototype.seed = function (success, error) {
        var self = this;

        console.log('seedData');
             

        self.db.authenticate(this.dbConfig.authInfo.user, 
                             this.dbConfig.authInfo.password, function (err, replies) { 
            // You are now connected and authenticated.

            console.log('Err after authn is ', err);    


            // insert 2 book reviews, then close and exit
            //
            // createCollection creates the collection
            //db.createCollection('bookReviews', function(err, colln) { 
            self.db.collection(self.dbConfig.collection, function(err, colln) {

                colln.insert({ 
                    isbn: '9780312536633',
                    title: 'The Forever War',
                    thumbImg: 'http://bks2.books.google.com/books?id=l4lxLsH2n3YC&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api',
                    myReview: 'I loved this book, read it over Labor Day holiday weekend when I really needed to rest and relax. I really like how easy it is to read and believe in. I easily believed what the author was writing'
                }, function(){});

                colln.insert({ 
                    isbn: '9780307592811',
                    title: 'Aftershock',
                    thumbImg: 'http://bks2.books.google.com/books?id=y6Qu2brXO6oC&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api',
                    myReview: 'I feel like the Obama administration and their message of building up the middle class have been reading this authors work, and about time too! '
                }, function(){});

                // invoke the success callback
                success();  
            
            });
        });
    };

    /*
     * this function will delete all docs in the collection
     *
     * @param {object} doctoAdd to persist
     * @param {Function} succcess callback
     * @param {Function} error callback
     */      
    StorageCrud.prototype.remove = function (success, error) {
        var self = this;
        
        console.log('removeData');

        self.db.authenticate(self.dbConfig.authInfo.user, 
                             self.dbConfig.authInfo.password,  function (err, replies) {   

            self.db.collection(self.dbConfig.collection, function(err, colln) {

                //  removes all
                colln.remove({}, {safe:true}, function(err, num) {
                    console.log('Err after remove is ', err, num);  
                }); 

                // deletes one,
                //colln.remove({googleId: 'l4lxLsH2n3YC'}, {safe:true}, function(err, num) {
                //      console.log('Err after remove is ', err, num);  
                //});   

                // invoke the success callback
                success();           
            });
        });
    };
    
    /*
     * this function will return a collection of docs
     *
     * @param {Function} succcess callback
     * @param {Function} error callback
     */      
    StorageCrud.prototype.list = function (success, error) {
        var self = this;

        console.log('home page requested');

        self.db.authenticate(self.dbConfig.authInfo.user, 
                             self.dbConfig.authInfo.password, function (err, replies) { 
            // You are now connected and authenticated.

            console.log('Authn status ', err);  

            // read book reviews
            self.db.collection(self.dbConfig.collection, function(err, collection) {

                // toArray() is a shortcut which will not work for large sets of data
                //   would have to use stream or pagination or other for larger, real world
                //
                collection.find().toArray(function(err, items) {
                    console.log('items: ', items);

                    // call the success callback with items
                    success(items); 
                }); 
            });
        });
    };

    /*
     * this function will add a new doc to the storage
     *
     * @param {object} doctoAdd to persist
     * @param {Function} succcess callback
     * @param {Function} error callback
     */   
    StorageCrud.prototype.add = function(docToAdd, success, error) {
        var self = this;

        console.log('addReview');

        self.db.authenticate(self.dbConfig.authInfo.user, 
                             self.dbConfig.authInfo.password, function (err, replies) {          
            // You are now connected and authenticated.

            // insert the book review
            // 
            self.db.collection(self.dbConfig.collection, function(err, colln) {
                                
                colln.insert(docToAdd, function(){});

                success();
                             
            });
        });
    };

    // export the constructor function from this module
    //
    return StorageCrud;
    
})();    



/*  mongodb cursor example

var listData = function (res) {
    var buffer;

    console.log('listData');

    db.authenticate('nodejitsu', 'a3bf2896d17cbf1cd4068210f8fa9bb8', function (err, replies) { 
        // You are now connected and authenticated.

        console.log('Err after authn is ', err);    

        // read book reviews
        db.collection('bookReviews', function(err, collection) {
            collection.find(function(err, cursor) {
                cursor.each(function(err, item) {
                    console.log('book: ', item);

                    //res.end(fs.readFileSync(__dirname + '/index.html'));  
                });
            }); 
        });
    });
};
*/
