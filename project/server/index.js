const bodyParser = require('body-parser');
const express = require('express');
var routes = require("./routes.js");
const cors = require('cors');

// potentially useful for connecting mongodb
/*var mongodb = require('mongodb');
var app = express();

var MongoClient = require('mongodb').MongoClient;
var db;

// Initialize connection once
MongoClient.connect("mongodb://localhost:27017/integration_test", function(err, database) {
  if(err) throw err;

  db = database;

  // Start the application after the database connection is ready
  app.listen(3000);
  console.log("Listening on port 3000");
});

// Reuse database object in request handlers
app.get("/", function(req, res) {
  db.collection("replicaset_mongo_client_collection").find({}, function(err, docs) {
    docs.each(function(err, doc) {
      if(doc) {
        console.log(doc);
      }
      else {
        res.end();
      }
    });
  });
});
*/


const app = express();

app.use(cors({ credentials: true, origin: 'http://localhost:3000' }));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

/* ---------------------------------------------------------------- */
/* ------------------- Route handler registration ----------------- */
/* ---------------------------------------------------------------- */


/* ---- Best Airbnb ---- */

app.get('/airbnb/accommodates', routes.getAccommodates);
app.get('/airbnb/beds', routes.getBeds);
app.get('/airbnb/room_type', routes.getRoomType);
app.get('/airbnb/:neighbourhood&:accommodates&:beds&:room_type&:price_low&:price_high', routes.bestAirbnb);

/* ---- Best Hotel ---- */

// app.get('/hotel/:neighbourhood&:price_low&:price_high&:class&:service&:cleanliness&:value&:location&:sleep_quality&:rooms', routes.hotel);

/* ---- Best Living ---- */

app.get('/movies/popular', routes.getPopularPlaces);

/* ---- Fun Facts ---- */

app.get('/funfacts/avgRating', routes.avgRating);
app.get('/funfacts/newHosts', routes.newHosts);
app.get('/funfacts/numMovies', routes.numMovies);



app.listen(8081, () => {
	console.log(`Server listening on PORT 8081`);
});
