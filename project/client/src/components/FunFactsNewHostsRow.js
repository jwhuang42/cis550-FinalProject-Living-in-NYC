import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

export default class FunFactsNewHostsRow extends React.Component {
	constructor(props) {
		super(props);
	}

	render() {
		return (
			<div className="FunFactsNewHostsResults">
				<div className="year">{this.props.year}</div>
				<div className="num">{this.props.num}</div>
			</div>
		);
	}
}
