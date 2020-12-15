-- Output Best Airbnb based on User Requirements --
WITH airbnb AS (
	SELECT n.id, n.picture_url, n.name, n.listing_url, h.host_url, h.host_name, 
		p.accommodates, p.beds, p.price, FLOOR(r.review_scores_rating) AS rating, 
        l.latitude, l.longitude
	FROM airbnb_name n, airbnb_property p, airbnb_review r, airbnb_host h, airbnb_place l
	WHERE n.id = p.id AND n.id = r.id AND n.id = h.id AND n.id = l.id
		AND h.host_neighbourhood = 'Midtown'
		AND p.accommodates >= 1
		AND p.beds >= 1 AND p.beds <= 3
		AND p.room_type = 'Entire home/apt'
		AND p.price >= 1 AND p.price <= 1000
), crime_count AS (
	SELECT a.id, COUNT(*) AS num_crimes
	FROM airbnb a, crime c
	WHERE POWER((a.latitude - c.latitude) * 111139, 2)
		+ POWER((a.longitude - c.longitude) * 111139, 2) < POWER(150, 2)
	GROUP BY a.id
), result AS (
	SELECT a.picture_url, a.name, a.accommodates, a.beds, a.price, a.rating, c.num_crimes,
		a.host_url, a.latitude, a.longitude, a.listing_url, a.host_name
	FROM airbnb a JOIN crime_count c ON a.id = c.id
	WHERE c.num_crimes < 100
	ORDER BY rating DESC, num_crimes, name
	LIMIT 10
)
SELECT picture_url, name, accommodates, beds, price, IFNULL(rating, 'N/A') AS rating, 
	num_crimes, host_url, latitude, longitude, listing_url, host_name
FROM result;

-- Optimized Airbnb --
WITH airbnb AS (
	SELECT n.id, n.picture_url, n.name, n.listing_url, h.host_url, h.host_name, 
		p.accommodates, p.beds, p.price, FLOOR(r.review_scores_rating) AS rating, 
        l.latitude, l.longitude, l.round_latitude, l.round_longitude
	FROM airbnb_name n
		JOIN airbnb_property p ON n.id = p.id
		JOIN airbnb_review r ON n.id = r.id
		JOIN airbnb_host h ON n.id = h.id
		JOIN round_airbnb_place l ON n.id = l.id 
	WHERE h.host_neighbourhood = 'Midtown'
		AND p.accommodates >= 1
		AND p.beds >= 1 AND p.beds <= 3
		AND p.room_type = 'Entire home/apt'
		AND p.price >= 1 AND p.price <= 1000
	ORDER BY l.latitude, l.longitude
), crime_count AS (
	SELECT a.id, COUNT(*) AS num_crimes
	FROM airbnb a JOIN round_crime c ON 
		(a.round_latitude, a.round_longitude) = (c.round_latitude, c.round_longitude)
	GROUP BY a.id
), result AS (
	SELECT a.picture_url, a.name, a.accommodates, a.beds, a.price, a.rating, c.num_crimes,
		a.host_url, a.latitude, a.longitude, a.listing_url, a.host_name
	FROM airbnb a JOIN crime_count c ON a.id = c.id
	WHERE c.num_crimes < 100
	ORDER BY rating DESC, num_crimes, name
	LIMIT 10
)
SELECT picture_url, name, accommodates, beds, price, IFNULL(rating, 'N/A') AS rating, 
	num_crimes, host_url, latitude, longitude, listing_url, host_name
FROM result;



-- get the first 40 most popular filming places
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



-- Number and Average_Rating of Airbnb for each Neighbourhood --
SELECT h.host_neighbourhood, COUNT(*) AS count, AVG(r.review_scores_rating) AS avg_rating
FROM airbnb_review r JOIN airbnb_host h ON r.id = h.id
WHERE h.host_neighbourhood IS NOT NULL
GROUP BY h.host_neighbourhood
HAVING count > 100
ORDER BY avg_rating DESC
LIMIT 10;



-- Number of New Hosts each Year --
SELECT YEAR(host_since) AS year, COUNT(*) as num
FROM airbnb_host
WHERE YEAR(host_since) is NOT NULL
GROUP BY YEAR(host_since)
ORDER BY year;



-- Number of Movie Scenes in each Neighbourhood --
SELECT neighborhood, Borough, COUNT(*) as num
FROM movie_scene
GROUP BY neighborhood, Borough
ORDER BY num DESC
LIMIT 10;



-- Output Best Hotel based on User Requirements
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
WHERE neighbourhood = 'CHELSEA'
	AND price >= 1 AND price <= 1000
    AND class >= 0
    AND service >= 4
    AND cleanliness >= 4
    AND value >= 4
    AND location >= 4
    AND sleep_quality >= 4
    AND room >= 4
ORDER BY overall DESC
LIMIT 10;
