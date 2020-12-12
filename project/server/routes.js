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
		SELECT n.picture_url, n.name, p.accommodates, p.beds, p.price, r.review_scores_rating AS rating
		FROM airbnb_name n, airbnb_property p, airbnb_review r, airbnb_host h
    	WHERE n.id = p.id AND n.id = r.id AND n.id = h.id
			AND h.host_neighbourhood = '${inputNeighbourhood}'
            AND p.accommodates >= '${inputAccomodates}'
            AND p.beds >= ${inputBeds}
            AND p.room_type = '${inputRoomType}'
            AND p.price > ${inputPriceLow} AND p.price < ${inputPriceHigh}
        ORDER BY rating DESC
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
