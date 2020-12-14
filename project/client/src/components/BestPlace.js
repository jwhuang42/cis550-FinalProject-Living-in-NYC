import React from 'react';
import PageNavbar from './PageNavbar';
// import BestLivingRow from './BestLivingRow';
import MapContainer from './MapContainer';
import '../style/BestPlace.css';
import 'bootstrap/dist/css/bootstrap.min.css';


export default class BestPlace extends React.Component {
	constructor(props) {
		super(props);

		// State maintained by this React component is the selected movie name,
		// and the list of recommended movies.
		this.state = {

			interest: "",
			initialMap: [],
			mapResult: [],
			header: []
		}

		this.handleChange_interest = this.handleChange_interest.bind(this);

		this.initializeMap = this.initializeMap.bind(this);
	}

	handleChange_interest(e){
		this.setState({
			interest: e.target.value
		});
	}

	componentDidMount(){
		
	}

	// connecting to google API and initial the google map
	initializeMap(){
		// this is one branch, can be expanded further if more data are provided
		if(this.state.interest.includes("movie")){
			fetch("http://localhost:8081/movies/popular", {
				method: 'GET' // The type of HTTP request.
			})
				.then(res => res.json()) // Convert the response data to a JSON.
				.then(recMovieList => {
					if (!recMovieList) return;
					//console.log(recMovieList); //displays your JSON object in the console


					// Set the state of the recommended movies list to the value returned by the HTTP response from the server.
					this.setState({
						header: <div class="h5"> It seems like you are a movie fan! here are the most popular filming places in NYC </div> ,
						mapResult: <MapContainer mapInfo={recMovieList}/>
					})
				})
				.catch(err => console.log(err))	// Print the error if there is one.
		}else{
			return this.setState({
				header: <div class="h5"> No such contents so far, more interesting contents are coming soon! </div> ,
				mapResult: []
			});
		}
	}


	// ----------------look     https://github.com/moshen/node-googlemaps    next time------------------------------






		// let recMovieDivs = recMovieList.map((recMovie, i) =>
		// <BestLivingRow title={recMovie.title} id={recMovie.id} rating={recMovie.rating} vote_count={recMovie.vote_count} />
		// );


	render() {

		return (
			<div className="BestPlace">
				<PageNavbar active="bestplace" />

				<div className="container bestliving-container">
					<br/>
					<div className="jumbotron">
						<div class="h1 text-primary">
							Best Places to explore
						</div>
						<br/>
						<div className="dropdown-container">
							<div class="row">
								<div class="input-group mb-3">
									<div class="input-group-prepend">
										<span class="input-group-text" id="">
											Enter something you are interested in
										</span>
									</div>
									<input type="text" class="form-control" placeholder="Enter here" value={this.state.interest} onChange={this.handleChange_interest} id="neighborhood"/>
								</div>
							</div>

							<div class="row justify-content-md-center">
						  	<button type="button" class="btn btn-danger" buttonType="mapButton" onClick={this.initializeMap}>Starting Exploration</button>
						  </div>
						</div>
					</div>

					<br/>
					<div className="jumbotron">
						<div class = "row justify-content-md-center">
							{this.state.header}
						</div>
						<div class="row" id="map" >
							<div class="col-12"> {this.state.mapResult}</div>

						</div>
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
