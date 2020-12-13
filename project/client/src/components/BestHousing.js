import React from 'react';
import PageNavbar from './PageNavbar';
import BestHousingRow from './BestHousingRow';
import '../style/BestHousing.css';
import 'bootstrap/dist/css/bootstrap.min.css';

export default class BestHousing extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			neighborhood: "CHELSEA",
			priceLow: "1",
			priceHigh: "1000",
			class: "",
			service: false,
			cleanliness: false,
			value: false,
			location: false,
			sleep_quality: false,
			room: false,

			class_list: [],

			result: [],
		};

		this.submitResult = this.submitResult.bind(this);

		this.handleChange_neighborhood = this.handleChange_neighborhood.bind(this);
		this.handleChange_priceLow = this.handleChange_priceLow.bind(this);
		this.handleChange_priceHigh = this.handleChange_priceHigh.bind(this);
		this.handleChange_class = this.handleChange_class.bind(this);
		this.handleChange_service = this.handleChange_service.bind(this);
		this.handleChange_cleanliness = this.handleChange_cleanliness.bind(this);
		this.handleChange_value = this.handleChange_value.bind(this);
		this.handleChange_location = this.handleChange_location.bind(this);
		this.handleChange_sleepQuality = this.handleChange_sleepQuality.bind(this);
		this.handleChange_room = this.handleChange_room.bind(this);
	};



	handleChange_neighborhood(e) {
		this.setState({
			neighborhood: e.target.value
		});
	};

	handleChange_priceLow(e) {
		this.setState({
			priceLow: e.target.value
		});
	};

	handleChange_priceHigh(e) {
		this.setState({
			priceHigh: e.target.value
		});
	};

	handleChange_class(e) {
		this.setState({
			class: e.target.value
		});
	};

	handleChange_service(e) {
		this.setState({
			service: e.target.checked
		});
	};

	handleChange_cleanliness(e) {
		this.setState({
			cleanliness: e.target.checked
		});
	};

	handleChange_value(e) {
		this.setState({
			value: e.target.checked
		});
	};

	handleChange_location(e) {
		this.setState({
			location: e.target.checked
		});
	};

	handleChange_sleepQuality(e) {
		this.setState({
			sleepQuality: e.target.checked
		});
	};

	handleChange_room(e) {
		this.setState({
			room: e.target.checked
		});
	};



	componentDidMount() {
		// fetch classes
		fetch("http://localhost:8081/hotel/class", {
			method: 'GET' // The type of HTTP request.
		})
			.then(res => res.json()) // Convert the response data to a JSON.
			.then(classList => {
				let classDivs = classList.map((classResults, i) =>
		  			<option value={classResults.class}>
						{classResults.class}
					</option>
				);
				this.setState({
					class_list: classDivs,
				})
			})
			.catch(err => console.log(err))
	}





	submitResult() {
		console.log("neighborhood is: " + this.state.neighborhood);
		console.log("price low is: " + this.state.priceLow);
		console.log("price high is: " + this.state.priceHigh);
		console.log("service is: " + this.state.service);
		console.log("location is: " + this.state.location);

		if (this.state.service === true) {
			var service = 4;
		} else {
			var service = 0;
		};

		if (this.state.cleanliness === true) {
			var cleanliness = 4;
		} else {
			var cleanliness = 0;
		};

		if (this.state.value === true) {
			var value = 4;
		} else {
			var value = 0;
		};

		if (this.state.location === true) {
			var location = 4;
		} else {
			var location = 0;
		};

		if (this.state.sleepQuality === true) {
			var sleepQuality = 4;
		} else {
			var sleepQuality = 0;
		};

		if (this.state.room === true) {
			var room = 4;
		} else {
			var room = 0;
		};

		fetch("http://localhost:8081/hotel/" + this.state.neighborhood + "&" + this.state.priceLow
			+ "&" + this.state.priceHigh + "&" + this.state.class + "&" + service + "&" + cleanliness
			+ "&" + value + "&" + location + "&" + sleepQuality + "&" + room, {
			method: 'GET' // The type of HTTP request.
		})
			.then(res => res.json()) // Convert the response data to a JSON.
			.then(resultList => {
				let resultDivs = resultList.map((hotelResults, i) =>
					<BestHousingRow name={hotelResults.name} street_address={hotelResults.street_address} class={hotelResults.class} price={hotelResults.price} overall={hotelResults.overall} />
				);
				this.setState({
					result: resultDivs
				})
			})
			.catch(err => console.log(err))
	}



	render() {
		return (
			<div className="BestHotel">
				<PageNavbar active="besthotel" />
				<div class="container besthotel-container">

					<br/>
					<div class="jumbotron" >
						<div class="h1 text-primary">
							Best Hotel Recommendation
						</div>

						<br/>
						<div className="dropdown-container">
							<div class="row">
								<div class="input-group mb-3">
									<div class="input-group-prepend">
										<span class="input-group-text" id="">
											Enter a neighborhood you prefer
										</span>
									</div>
									<input type="text" class="form-control" placeholder="CHELSEA" value={this.state.neighborhood} onChange={this.handleChange_neighborhood} id="neighborhood"/>
								</div>
							</div>

							<br/>

							<div class="row">
								<div class="form-group">
									<div class="form-check form-check-inline">
										<input class="form-check-input" type="checkbox" onChange={this.handleChange_service} id="gridCheck"/>
										<label class="form-check-label" for="gridCheck">
											service
										</label>
									</div>
									<div class="form-check form-check-inline">
										<input class="form-check-input" type="checkbox" onChange={this.handleChange_cleanliness} id="gridCheck"/>
										<label class="form-check-label" for="gridCheck">
											cleanliness
										</label>
									</div>
									<div class="form-check form-check-inline">
										<input class="form-check-input" type="checkbox" onChange={this.handleChange_value} id="gridCheck"/>
										<label class="form-check-label" for="gridCheck">
											value
										</label>
									</div>
									<div class="form-check form-check-inline">
										<input class="form-check-input" type="checkbox" onChange={this.handleChange_location} id="gridCheck"/>
										<label class="form-check-label" for="gridCheck">
											location
										</label>
									</div>
									<div class="form-check form-check-inline">
										<input class="form-check-input" type="checkbox" onChange={this.handleChange_sleepQuality} id="gridCheck"/>
										<label class="form-check-label" for="gridCheck">
											sleep quality
										</label>
									</div>
									<div class="form-check form-check-inline">
										<input class="form-check-input" type="checkbox" onChange={this.handleChange_room} id="gridCheck"/>
										<label class="form-check-label" for="gridCheck">
											room
										</label>
									</div>
								</div>
							</div>

							<br/>
							<div class="row">
								<select value={this.state.class} onChange={this.handleChange_class} className="dropdown" id="classDropdown">
									<option select value>
										-- select hotel class --
									</option>
									{this.state.class_list}
								</select>
							</div>

							<br/>
							<div class="row">
								<div class="col-4">
									<input type='text' placeholder="Enter price lowerbound" value={this.state.priceLow} onChange={this.handleChange_priceLow} id="pl" className="priceLow-input"/>
								</div>
								<div class="col-4">
									<input type='text' placeholder="Enter price upperbound" value={this.state.priceHigh} onChange={this.handleChange_priceHigh} id="ph" className="priceHigh-input"/>
								</div>
								<div class="col-4">
									<button type="button" class="btn btn-danger" onClick={this.submitResult}>
										Search
									</button>
								</div>
							</div>
						</div>
					</div>

					<div class="jumbotron">
						<div class="row" className="airbnb-head">
							<div class="col" ><strong>You May like: </strong></div>
						</div>

						<br/>
						<div className="container">
							<div className="hotelResults-header">
								<div className="header-lg"><strong>name</strong></div>
								<div className="header-lg"><strong>street address</strong></div>
								<div className="header"><strong>hotel class</strong></div>
								<div className="header"><strong>price</strong></div>
								<div className="header"><strong>average rating</strong></div>
							</div>
							<div className="hotelResults-container" id="results">
								{this.state.result}
							</div>
						</div>
					</div>
				</div>
			</div>
		);
	}
}
