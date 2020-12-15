import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'

export default class BestHotelRow extends React.Component {
	constructor(props) {
		super(props);
	}

	render() {
		return (
			<div className="hotelResults">
				<div className="name">{this.props.name}</div>
				<div className="street_address">{this.props.street_address}</div>
				<div className="class">{this.props.class}</div>
				<div className="price">{this.props.price}</div>
				<div className="overall">{this.props.overall}</div>
			</div>
		);
	}
}
