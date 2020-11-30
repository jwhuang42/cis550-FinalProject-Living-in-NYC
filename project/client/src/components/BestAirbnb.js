import React from 'react';
import PageNavbar from './PageNavbar';
import BestAirbnbRow from './BestAirbnbRow';
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
			price_low: "",
			price_high: "",

			result: [],


			accomodates_list: [],
			beds: [],
			room_type: []
		};

		this.submitResult = this.submitResult.bind(this);


		this.handleChange_neighborhood = this.handleChange_neighborhood.bind(this);
		this.handleChange_price_low = this.handleChange_price_low.bind(this);
		this.handleChange_price_high = this.handleChange_price_high.bind(this);
		// 3 more
		this.handleChange_accomodates = this.handleChange_accomodates.bind(this);
		this.handleChange_bed = this.handleChange_bed.bind(this);
		this.handleChange_roomType = this.handleChange_roomType.bind(this);

	}

	handleChange_neighborhood(e) {
		this.setState({
			neighborhood: e.target.value
		});
	}
	handleChange_price_low(e) {
		this.setState({
			price_low: e.target.value
		});
	}
	handleChange_price_high(e) {
		this.setState({
			price_high: e.target.value
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
	handleChange_roomTyped(e) {
		this.setState({
			roomType: e.target.value
		});
	}

	/* ---- Q3a (Best Genres) ---- */
	componentDidMount() {
		// fetch accomodates

	  fetch("http://localhost:8081/accomodate", {
      method: 'GET' // The type of HTTP request.
    })
      .then(res => res.json()) // Convert the response data to a JSON.
      .then(accomodatesList => {

      	let accomodatesDivs = accomodatesList.map((accomodates, i) =>
          <option value={accomodates.accomodates}>{accomodates.accomodates}</option>
        );

        this.setState({
          accomodates_list: accomodatesDivs,

        })
      })
      .catch(err => console.log(err))


			// fetch beds
			fetch("http://localhost:8081/beds", {
	      method: 'GET' // The type of HTTP request.
	    })
	      .then(res => res.json()) // Convert the response data to a JSON.
	      .then(bedList => {

	      	let bedDivs = bedList.map((bed, i) =>
	          <option value={bed.bed}>{bed.bed}</option>
	        );

	        this.setState({
	          beds: bedDivs,
				
	        })
	      })
	      .catch(err => console.log(err))

				// fetch room_type
				fetch("http://localhost:8081/room_type", {
		      method: 'GET' // The type of HTTP request.
		    })
		      .then(res => res.json()) // Convert the response data to a JSON.
		      .then(roomTpyeList => {
				
		      	let roomTpyesDivs = roomTpyeList.map((roomTpye, i) =>
		          <option value={roomTpye.roomTpye}>{roomTpye.roomTpye}</option>
		        );
				
		        this.setState({
				  room_tpye: roomTpyeDivs,
							
		        })
		      })
		      .catch(err => console.log(err))
	}


	/* ---- Q3b (Best Genres) ---- */
	submitResult() {
		console.log("neighborhood is: " + this.state.neighborhood)
		console.log("price low is: " + this.state.price_low)
		console.log("price high is: " + this.state.price_high)

		fetch("http://localhost:8081/airbnb/" +
		this.state.neighborhood+ "&" + this.state.accomodates
		+ "&" + this.state.beds+ "&" + this.state.room_type
		+ "&" + this.state.price_low + "&" + this.state.price_high, {
      method: 'GET' // The type of HTTP request.
    })
      .then(res => res.json()) // Convert the response data to a JSON.
      .then(genreratList => {
		// console.log("genreLIST is: "+genreratList)
      	let genrerateDivs = genreratList.map((airbnbResults, i) =>
          <BestAirbnbRow airbnbResults={airbnbResults} />
        );

        this.setState({
          result: genrerateDivs
        })
      })
      .catch(err => console.log(err))
	}



	render() {

		return (
			<div className="BestGenres">
				<PageNavbar active="bestgenres" />

				<div className="container bestgenres-container">
			      <div className="jumbotron">
			        <div className="h5">Best Genres</div>

			        <div className="years-container">
			          <div className="dropdown-container">



									<input type='text' placeholder="Enter Neighborhood" value={this.state.neighborhood} onChange={this.handleChange_neighborhood} id="neighborhood" className="neighborhood-input"/>

									<select value={this.state.accomodates} onChange={this.handleChange_accomodates} className="dropdown" id="accomodatesDropdown">
			            	<option select value> -- select an option -- </option>
			            	{this.state.accomodates_list}
			            </select>
									// <select value={this.state.bed} onChange={this.handleChange_bed} className="dropdown" id="bedsDropdown">
			            // 	<option select value> -- select an option -- </option>
			            // 	{this.state.beds}
			            // </select>
									// <select value={this.state.roomType} onChange={this.handleChange_roomType} className="dropdown" id="room_typeDropdown">
			            // 	<option select value> -- select an option -- </option>
			            // 	{this.state.oom_type}
			            // </select>

									<input type='text' placeholder="Enter price_low" value={this.state.price_low} onChange={this.handleChange_price_low} id="pl" className="neighborhood-input"/>
									<input type='text' placeholder="Enter price_high" value={this.state.price_high} onChange={this.handleChange_price_high} id="ph" className="neighborhood-input"/>

			            <button className="submit-btn" id="decadesSubmitBtn" onClick={this.submitResult}>Submit</button>
			          </div>
			        </div>
			      </div>
			      <div className="jumbotron">
			        <div className="movies-container">
			          <div className="movie">


								// schema name
			            <div className="header"><strong>name</strong></div>
			            <div className="header"><strong>accommodates</strong></div>
			            <div className="header"><strong>beds</strong></div>
			            <div className="header"><strong>price</strong></div>
			            <div className="header"><strong>rating</strong></div>

			          </div>
			          <div className="movies-container" id="results">
			            {this.state.result}
			          </div>
			        </div>
			      </div>
			    </div>
			</div>
		);
	}
}
