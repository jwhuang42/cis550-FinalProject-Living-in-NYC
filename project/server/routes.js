var config = require('./db-config.js');
var mysql = require('mysql');

config.connectionLimit = 10;
var connection = mysql.createPool(config);

/* -------------------------------------------------- */
/* ------------------- Route Handlers --------------- */
/* -------------------------------------------------- */



/* ---- Best Airbnb ---- */

function getAccommodates(req, res) {
	var query = `
		SELECT DISTINCT accommodates
		FROM airbnb_property
		WHERE accommodates > 0
		ORDER BY accommodates;
  	`;
	connection.query(query, function(err, rows, fields) {
		if (err) console.log(err);
		else {
			console.log(rows);
		  	res.json(rows);
		}
	});
}

function getBeds(req, res) {
	var query = `
		SELECT DISTINCT beds
		FROM airbnb_property
		WHERE beds > 0
		ORDER BY beds;
    `;
    connection.query(query, function(err, rows, fields) {
        if (err) console.log(err);
        else {
			console.log(rows);
            res.json(rows);
        }
    });
}

function getRoomType(req, res) {
	var query = `
		SELECT DISTINCT room_type
		FROM airbnb_property;
    `;
    connection.query(query, function(err, rows, fields) {
    	if (err) console.log(err);
    	else {
			console.log(rows);
            res.json(rows);
        }
    });
}

function bestAirbnb(req, res) {
    var inputNeighbourhood = req.params.neighbourhood;
    var inputAccomodates = req.params.accommodates;
    var inputBeds = req.params.beds;
    var inputRoomType = req.params.room_type;
    var inputPriceLow = req.params.price_low;
    var inputPriceHigh = req.params.price_high;

		inputRoomType = inputRoomType.replace("q", "/");
		inputRoomType = inputRoomType.replace(/_/g, " ");
		//console.log(inputRoomType);

    var query = `
		WITH airbnb AS (
			SELECT n.id, n.picture_url, h.host_url, h.host_name, n.name, p.accommodates, p.beds, p.price,
				FLOOR(r.review_scores_rating) AS rating, l.latitude, l.longitude, n.listing_url
			FROM airbnb_name n, airbnb_property p, airbnb_review r, airbnb_host h, airbnb_place l
	    	WHERE n.id = p.id AND n.id = r.id AND n.id = h.id AND n.id = l.id
				AND h.host_neighbourhood = '${inputNeighbourhood}'
	            AND p.accommodates >= ${inputAccomodates}
	            AND p.beds >= ${inputBeds} AND p.beds <= ${inputBeds} + 2
	            AND p.room_type = '${inputRoomType}'
	            AND p.price > ${inputPriceLow} AND p.price < ${inputPriceHigh}
		), crime_count AS (
			SELECT a.id, FLOOR(COUNT(*) / 9) AS num_crimes
			FROM airbnb a, crime c
			WHERE POWER((a.latitude - c.latitude) * 111139, 2)
				+ POWER((a.longitude - c.longitude) * 111139, 2) < POWER(800, 2)
			GROUP BY a.id
		), result AS (
			SELECT a.picture_url, a.name, a.accommodates, a.beds, a.price, a.rating, c.num_crimes,
				a.host_url, a.latitude, a.longitude, a.listing_url, a.host_name
			FROM airbnb a JOIN crime_count c ON a.id = c.id
			WHERE c.num_crimes < 100
			ORDER BY rating DESC
			LIMIT 10
		)
		SELECT picture_url, name, accommodates, beds, price, IFNULL(rating, 'N/A') AS rating, num_crimes,
			host_url, latitude, longitude, listing_url, host_name
		FROM result;
    `;
    connection.query(query, function(err, rows, fields) {
        if (err) console.log(err);
        else {
            console.log(rows);
            res.json(rows);
        }
    });
};



/* ---- Best Hotel ---- */

