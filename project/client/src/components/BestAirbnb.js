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


			neighborhood: "Midtown",
			accomodates: "1",
			bed: "1",
			roomType: "",
			price_low: "1",
			price_high: "1000",

			result: [],


			accomodates_list: [],
			beds_list: [],
			room_type_list: []
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
	handleChange_roomType(e) {
		this.setState({
			roomType: e.target.value
		});
	}

	/* ---- Q3a (Best Genres) ---- */
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


	/* ---- Q3b (Best Genres) ---- */
	submitResult() {
		console.log("neighborhood is: " + this.state.neighborhood)
		console.log("price low is: " + this.state.price_low)
		console.log("price high is: " + this.state.price_high)
		var rmType = this.state.roomType.replace(/ /g,"_");
		rmType = rmType.replace("/","q")

		fetch("http://localhost:8081/airbnb/" +	this.state.neighborhood+ "&" + this.state.accomodates	+ "&" + this.state.bed + "&" + rmType	+ "&" + this.state.price_low + "&" + this.state.price_high, {
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

	// <div className="header"><strong>name</strong></div>
	// <div className="header"><strong>accommodates</strong></div>
	// <div className="header"><strong>beds</strong></div>
	// <div className="header"><strong>price</strong></div>
	// <div className="header"><strong>rating</strong></div>

	// <span class="label info">Enter your preferred neighborhood:</span>
	// <input type='text' placeholder="Enter Neighborhood" value={this.state.neighborhood} onChange={this.handleChange_neighborhood} id="neighborhood" className="neighborhood_input"/>





// Below is an example code of a much better header part: make sure to use class as attribute in each tag, not className

// <form>
//   <div class="form-row">
//     <div class="form-group col-md-6">
//       <label for="inputEmail4">Email</label>
//       <input type="email" class="form-control" id="inputEmail4" placeholder="Email">
//     </div>
//     <div class="form-group col-md-6">
//       <label for="inputPassword4">Password</label>
//       <input type="password" class="form-control" id="inputPassword4" placeholder="Password">
//     </div>
//   </div>
//   <div class="form-group">
//     <label for="inputAddress">Address</label>
//     <input type="text" class="form-control" id="inputAddress" placeholder="1234 Main St">
//   </div>
//   <div class="form-group">
//     <label for="inputAddress2">Address 2</label>
//     <input type="text" class="form-control" id="inputAddress2" placeholder="Apartment, studio, or floor">
//   </div>
//   <div class="form-row">
//     <div class="form-group col-md-6">
//       <label for="inputCity">City</label>
//       <input type="text" class="form-control" id="inputCity">
//     </div>
//     <div class="form-group col-md-4">
//       <label for="inputState">State</label>
//       <select id="inputState" class="form-control">
//         <option selected>Choose...</option>
//         <option>...</option>
//       </select>
//     </div>
//     <div class="form-group col-md-2">
//       <label for="inputZip">Zip</label>
//       <input type="text" class="form-control" id="inputZip">
//     </div>
//   </div>
//   <div class="form-group">
//     <div class="form-check">
//       <input class="form-check-input" type="checkbox" id="gridCheck">
//       <label class="form-check-label" for="gridCheck">
//         Check me out
//       </label>
//     </div>
//   </div>
//   <button type="submit" class="btn btn-primary">Sign in</button>
// </form>


	render() {

		return (
			<div className="BestGenres">
				<PageNavbar active="bestgenres" />

				<div class="container bestgenres-container">
						<div><p></p></div>
			      <div class="jumbotron" >
			        <div class="h1 text-primary">Best Bnb recommendation</div>

			        <br/>
			          <div className="dropdown-container">

									<div class="row">
										<div class="input-group mb-3">
											<div class="input-group-prepend">
												<span class="input-group-text" id="">Enter a neighborhood you prefer </span>
											</div>
											<input type="text" class="form-control" placeholder="Enter Neighborhood" value={this.state.neighborhood} onChange={this.handleChange_neighborhood} id="neighborhood"/>
										</div>



									</div>
									<br/>

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
			            		<button type="button" class="btn btn-danger"  onClick={this.submitResult}>Search</button>
										</div>
									</div>
			          </div>

			      </div>
			      <div class="jumbotron"  >

			          <div class="row" className="airbnb-head" >

			            <div class="col" ><strong>You May like: </strong></div>

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
