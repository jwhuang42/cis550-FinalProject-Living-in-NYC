import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

export default class BestGenreRow extends React.Component {
	constructor(props) {
		super(props);
	}

	render() {
		return (
			<div className="airbnbResults">
				<div className="name">{this.props.airbnbResults.name}</div>
				<div className="accommodates">{this.props.airbnbResults.accommodates}</div>
				<div className="beds">{this.props.airbnbResults.beds}</div>
				<div className="price">{this.props.airbnbResults.price}</div>
				<div className="rating">{this.props.airbnbResults.rating}</div>
			</div>
		);
	}
}