function bestHotel(req, res){
	var inputNeighbourhood = req.params.neighbourhood;
  var inputPriceLow = req.params.price_low;
  var inputPriceHigh = req.params.price_high;
	var inputClass = req.params.class;
	var inputService = req.params.service;
	var inputCleanliness = req.params.cleanliness;
	var inputValue = req.params.value;
	var inputLocation = req.params.location;
	var inputSleepQuality = req.params.sleep_quality;
	var inputRooms = req.params.rooms;

	var query = `
		WITH hotel_rating AS (
			SELECT name, street_address, hotel_class, postal_code, AVG(price) AS price, AVG(service) AS service,
				AVG(cleanliness) AS cleanliness, AVG(value) AS value, AVG(location_score) AS location,
				AVG(sleep_quality) AS sleep_quality, AVG(rooms) AS rooms, AVG(overall) AS overall
			FROM hotel
			GROUP BY name, street_address, hotel_class, postal_code
		), transformer AS (
			SELECT DISTINCT NEIGHBORHOOD, ZIPCODE
			FROM zillow
		), hotel_info AS (
			SELECT DISTINCT h.*, t.NEIGHBORHOOD AS neighbourhood
			FROM hotel_rating h JOIN transformer t ON h.postal_code = t.ZIPCODE
			ORDER BY name
		)
		SELECT name, street_address, hotel_class, price, overall
		FROM hotel_info
		WHERE neighbourhood = '${inputNeighbourhood}'
			AND price > ${inputPriceLow} AND price < ${inputPriceHigh}
			AND hotel_class > 3
			AND service > 4
			AND cleanliness > 4
			AND value > 4
			AND location > 4
			AND sleep_quality > 4
			AND rooms > 4
		ORDER BY overall DESC
		LIMIT 5;
    `;
    connection.query(query, function(err, rows, fields) {
    	if (err) console.log(err);
    	else {
			console.log(rows);
            res.json(rows);
        }
    });
}



/* ---- Best Living ---- */
function getPopularPlaces(req, res){
	var query = `
		WITH popPlace AS(
		SELECT neighborhood , Borough , count(*) as num
		FROM movie_scene
		GROUP BY neighborhood , Borough
		ORDER BY num DESC
		LIMIT 10
		)
		SELECT m.latitude, m.longitude, m.film, m.imdb_link, m.neighborhood, m.Borough, m.scene_type
		FROM movie_scene m
		JOIN popPlace p ON (m.neighborhood, m.Borough) = (p.neighborhood, p.Borough)
		ORDER BY p.num DESC
		LIMIT 40;
    `;
    connection.query(query, function(err, rows, fields) {
    	if (err) console.log(err);
    	else {
			console.log(rows);
            res.json(rows);
        }
    });
}



/* ---- Fun Facts ---- */

function avgRating(req, res) {
	var query = `
		SELECT h.host_neighbourhood, COUNT(*) AS count, AVG(r.review_scores_rating) AS avg_rating
		FROM airbnb_review r JOIN airbnb_host h ON r.id = h.id
		WHERE h.host_neighbourhood IS NOT NULL
		GROUP BY h.host_neighbourhood
		HAVING count > 100
		ORDER BY avg_rating DESC
		LIMIT 10;
    `;
    connection.query(query, function(err, rows, fields) {
    	if (err) console.log(err);
    	else {
			console.log(rows);
            res.json(rows);
        }
    });
}

function newHosts(req, res) {
	var query = `
		SELECT YEAR(host_since) AS year, COUNT(*) as num
		FROM airbnb_host
		WHERE YEAR(host_since) is NOT NULL
		GROUP BY YEAR(host_since)
		ORDER BY year;
    `;
    connection.query(query, function(err, rows, fields) {
    	if (err) console.log(err);
    	else {
			console.log(rows);
            res.json(rows);
        }
    });
}

function numMovies(req, res) {
	var query = `
		SELECT neighborhood, Borough, COUNT(*) as num
		FROM movie_scene
		GROUP BY neighborhood, Borough
		ORDER BY num DESC
		LIMIT 10;
    `;
    connection.query(query, function(err, rows, fields) {
    	if (err) console.log(err);
    	else {
			console.log(rows);
            res.json(rows);
        }
    });
}



// change the above
// The exported functions, which can be accessed in index.js.
module.exports = {
	getAccommodates: getAccommodates,
	getBeds: getBeds,
	getRoomType: getRoomType,
	bestAirbnb: bestAirbnb,

	bestHotel: bestHotel,

	getPopularPlaces: getPopularPlaces,

	avgRating: avgRating,
	newHosts: newHosts,
	numMovies: numMovies
}
