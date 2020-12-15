import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

export default class FunFactsNumMoviesRow extends React.Component {
	constructor(props) {
		super(props);
	}

	render() {
		return (
			<div className="FunFactsNumMoviesResults">
				<div className="neighborhood">{this.props.neighborhood}</div>
				<div className="Borough">{this.props.Borough}</div>
				<div className="num">{this.props.num}</div>
			</div>
		);
	}
}
