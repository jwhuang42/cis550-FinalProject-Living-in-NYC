import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'

export default class BestHousingRow extends React.Component {
	constructor(props) {
		super(props);
	}

	render() {
		return (
			<div className="bestHotelResults">
				<div className="name">{this.props.name}</div>
				<div className="street_address">{this.props.street_address}</div>
				<div className="hotel_class">{this.props.hotel_class}</div>
				<div className="price">{this.props.price}</div>
				<div className="overall">{this.props.overall}</div>
			</div>
		);
	}
}
name, street_address, hotel_class, price, overall
