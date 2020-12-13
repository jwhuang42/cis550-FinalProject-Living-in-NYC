import React from 'react';
import PageNavbar from './PageNavbar';
import FunFactsAvgRatingRow from './FunFactsAvgRatingRow';
import FunFactsNewHostsRow from './FunFactsNewHostsRow';
import FunFactsNumMoviesRow from './FunFactsNumMoviesRow';
import '../style/FunFacts.css';
import 'bootstrap/dist/css/bootstrap.min.css';

export default class FunFacts extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			result: [],
			header: []
		};

		this.showAvgRating = this.showAvgRating.bind(this);
		this.showNewHosts = this.showNewHosts.bind(this);
		this.showNumMovies = this.showNumMovies.bind(this);
	}



	showAvgRating() {
		// Send an HTTP request to the server.
		fetch("http://localhost:8081/funfacts/avgRating", {
			method: 'GET' // The type of HTTP request.
		})
			.then(res => res.json()) // Convert the response data to a JSON.
			.then(avgRatingList => {
				if (!avgRatingList) return;
				console.log(avgRatingList); //displays your JSON object in the console
				let avgRatingDivs = avgRatingList.map((avgRatingResults, i) =>
					<FunFactsAvgRatingRow host_neighbourhood={avgRatingResults.host_neighbourhood} count={avgRatingResults.count} avg_rating={avgRatingResults.avg_rating} />
				);

				// Set the state of the movies list to the value returned by the HTTP response from the server.
				this.setState({
					header: [<div className="header"><strong>Neighbourhood</strong></div>,
							 <div className="header"><strong>Count</strong></div>,
							 <div className="header"><strong>Average Rating</strong></div>],
					result: avgRatingDivs
				})
			})
			.catch(err => console.log(err))	// Print the error if there is one.
	}

	showNewHosts() {
		// Send an HTTP request to the server.
		fetch("http://localhost:8081/funfacts/newHosts", {
			method: 'GET' // The type of HTTP request.
		})
			.then(res => res.json()) // Convert the response data to a JSON.
			.then(newHostsList => {
				if (!newHostsList) return;
				console.log(newHostsList); //displays your JSON object in the console
				let newHostsDivs = newHostsList.map((newHostsResults, i) =>
					<FunFactsNewHostsRow year={newHostsResults.year} num={newHostsResults.num} />
				);

				// Set the state of the movies list to the value returned by the HTTP response from the server.
				this.setState({
					header: [<div className="header"><strong>Year</strong></div>,
							 <div className="header"><strong>Number</strong></div>],
					result: newHostsDivs
				});
			})
			.catch(err => console.log(err))	// Print the error if there is one.
	}

	showNumMovies() {
		// Send an HTTP request to the server.
		fetch("http://localhost:8081/funfacts/numMovies", {
			method: 'GET' // The type of HTTP request.
		})
			.then(res => res.json()) // Convert the response data to a JSON.
			.then(numMoviesList => {
				if (!numMoviesList) return;
				console.log(numMoviesList); //displays your JSON object in the console
				let numMoviesDivs = numMoviesList.map((numMoviesResults, i) =>
					<FunFactsNumMoviesRow neighborhood={numMoviesResults.neighborhood} Borough={numMoviesResults.Borough} num={numMoviesResults.num} />
				);

				// Set the state of the movies list to the value returned by the HTTP response from the server.
				this.setState({
					header: [<div className="header"><strong>Neighbourhood</strong></div>,
							 <div className="header"><strong>Borough</strong></div>,
							 <div className="header"><strong>Number</strong></div>],
					result: numMoviesDivs
				})
			})
			.catch(err => console.log(err))	// Print the error if there is one.
	}

	render() {
		return (
			<div className="Dashboard">
				<PageNavbar active="dashboard" />

				<br></br>
				<div className="container movies-container">
					<div className="jumbotron">
						<div className="h5">
							Which fun fact do you wang to know?
						</div>
						<div className="">
							<button type="button" class="btninfo btn-info" onClick={this.showAvgRating}>
								Number and Average Rating of Airbnb for each Neighbourhood
							</button>
						</div>

						<br></br>
						<div className="">
							<button type="button" class="btninfo btn-info" onClick={this.showNewHosts}>
								Number of New Hosts each Year
							</button>
						</div>

						<br></br>
						<div className="">
							<button type="button" class="btninfo btn-info" onClick={this.showNumMovies}>
								Number of Movie Scenes in each Neighbourhood
							</button>
						</div>
					</div>

					<br></br>
					<div className="jumbotron">
						<div className="movies-container">
							<div className="movies-header">
								{this.state.header}
							</div>
							<div className="results-container" id="results">
								{this.state.result}
							</div>
						</div>
					</div>
				</div>
			</div>
		);
	}
}
