import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

export default class FunFactsRentSaleRatio extends React.Component {
	constructor(props) {
		super(props);
	}

	render() {
		return (
			<div class="form-row">
				<div class="col-4">{this.props.zipcode}</div>
				<div class="col-4">{this.props.countyName}</div>
				<div class="col-4">{this.props.rent_sale_ratio}</div>
			</div>
		);
	}
}
