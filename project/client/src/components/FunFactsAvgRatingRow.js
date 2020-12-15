import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

export default class FunFactsAvgRatingRow extends React.Component {
	constructor(props) {
		super(props);
	}

	render() {
		return (
			<div className="FunFactsAvgRatingResults">
				<div className="host_neighbourhood">{this.props.host_neighbourhood}</div>
				<div className="count">{this.props.count}</div>
				<div className="avg_rating">{this.props.avg_rating}</div>
			</div>
		);
	}
}
