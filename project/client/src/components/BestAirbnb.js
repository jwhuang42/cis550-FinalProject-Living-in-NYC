import React from 'react';
import PageNavbar from './PageNavbar';
import BestAirbnbRow from './BestAirbnbRow';
import MapContainer from './MapContainer';
import '../style/BestAirbnb.css';
import 'bootstrap/dist/css/bootstrap.min.css';

//neighborhood(user input), accomodates(), beds(number1-14), room type(4 types), price(min-max)

export default class BestAirbnb extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			neighborhood: "",
			accomodates: "",
			bed: "",
			roomType: "",
			priceLow: "",
			priceHigh: "",

			result: [],
			mapResult: [],

			accomodates_list: [],
			beds_list: [],
			room_type_list: [],

			result: []
		};

		this.submitResult = this.submitResult.bind(this);

		this.handleChange_neighborhood = this.handleChange_neighborhood.bind(this);
		this.handleChange_priceLow = this.handleChange_priceLow.bind(this);
		this.handleChange_priceHigh = this.handleChange_priceHigh.bind(this);
		this.handleChange_accomodates = this.handleChange_accomodates.bind(this);
		this.handleChange_bed = this.handleChange_bed.bind(this);
		this.handleChange_roomType = this.handleChange_roomType.bind(this);
	}

	handleChange_neighborhood(e) {
		this.setState({
			neighborhood: e.target.value
		});

	}
	handleChange_priceLow(e) {
		this.setState({
			priceLow: e.target.value
		});
	}
	handleChange_priceHigh(e) {
		this.setState({
			priceHigh: e.target.value
		});
	}
	/// 3 more
	handleChange_accomodates(e) {
		this.setState({
			accomodates: e.target.value
		});
	}
	handleChange_bed(e) {
		this.setState({
			bed: e.target.value
		});
	}
	handleChange_roomType(e) {
		this.setState({
			roomType: e.target.value
		});
	}

	componentDidMount() {
		// fetch accomodates

	  fetch("http://localhost:8081/airbnb/accommodates", {
	  method: 'GET' // The type of HTTP request.
	})
	  .then(res => res.json()) // Convert the response data to a JSON.
	  .then(accomodatesList => {

		let accomodatesDivs = accomodatesList.map((accomodates, i) =>
		  <option value={accomodates.accommodates}>{accomodates.accommodates}</option>
		);
				console.log(accomodatesDivs);
		this.setState({
		  accomodates_list: accomodatesDivs,

		})
	  })
	  .catch(err => console.log(err))


			// fetch beds
			fetch("http://localhost:8081/airbnb/beds", {
		  method: 'GET' // The type of HTTP request.
		})
		  .then(res => res.json()) // Convert the response data to a JSON.
		  .then(bedList => {


			let bedDivs = bedList.map((bed, i) =>
			  <option value={bed.beds}>{bed.beds}</option>
			);

			this.setState({
			  beds_list: bedDivs,

			})
		  })
		  .catch(err => console.log(err))

				// fetch room_type
				fetch("http://localhost:8081/airbnb/room_type", {
			  method: 'GET' // The type of HTTP request.
			})
			  .then(res => res.json()) // Convert the response data to a JSON.
			  .then(roomTpyeList => {

				let roomTypeDivs = roomTpyeList.map((roomTpye, i) =>
				  <option value={roomTpye.room_type}>{roomTpye.room_type}</option>
				);

				this.setState({
				  room_type_list: roomTypeDivs,

				})
			  })
			  .catch(err => console.log(err))
	}


	submitResult() {
		console.log("neighborhood is: " + this.state.neighborhood)
		console.log("price low is: " + this.state.priceLow)
		console.log("price high is: " + this.state.priceHigh)
		var rmType = this.state.roomType.replace(/ /g,"_");
		rmType = rmType.replace("/","q")

		fetch("http://localhost:8081/airbnb/" +	this.state.neighborhood + "&" + this.state.accomodates + "&" + this.state.bed + "&" + rmType + "&" + this.state.priceLow + "&" + this.state.priceHigh, {
	  method: 'GET' // The type of HTTP request.
	})
	  .then(res => res.json()) // Convert the response data to a JSON.
	  .then(resultList => {
			console.log(resultList);
			this.setState({
				mapResult: []
			})

			let genrerateDivs = resultList.map((airbnbResults, i) =>
			  <BestAirbnbRow airbnbResults={airbnbResults} />
		);

			this.setState({
			  result: resultList.length > 0? genrerateDivs: [<div class="row justify-content-md-center"><div class='col'>no matching result...</div></div>],
				mapResult: <MapContainer mapInfo={resultList}/>
			})
	  })
	  .catch(err => console.log(err))
	}


	render() {
		return (
			<div className="BestAirbnb">
				<PageNavbar active="bestairbnb" />

				<div class="container bestairbnb-container">

					<br/>
					<div class="jumbotron">
						<div class="h1 text-primary">
							Best Airbnb Recommendation
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
									<input type="text" class="form-control" placeholder="Enter Neighborhood (e.g. Midtown, Clinton Hill, Park Slope)" value={this.state.neighborhood} onChange={this.handleChange_neighborhood} id="neighborhood"/>
								</div>
							</div>

							<br/>
							<div class="row">
								<div class="col-4">
									<select value={this.state.accomodates} onChange={this.handleChange_accomodates} className="dropdown" id="accomodatesDropdown">
										<option select value>
											-- select accomodates --
										</option>
										{this.state.accomodates_list}
									</select>
								</div>
								<div class="col-4">
									<select value={this.state.bed} onChange={this.handleChange_bed} className="dropdown" id="bedsDropdown">
										<option select value>
											-- select bed number --
										</option>
										{this.state.beds_list}
									</select>
								</div>
								<div class="col-4">
									<select value={this.state.roomType} onChange={this.handleChange_roomType} className="dropdown" id="room_typeDropdown">
										<option select value>
											-- select room type --
										</option>
										{this.state.room_type_list}
									</select>
								</div>
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
						<div class="row justify-content-md-center">
							<div class="h5">
								Below are our recommended locations:
							</div>
						</div>
						<div class="row justify-content-md-center" id="map">
							<div class="col-12">
								{this.state.mapResult}
							</div>
						</div>
					</div>

					<div class="jumbotron">
						<div class="row justify-content-md-center">
							<div class="h5"><strong>You may like: </strong></div>
						</div>

						<br/>
						<div className="movies-container" id="results">
							<div class="row d-flex align-content-start flex-wrap">
								<div class="">
									{this.state.result}
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		);
	}
}
