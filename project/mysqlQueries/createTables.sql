-- Airbnb Tables --

CREATE TABLE airbnb_name
SELECT id, listing_url, name, picture_url
FROM airbnb_listings;

CREATE TABLE airbnb_host
SELECT id, host_id, host_url, host_name, host_since, host_response_time, host_response_rate, 
    host_acceptance_rate, host_is_superhost, host_neighbourhood, host_listings_count, 
    host_total_listings_count, host_verifications, host_has_profile_pic, host_identity_verified
FROM airbnb_listings;

CREATE TABLE airbnb_place
SELECT id, neighbourhood, neighbourhood_cleansed, neighbourhood_group_cleansed, latitude, longitude
FROM airbnb_listings;

CREATE TABLE airbnb_property
SELECT id, property_type, room_type, accommodates, bathrooms_text, bedrooms, beds, amenities, price
FROM airbnb_listings;

CREATE TABLE airbnb_night
SELECT id, minimum_nights, maximum_nights, minimum_minimum_nights, maximum_minimum_nights, 
    minimum_maximum_nights, maximum_maximum_nights, minimum_nights_avg_ntm, maximum_nights_avg_ntm
FROM airbnb_listings;

CREATE TABLE airbnb_availability
SELECT id, has_availability, availability_30, availability_60, availability_90, availability_365
FROM airbnb_listings;

CREATE TABLE airbnb_review
SELECT id, calendar_last_scraped, number_of_reviews, number_of_reviews_ltm, number_of_reviews_l30d, 
    first_review, last_review, review_scores_rating, review_scores_accuracy,
    review_scores_cleanliness, review_scores_checkin, review_scores_communication, 
    review_scores_location, review_scores_value, instant_bookable, calculated_host_listings_count, 
    calculated_host_listings_count_entire_homes, calculated_host_listings_count_private_rooms, 
    calculated_host_listings_count_shared_rooms, reviews_per_month
FROM airbnb_listings;

CREATE TABLE round_airbnb_place
SELECT id, latitude, longitude, ROUND(latitude, 3) AS round_latitude, ROUND(longitude, 3) AS round_longitude
FROM airbnb_place;

CREATE INDEX airbnbLocation ON round_airbnb_place (round_latitude, round_longitude) USING BTREE;



-- Average Hotel Rating --

CREATE TABLE hotel_rating
SELECT name, street_address, hotel_class, postal_code, AVG(price) AS price, AVG(service) AS service,
	AVG(cleanliness) AS cleanliness, AVG(value) AS value, AVG(location_score) AS location,
	AVG(sleep_quality) AS sleep_quality, AVG(rooms) AS room, AVG(overall) AS overall
FROM hotel
GROUP BY name, street_address, hotel_class, postal_code;



-- Crime Rounded Coordinate --

CREATE TABLE round_crime
SELECT ROUND(latitude, 3) AS round_latitude, ROUND(longitude, 3) AS round_longitude
FROM crime;

CREATE INDEX crimeLocation ON round_crime (round_latitude, round_longitude) USING BTREE;
