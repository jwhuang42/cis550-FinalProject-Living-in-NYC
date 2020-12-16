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
			SELECT n.id, n.picture_url, n.name, n.listing_url, h.host_url, h.host_name,
				p.accommodates, p.beds, p.price, FLOOR(r.review_scores_rating) AS rating,
        		l.latitude, l.longitude, l.round_latitude, l.round_longitude
			FROM airbnb_name n
				JOIN airbnb_property p ON n.id = p.id
				JOIN airbnb_review r ON n.id = r.id
				JOIN airbnb_host h ON n.id = h.id
				JOIN round_airbnb_place l ON n.id = l.id
			WHERE h.host_neighbourhood = '${inputNeighbourhood}'
				AND p.accommodates >= ${inputAccomodates}
				AND p.beds >= ${inputBeds} AND p.beds <= ${inputBeds} + 2
				AND p.room_type = '${inputRoomType}'
				AND p.price > ${inputPriceLow} AND p.price < ${inputPriceHigh}
		), crime_count AS (
			SELECT a.id, COUNT(c.round_latitude) AS num_crimes
			FROM airbnb a LEFT JOIN round_crime c ON
				(a.round_latitude, a.round_longitude) = (c.round_latitude, c.round_longitude)
			GROUP BY a.id
		), result AS (
			SELECT a.picture_url, a.name, a.accommodates, a.beds, a.price, a.rating, c.num_crimes,
				a.host_url, a.latitude, a.longitude, a.listing_url, a.host_name
			FROM airbnb a JOIN crime_count c ON a.id = c.id
			WHERE c.num_crimes < 10
			ORDER BY rating DESC, num_crimes, name
			LIMIT 10
		)
		SELECT picture_url, name, accommodates, beds, price, IFNULL(rating, 'N/A') AS rating,
			num_crimes, host_url, latitude, longitude, listing_url, host_name
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

function getClass(req, res) {
	var query = `
		SELECT DISTINCT IFNULL(hotel_class, 0) AS class
		FROM hotel
		ORDER BY class;
	`;
	connection.query(query, function(err, rows, fields) {
		if (err) console.log(err);
		else {
			console.log(rows);
			res.json(rows);
		}
	});
}

function bestHotel(req, res) {
	var inputNeighbourhood = req.params.neighbourhood;
	var inputPriceLow = req.params.price_low;
	var inputPriceHigh = req.params.price_high;
	var inputClass = req.params.class;
	var inputService = req.params.service;
	var inputCleanliness = req.params.cleanliness;
	var inputValue = req.params.value;
	var inputLocation = req.params.location;
	var inputSleepQuality = req.params.sleep_quality;
	var inputRoom = req.params.room;

	var query = `
		WITH transformer AS (
			SELECT DISTINCT NEIGHBORHOOD, ZIPCODE
			FROM zillow
		), hotel_info AS (
			SELECT DISTINCT h.name, h.street_address, t.NEIGHBORHOOD AS neighbourhood, h.price,
				IFNULL(h.hotel_class, 0) AS class, IFNULL(h.service, 0) AS service,
				IFNULL(h.cleanliness, 0) AS cleanliness, IFNULL(h.value, 0) AS value,
				IFNULL(h.location, 0) AS location, IFNULL(h.sleep_quality, 0) AS sleep_quality,
				IFNULL(h.room, 0) AS room, h.overall
			FROM hotel_rating h JOIN transformer t ON h.postal_code = t.ZIPCODE
			ORDER BY name
		)
		SELECT name, street_address, class, price, overall
		FROM hotel_info
		WHERE neighbourhood LIKE '%${inputNeighbourhood}%'
			AND price >= ${inputPriceLow} AND price <= ${inputPriceHigh}
			AND class >= ${inputClass}
			AND service >= ${inputService}
			AND cleanliness >= ${inputCleanliness}
			AND value >= ${inputValue}
			AND location >= ${inputLocation}
			AND sleep_quality >= ${inputSleepQuality}
			AND room >= ${inputRoom}
		ORDER BY overall DESC
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



/* ---- Best Living ---- */
function getPopularFilmingPlaces(req, res){
	var query = `
		WITH popPlace AS(
			SELECT neighborhood, Borough, COUNT(*) as num
			FROM movie_scene
			GROUP BY neighborhood, Borough
			ORDER BY num DESC
			LIMIT 10
		)
		SELECT m.latitude, m.longitude, m.film, m.imdb_link, m.neighborhood, m.Borough, m.scene_type
		FROM movie_scene m JOIN popPlace p ON (m.neighborhood, m.Borough) = (p.neighborhood, p.Borough)
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

function rsratio(req, res) {
	var query = `
		SELECT s.countyName, r.RegionName AS zipcode, r.rent_avg / s.house_avg AS rent_sale_ratio
		FROM zillow_zori r JOIN zillow_zhvi s ON r.RegionID = s.RegionID
		WHERE r.RegionName = s.Zipcode
		ORDER BY rent_sale_ratio DESC
		LIMIT 20;
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

	getClass: getClass,
	bestHotel: bestHotel,

	getPopularFilmingPlaces: getPopularFilmingPlaces,

	avgRating: avgRating,
	newHosts: newHosts,
	numMovies: numMovies,
	rsratio: rsratio
}
