import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

export default class FunFactsRow extends React.Component {
	constructor(props) {
		super(props);
	}

	render() {
		return (
			<div className="funfacts">
				<div className="host_neighbourhood">{this.props.host_neighbourhood}</div>
				<div className="count">{this.props.count}</div>
				<div className="avg_rating">{this.props.avg_rating}</div>
				<div className="year">{this.props.year}</div>
				<div className="num">{this.props.num}</div>
			</div>
		);
	}
}
