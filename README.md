# Upenn cis550 final project 2020 Fall
### Project/Team Name: Living in NYC


**General Idea**  

In this project we utilized datasets of Airbnb, hotels, Zillow, movie scenes, and crimes in New York
City. We built SQL queries over the datasets to extract interesting information, and established a
web page on those queries. The web page provides users fields of requirements to enter, and returns
results in their favour. We also used the Google api to locate the results on the map for better
visualization.


**Stack** 

Frontend: ReactJS with Bootstrap and CSS for styling, google-maps-react for displaying the map.

Backend: Express(.js) on Node server handle http request and communicate with the database.

Database: MySQL containing the designed and optimized 3NF database of Airbnb, Zillow, Hotel, Crime report, Movie scene in NYC on AWS (contact me for the data used in this app).


**How to run the app** 

1. clone the source code
2. change the db-config file under ```<Your path>/cis550/project/server/db-config.js``` to the parameter of your local database and populate the tables required
3. change directory into ```<Your path>/cis550/project/server``` and enter ```npm install``` and ```npm start``` to start the server
4. change directory into ```<Your path>/cis550/project/client``` and enter ```npm install``` and ```npm start``` to start the client
