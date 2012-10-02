# Reviews Node Apps

# Usage

### Starting reviews locally from /reviews

    node bin/server

*Now you can visit http://localhost:8080 to view your application*

### Deploy helloworld to nodejitsu

    jitsu deploy

*You will now be prompted for a `subdomain` to deploy your application on*


# Next
- how to put mongodb results into index.html page - done!
- add some backbone
- pull in some data from google library api
- I'm using home grown routing partly as a means to learn but a web framework like express would be better


# Nodejitsu handbook
https://github.com/nodejitsu/handbook  


# References and Book
Node Cookbook, Clements, Safari books
http://www.mongodb.org/display/DOCS/node.JS
https://github.com/christkv/mongodb-presentation
http://www.slideshare.net/ggoodale/getting-started-with-mongodb-and-nodejs
http://mongodb.github.com/node-mongodb-native/api-articles/nodekoarticle1.html


# Node
Is not a full stack framework like RoR. But there are add ons such as Express which is a web framework with MongoDB support built in. Jitsu are promoting the new Flatiron framework.

# MongoDB
Collections are akin to tables in Relational DB. Collections store json documents.

# MongoDB
## List the dbs
jitsu databases list

## MongoDB creation command I ran

jitsu databases create mongo reviewsMongo
info:    Welcome to Nodejitsu deniskos
info:    jitsu v0.9.8
info:    It worked if it ends with Nodejitsu ok
info:    Executing command databases create mongo reviewsMongo
info:    A new mongo has been created
data:    Database Type: mongo
data:    Database Name: reviewsMongo
data:    Connection url: mongodb://nodejitsu:a3bf2896d17cbf1cd4068210f8fa9bb8@alex.mongohq.com:10042/nodejitsudb93315994410
help:    
help:    Connect with the `mongo` cli client:
help:    
             $ mongo alex.mongohq.com:10042/nodejitsudb93315994410 -u nodejitsu -p a3bf2896d17cbf1cd4068210f8fa9bb8
help:    
help:    Connect with the `mongodb-native module`:
help:    
             var mongodb = require('mongodb');
             var db = new mongodb.Db('nodejitsudb93315994410',
               new mongodb.Server('alex.mongohq.com', 10042, {})
             );
             db.open(function (err, db_p) {
               if (err) { throw err; }
               db.authenticate('nodejitsu', 'a3bf2896d17cbf1cd4068210f8fa9bb8', function (err, replies) {
                 // You are now connected and authenticated.
               });
             });
help:    
help:    Connect with the `mongoose` module:
help:    
             var mongoose = require('mongoose');
             mongoose.connect('mongodb://nodejitsu:a3bf2896d17cbf1cd4068210f8fa9bb8@alex.mongohq.com:10042/nodejitsudb93315994410');
help:    
info:    Nodejitsu ok