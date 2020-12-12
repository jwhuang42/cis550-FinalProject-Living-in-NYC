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
		FROM airbnb_listings
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
		FROM airbnb_listings
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
		FROM airbnb_listings;
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
	console.log(inputRoomType);

    var query = `
        SELECT picture_url, name, accommodates, beds, price, review_scores_rating AS rating
        FROM airbnb_listings
        WHERE host_neighbourhood = '${inputNeighbourhood}'
            AND accommodates >= '${inputAccomodates}'
            AND beds >= ${inputBeds}
            AND room_type = '${inputRoomType}'
            AND price > ${inputPriceLow} AND price < ${inputPriceHigh}
        ORDER BY review_scores_rating DESC
        LIMIT 10;
    `;
    connection.query(query, function(err, rows, fields) {
        if (err) console.log(err);
        else {
            console.log(rows);
            res.json(rows);
        }
    });
};


// change the above
// The exported functions, which can be accessed in index.js.
module.exports = {
	getAccommodates: getAccommodates,
	getBeds: getBeds,
	getRoomType: getRoomType,
	bestAirbnb: bestAirbnb

}
