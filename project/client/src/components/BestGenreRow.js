import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

export default class BestGenreRow extends React.Component {
	constructor(props) {
		super(props);
	}

	render() {
		return (
			<div className="airbnbResults">
				<div className="name">{this.props.name}</div>
				<div className="accommodates">{this.props.accommodates}</div>
				<div className="beds">{this.props.beds}</div>
				<div className="price">{this.props.price}</div>
				<div className="rating">{this.props.rating}</div>
			</div>
		);
	}
}
