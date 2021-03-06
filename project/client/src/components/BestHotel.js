import React from 'react';
import PageNavbar from './PageNavbar';
import BestHotelRow from './BestHotelRow';
import '../style/BestHotel.css';
import 'bootstrap/dist/css/bootstrap.min.css';

export default class BestHotel extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			neighborhood: "",
			priceLow: "",
			priceHigh: "",
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
		  			<option value={classResults.class === 0? "Don't care": classResults.class}>
						{classResults.class === 0? "Don't care": classResults.class}
					</option>
				);
				this.setState({
					class_list: classDivs,
					result: [""]
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

		if (this.state.class.includes('care')) {
			var cls = 0;
		} else {
			var cls = this.state.class;
		};

		fetch("http://localhost:8081/hotel/" + this.state.neighborhood + "&" + this.state.priceLow
			+ "&" + this.state.priceHigh + "&" + cls + "&" + service + "&" + cleanliness
			+ "&" + value + "&" + location + "&" + sleepQuality + "&" + room, {
			method: 'GET' // The type of HTTP request.
		})
			.then(res => res.json()) // Convert the response data to a JSON.
			.then(resultList => {
				let resultDivs = resultList.map((hotelResults, i) =>
					<BestHotelRow name={hotelResults.name} street_address={hotelResults.street_address} class={hotelResults.class} price={hotelResults.price} overall={hotelResults.overall} />
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
				<div class="container besthousing-container">

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
									<input type="text" class="form-control" placeholder="Enter Neighborhood (e.g. Chinatown, Chelsea)" value={this.state.neighborhood} onChange={this.handleChange_neighborhood} id="neighborhood"/>
								</div>
							</div>

							<br/>


							<div class="form-row">
                <label class="col-sm-3.5 mb-3 col-form-label">check the properties you care about </label>
                <div class="col-1.5">
									<div class="form-check mb-2 mr-sm-1">

										<input class="form-check-input" type="checkbox" onChange={this.handleChange_service} id="gridCheck1"/>
										<label class="form-check-label" for="gridCheck1">
											service
										</label>
									</div>
                </div>
                <div class="col-1.5">
									<div class="form-check mb-2 mr-sm-1">
										<input class="form-check-input" type="checkbox" onChange={this.handleChange_cleanliness} id="gridCheck2"/>
										<label class="form-check-label" for="gridCheck2">
											cleanliness
										</label>
									</div>
                </div>
                <div class="col-1.5">
									<div class="form-check mb-2 mr-sm-1">
										<input class="form-check-input" type="checkbox" onChange={this.handleChange_value} id="gridCheck3"/>
										<label class="form-check-label" for="gridCheck3">
											value
										</label>
									</div>
                </div>
                <div class="col-1.5">
									<div class="form-check mb-2 mr-sm-1">
										<input class="form-check-input" type="checkbox" onChange={this.handleChange_location} id="gridCheck4"/>
										<label class="form-check-label" for="gridCheck4">
											location
										</label>
									</div>
                </div>
                <div class="col-1.5">
									<div class="form-check mb-2 mr-sm-1">
										<input class="form-check-input" type="checkbox" onChange={this.handleChange_sleepQuality} id="gridCheck5"/>
										<label class="form-check-label" for="gridCheck5">
											sleep quality
										</label>
									</div>
                </div>
                <div class="col-1.5">
									<div class="form-check mb-2 mr-sm-1">
										<input class="form-check-input" type="checkbox" onChange={this.handleChange_room} id="gridCheck6"/>
										<label class="form-check-label" for="gridCheck6">
											room
										</label>
									</div>
                </div>
                <div class="col-5">
									<select value={this.state.class} onChange={this.handleChange_class} class="custom-select mr-sm-2" id="">
										<option select value>
											-- minimum acceptable hotel class --
										</option>
										{this.state.class_list}
									</select>
                </div>
							</div>

							<br/>

							<div class="form-row">
								<div class="col-5">
									<input type='text' placeholder="Enter price lowerbound" value={this.state.priceLow} onChange={this.handleChange_priceLow} id="pl" class="form-control mt-2 mr-sm-1"/>
								</div>
								<div class="col-5">
									<input type='text' placeholder="Enter price upperbound" value={this.state.priceHigh} onChange={this.handleChange_priceHigh} id="ph" class="form-control mt-2 mr-sm-1"/>
								</div>
								<div class="col-2">
									<button type="button" class="btn btn-block mt-2 mx-sm-1 btn-danger" onClick={this.submitResult}>
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
							{getHeader(this.state.result)}
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

function getHeader(result){

	if (result.length > 0){
		return (
			<div className="hotelResults-header">
				<div className="header-lg"><strong>Name</strong></div>
				<div className="header-lg"><strong>Street Address</strong></div>
				<div className="header"><strong>Hotel Class</strong></div>
				<div className="header"><strong>Price</strong></div>
				<div className="header"><strong>Average Rating</strong></div>
			</div>
		);

	}else{
		return <div class="p-3 text">ops... no matching result based on your given condition</div>
	}
}
