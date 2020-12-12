-- Output Best Airbnb based on User Requirements --
WITH airbnb AS (
	SELECT n.id, n.picture_url, n.name, p.accommodates, p.beds, p.price, 
		r.review_scores_rating AS rating, l.latitude, l.longitude
	FROM airbnb_name n, airbnb_property p, airbnb_review r, airbnb_host h, airbnb_place l
	WHERE n.id = p.id AND n.id = r.id AND n.id = h.id AND n.id = l.id
		AND h.host_neighbourhood = 'Midtown'
		AND p.accommodates >= 1
		AND p.beds >= 1 AND p.beds <= 3
		AND p.room_type = 'Entire home/apt'
		AND p.price > 1 AND p.price < 1000
), crime_count AS (
	SELECT a.id, FLOOR(COUNT(*) / 9) AS num_crimes
	FROM airbnb a, crime c
	WHERE POWER((a.latitude - c.latitude) * 111139, 2) 
		+ POWER((a.longitude - c.longitude) * 111139, 2) < POWER(800, 2)
	GROUP BY a.id
), result AS (
	SELECT a.picture_url, a.name, a.accommodates, a.beds, a.price, a.rating, c.num_crimes
	FROM airbnb a JOIN crime_count c ON a.id = c.id
	WHERE c.num_crimes < 100
	ORDER BY rating DESC
	LIMIT 10
)
SELECT picture_url, name, accommodates, beds, price, IFNULL(rating, 'N/A') AS rating, num_crimes
FROM result;

-- Count and Average_Rating of Airbnb for each Neighbourhood --
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
