import React from 'react';
import PageNavbar from './PageNavbar';
import FunFactsAvgRatingRow from './FunFactsAvgRatingRow';
import FunFactsNewHostsRow from './FunFactsNewHostsRow';
import FunFactsNumMoviesRow from './FunFactsNumMoviesRow';
import FunFactsRentSaleRatio from './FunFactsRentSaleRatio';
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
		this.showRatio = this.showRatio.bind(this);
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

				// Set the state of the header and result to the value returned by the HTTP response from the server.
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

				// Set the state of the header and result to the value returned by the HTTP response from the server.
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
			.then(mvList => {
				if (!mvList) return;
				console.log(mvList); //displays your JSON object in the console
				let mvDivs = mvList.map((mvResults, i) =>
					<FunFactsNumMoviesRow neighborhood={mvResults.neighborhood} Borough={mvResults.Borough} num={mvResults.num} />
				);

				// Set the state of the header and result to the value returned by the HTTP response from the server.
				this.setState({
					header: [<div className="header"><strong>Neighbourhood</strong></div>,
							 <div className="header"><strong>Borough</strong></div>,
							 <div className="header"><strong>Number</strong></div>],
					result: mvDivs
				})
			})
			.catch(err => console.log(err))	// Print the error if there is one.
	}

	showRatio(){
		// Send an HTTP request to the server.
		fetch("http://localhost:8081/funfacts/rsratio", {
			method: 'GET' // The type of HTTP request.
		})
			.then(res => res.json()) // Convert the response data to a JSON.
			.then(rsList => {
				if (!rsList) return;
				console.log(rsList); //displays your JSON object in the console
				let rsDivs = rsList.map((rsResults, i) =>
					<FunFactsRentSaleRatio zipcode={rsResults.zipcode} countyName={rsResults.countyName} rent_sale_ratio={rsResults.rent_sale_ratio} />
				);

				// Set the state of the header and result to the value returned by the HTTP response from the server.
				this.setState({
					header: [<div className="header"><strong>zipcode</strong></div>,
							 <div className="header"><strong>county_name</strong></div>,
							 <div className="header"><strong>rent_sale_ratio</strong></div>],
					result: rsDivs
				})
			})
			.catch(err => console.log(err))
	}

	render() {
		return (
			<div className="Dashboard">
				<PageNavbar active="dashboard" />

				<br></br>
				<div className="container">
					<div className="jumbotron">
						<div class="h1 text-primary">
							Fun Facts
						</div>

						<br/>
						<div class="form-row">
							<div class="col-3"></div>
							<div class="col-6">
								<button type="button" class="btninfo btn-block btn-info" onClick={this.showAvgRating}>
									Number and Average Rating of Airbnb for each Neighbourhood
								</button>
							</div>
						</div>

						<br/>
						<div class="form-row">
							<div class="col-3"></div>
							<div class="col-6">
								<button type="button" class="btninfo btn-block btn-info" onClick={this.showNewHosts}>
									Number of New Airbnb Hosts each Year
								</button>
							</div>
						</div>

						<br/>
						<div class="form-row">
							<div class="col-3"></div>
							<div class="col-6">
								<button type="button" class="btninfo btn-block btn-info" onClick={this.showNumMovies}>
									Number of Movie Scenes in each Neighbourhood
								</button>
							</div>
						</div>

						<br/>
						<div class="form-row">
							<div class="col-3"></div>
							<div class="col-6">
								<button type="button" class="btninfo btn-block btn-info" onClick={this.showRatio}>
									The place where houselord gets most profit
								</button>
							</div>
						</div>
					</div>

					<br/>
					<div className="jumbotron">
						<div className="container">
							<div className="results-header">
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
