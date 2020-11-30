const bodyParser = require('body-parser');
const express = require('express');
var routes = require("./routes.js");
const cors = require('cors');

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
app.get('/airbnb/:neighbourhood&:accommodates&:beds&:room_type&:price_low&:price_high;', routes.bestAirbnb);



app.listen(8081, () => {
	console.log(`Server listening on PORT 8081`);
});
