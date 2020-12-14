import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

export default class BestAirbnbRow extends React.Component {
	constructor(props) {
		super(props);
		this.state = {

		}
		this.getcolor = this.getcolor.bind(this);
	}

	getcolor() {
		var rate = this.props.airbnbResults.rating;

		// console.log(rate);
		if (rate > 90) {
			return "text-success";
		}
		else if (rate > 80) {
			return "text-warning";
		}
		else if (rate == 'N/A') {
			return "text-secondary";
		}
		else {
			return "text-danger";
		}
	}

	render() {
		return (
			<div class="container">
				<div class="row justify-content-md-center" >
					<div class="col-4">
						<a href = {this.props.airbnbResults.picture_url}>
							<img src={this.props.airbnbResults.picture_url} class="img-fluid rounded border border-primary border-3" alt="Apartment" />
						</a>
					</div>
				</div>
				<br/>
				<div class="row justify-content-md-center">
					<div class="text-primary">
						{this.props.airbnbResults.name}
					</div>
				</div>
				<div class="row justify-content-md-around">
					<div class="">
						accommodates: {this.props.airbnbResults.accommodates}
					</div>
					<div class="" >
						# beds: {this.props.airbnbResults.beds}
					</div>
					<div class="">
						price: {this.props.airbnbResults.price}
					</div>
					<div class={this.getcolor()}>
						rating: {this.props.airbnbResults.rating}
					</div>
				</div>
				<div class="row justify-content-md-center">
					<div class="">
						number of crimes within 0.1 miles in 2020: {this.props.airbnbResults.num_crimes}
					</div>
				</div>
				<br/>
				<br/>
			</div>
		);
	}
}
