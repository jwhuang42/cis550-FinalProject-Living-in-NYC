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
<<<<<<< HEAD


			neighborhood: "Midtown",
			accomodates: "2",
			bed: "1",
			roomType: "Entire home/apt",
			price_low: "10",
			price_high: "300",
=======
			neighborhood: "",
			accomodates: "",
			bed: "",
			roomType: "",
			priceLow: "",
			priceHigh: "",
>>>>>>> ff301347361201cd77a54fbf62941e3ac72ec866

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
				mapResult: resultList.length > 0? <MapContainer mapInfo={resultList}/> : [<div class="row justify-content-md-center"><div class='col'>ops...it seems that there are matching result based on your given conditions</div></div>]
			})
	  })
	  .catch(err => console.log(err))
	}


	render() {
		return (
<<<<<<< HEAD
			<div className="BestGenres">
				<PageNavbar active="bestgenres" />

				<div className="container bestgenres-container">
			      <div className="jumbotron">
			        <div className="h5">Best Bnb recommendation</div>

			        <div className="years-container">
			          <div className="dropdown-container">

									<div class="row">


										<span class="label info">Enter your preferred neighborhood:</span>

										<input type='text' placeholder="Enter Neighborhood" value={this.state.neighborhood} onChange={this.handleChange_neighborhood} id="neighborhood" className="neighborhood_input"/>
									</div>
									<div class="row"><p></p></div>
									<div class="row">
										<div class="col-4">
											<select value={this.state.accomodates} onChange={this.handleChange_accomodates} className="dropdown" id="accomodatesDropdown">
					            	<option select value> -- select accomodates -- </option>
					            	{this.state.accomodates_list}
					            </select>
										</div>
										<div class="col-4">
											<select value={this.state.bed} onChange={this.handleChange_bed} className="dropdown" id="bedsDropdown">
					            	<option select value> -- select bed number -- </option>
					            	{this.state.beds_list}
					            </select>
										</div>
										<div class="col-4">
											<select value={this.state.roomType} onChange={this.handleChange_roomType} className="dropdown" id="room_typeDropdown">
					            	<option select value> -- select room type -- </option>
					            	{this.state.room_type_list}
					            </select>
										</div>
									</div>
									<div class="row"><p></p></div>
									<div class="row">
										<div class="col-4">
											<input type='text' placeholder="Enter price_low" value={this.state.price_low} onChange={this.handleChange_price_low} id="pl" className="price_low-input"/>
										</div>
										<div class="col-4">
											<input type='text' placeholder="Enter price_high" value={this.state.price_high} onChange={this.handleChange_price_high} id="ph" className="price_high-input"/>
										</div>
										<div class="col-4">
			            		<button className="submit-btn" id="decadesSubmitBtn" onClick={this.submitResult}>Search</button>
										</div>
									</div>
			          </div>
			        </div>
			      </div>
			      <div className="jumbotron">

			          <div className="airbnb-head">

			            <div class="row" className="header"><strong>You May like: </strong></div>

			          </div>
			          <div className="movies-container" id="results">
									<div class="row">
										<div class="col-lg-4">
			            		{this.state.result}
										</div>
									</div>
			          </div>

			      </div>
			    </div>
=======
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
							<div class="form-row">
								<div class="col-4">
									<select value={this.state.accomodates} onChange={this.handleChange_accomodates} class="custom-select mr-sm-2" id="">
										<option select value>
											-- select accomodates --
										</option>
										{this.state.accomodates_list}
									</select>
								</div>
								<div class="col-4">
									<select value={this.state.bed} onChange={this.handleChange_bed} class="custom-select mr-sm-2" id="">
										<option select value>
											-- select bed number --
										</option>
										{this.state.beds_list}
									</select>
								</div>
								<div class="col-4">
									<select value={this.state.roomType} onChange={this.handleChange_roomType} class="custom-select mr-sm-2" id="">
										<option select value>
											-- select room type --
										</option>
										{this.state.room_type_list}
									</select>
								</div>
							</div>

							<br/>
							<div class="form-row">
								<div class="col-4">
									<input type='text' placeholder="Enter price lowerbound" value={this.state.priceLow} onChange={this.handleChange_priceLow} id="" class="form-control mt-2 mr-sm-2"/>
								</div>
								<div class="col-4">
									<input type='text' placeholder="Enter price upperbound" value={this.state.priceHigh} onChange={this.handleChange_priceHigh} id="" class="form-control mt-2 mr-sm-2"/>
								</div>
								<div class="col-4">
									<button type="button" class=" btn btn-block btn-danger mt-2 mx-auto" onClick={this.submitResult}>
										Search
									</button>
								</div>
							</div>
						</div>
					</div>

					<div class="jumbotron">
						<div class="row justify-content-md-center">
							<div class="h5">
								Explore our recommendation:
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
>>>>>>> ff301347361201cd77a54fbf62941e3ac72ec866
			</div>
		);
	}
}
