import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

export default class BestGenreRow extends React.Component {
	constructor(props) {
		super(props);
	}

	render() {
		return (
			<div class="container" className="airbnbResults">
				<div class="row" className="picture_link">
					<div class="col-6">
						<a href = {this.props.airbnbResults.picture_url}>
							<img src={this.props.airbnbResults.picture_url} class="img-thumbnail" className="picture" alt="Apartment" />
							</a>
					</div>
				</div>
				<div class="row justify-content-md-center">
					<div class="col" className="name">{this.props.airbnbResults.name}</div>
				</div>
				<div class="row justify-content-md-center">
					<div class="col" className="accommodates"> accommodates: {this.props.airbnbResults.accommodates}</div>
				</div>
				<div class="row justify-content-md-center">
					<div class="col-4" className="beds"> beds#: {this.props.airbnbResults.beds}</div>
					<div class="col-4" className="price"> price: {this.props.airbnbResults.price}</div>
					<div class="col-4" className="rating"> rating: {this.props.airbnbResults.rating}</div>
				</div>
				<div class="row"><p></p></div>

			</div>
		);
	}
}
