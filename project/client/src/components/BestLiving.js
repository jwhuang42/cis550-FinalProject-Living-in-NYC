import React from 'react';
import PageNavbar from './PageNavbar';
import BestLivingRow from './BestLivingRow';
import '../style/BestLiving.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Loader, LoaderOptions} from 'google-maps';

export default class BestLiving extends React.Component {
	constructor(props) {
		super(props);

		// State maintained by this React component is the selected movie name,
		// and the list of recommended movies.
		this.state = {
			movieName: "",
			recMovies: [],
			initialMap: []
		}

		this.handleMovieNameChange = this.handleMovieNameChange.bind(this);
		this.submitMovie = this.submitMovie.bind(this);
	}

	handleMovieNameChange(e) {
		this.setState({
			movieName: e.target.value
		});
	}

	componentDidMount(){

	}


	/* ---- Q2 (Recommendations) ---- */
	// Hint: Name of movie submitted is contained in `this.state.movieName`.
	submitMovie() {
		// Send an HTTP request to the server.
        fetch("http://localhost:8081/recommendations/" + this.state.movieName, {
          method: 'GET' // The type of HTTP request.
        })
          .then(res => res.json()) // Convert the response data to a JSON.
          .then(recMovieList => {
            if (!recMovieList) return;
            console.log(recMovieList); //displays your JSON object in the console
  		    let recMovieDivs = recMovieList.map((recMovie, i) =>
  			  <BestLivingRow title={recMovie.title} id={recMovie.id} rating={recMovie.rating} vote_count={recMovie.vote_count} />
  		    );

            // Set the state of the recommended movies list to the value returned by the HTTP response from the server.
            this.setState({
              recMovies: recMovieDivs
            })
          })
          .catch(err => console.log(err))	// Print the error if there is one.
	}

	// connecting to google API and initial the google map



	// ----------------look     https://github.com/moshen/node-googlemaps    next time------------------------------



	initialMap(){
		const options: LoaderOptions = {};

		// !!!!!!!!!!!safely store key later!!!!!!!!!!!
		const loader = new Loader('AIzaSyA0rycsA7bNG_uKcvXq7i5wIcYmOIalCQs');

		const google = loader.load().then(function (google) {
			// The location of Uluru
	    var uluru = {
	      lat: -25.344,
	      lng: 131.036
	    };

    	var map = new google.maps.Map(document.getElementById('map'), {
        center: uluru,
        zoom: 4,
    	});

			var marker = new google.maps.Marker({
	      position: uluru,
	      map: map
    	});
		});
	}

		// let recMovieDivs = recMovieList.map((recMovie, i) =>
		// <BestLivingRow title={recMovie.title} id={recMovie.id} rating={recMovie.rating} vote_count={recMovie.vote_count} />
		// );


	render() {
		return (
			<div className="BestLiving">
				<PageNavbar active="bestliving" />

				<div className="container bestliving-container">
					<div className="jumbotron">
						<div class="h3">My Google Maps Demo</div>

						<br></br>
						<script
						<div id="map" className="map-container">{this.initialMap}</div>
					</div>
				</div>
		  </div>
		);
	}
}
// <div className="container recommendations-container">
// 	<div className="jumbotron">
// 		<div className="h5">Recommendations</div>
// 		<br></br>
// 		<div className="input-container">
// 			<input type='text' placeholder="Enter Movie Name" value={this.state.movieName} onChange={this.handleMovieNameChange} id="movieName" className="movie-input"/>
// 			<button id="submitMovieBtn" className="submit-btn" onClick={this.submitMovie}>Submit</button>
// 		</div>
// 		<div className="header-container">
// 			<div className="h6">You may like ...</div>
// 			<div className="headers">
// 				<div className="header"><strong>Title</strong></div>
// 				<div className="header"><strong>Movie ID</strong></div>
// 						<div className="header"><strong>Rating</strong></div>
// 						<div className="header"><strong>Vote Count</strong></div>
// 			</div>
// 		</div>
// 		<div className="results-container" id="results">
// 			{this.state.recMovies}
// 		</div>
// 	</div>
// </div>
