var config = require('./db-config.js');
var mysql = require('mysql');

config.connectionLimit = 10;
var connection = mysql.createPool(config);

/* -------------------------------------------------- */
/* ------------------- Route Handlers --------------- */
/* -------------------------------------------------- */


/* ---- Q1a (Dashboard) ---- */
function getAllGenres(req, res) {
    var query = `
        SELECT DISTINCT genre
        FROM Genres;
    `;
    connection.query(query, function(err, rows, fields) {
        if (err) console.log(err);
        else {
            res.json(rows);
        }
    });
};


/* ---- Q1b (Dashboard) ---- */
function getTopInGenre(req, res) {
    var inputGenre = req.params.genre;
    var query = `
        SELECT m.title, m.rating, m.vote_count
        FROM Movies m JOIN Genres g ON m.id = g.movie_id
        WHERE g.genre = '${inputGenre}'
        ORDER BY m.rating DESC, m.vote_count DESC
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

/* ---- Q2 (Recommendations) ---- */
function getRecs(req, res) {
    var inputMovieName = req.params.movieName;
    var query = `
        WITH RecGenres AS (
            SELECT g.genre
            FROM Movies m JOIN Genres g ON m.id = g.movie_id
            WHERE m.title = '${inputMovieName}'
        )
        SELECT m.title, m.id, m.rating, m.vote_count
        FROM Movies m, Genres g, RecGenres r
        WHERE g.genre = r.genre AND m.id = g.movie_id AND m.title <> '${inputMovieName}'
        GROUP BY m.title, m.id, m.rating, m.vote_count
        HAVING COUNT(*) >= ANY (
            SELECT COUNT(*)
            FROM RecGenres
        )
        ORDER BY m.rating DESC, m.vote_count DESC
        LIMIT 5;
    `;
    connection.query(query, function(err, rows, fields) {
        if (err) console.log(err);
        else {
            console.log(rows);
            res.json(rows);
        }
    });
};

/* ---- (Best Genres) ---- */
function getDecades(req, res) {
	var query = `
    SELECT DISTINCT (FLOOR(year/10)*10) AS decade
    FROM (
      SELECT DISTINCT release_year as year
      FROM Movies
      ORDER BY release_year
    ) y
  `;
  connection.query(query, function(err, rows, fields) {
    if (err) console.log(err);
    else {
      res.json(rows);
    }
  });
}

/* ---- Q3 (Best Genres) ---- */
function bestGenresPerDecade(req, res) {
    var inputDecade = req.params.decade;
    var start = parseInt(inputDecade);
    var end = start + 9;
    var query = `
    WITH Decade AS (
        SELECT g.genre, AVG(m.rating) AS average_rating
        FROM Movies m JOIN Genres g ON m.id = g.movie_id
        WHERE m.release_year >= ${start} AND m.release_year <= ${end}
        GROUP BY g.genre
    )
    SELECT *
    FROM Decade
    UNION
    SELECT g.genre, 0
    FROM Genres g
    WHERE g.genre NOT IN (
        SELECT genre
        FROM Decade
    )
    ORDER BY average_rating DESC, genre;
    `;
    connection.query(query, function(err, rows, fields) {
        if (err) console.log(err);
        else {
            console.log(rows);
            res.json(rows);
        }
    });
};

// The exported functions, which can be accessed in index.js.
module.exports = {
	getAllGenres: getAllGenres,
	getTopInGenre: getTopInGenre,
	getRecs: getRecs,
	getDecades: getDecades,
  bestGenresPerDecade: bestGenresPerDecade
}
