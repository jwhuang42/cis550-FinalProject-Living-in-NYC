import React from 'react';
import {
	BrowserRouter as Router,
	Route,
	Switch
} from 'react-router-dom';
import Dashboard from './Dashboard';

import BestAirbnb from './BestAirbnb';


export default class App extends React.Component {

	render() {
		return (
			<div className="App">
				<Router>
					<Switch>
						<Route
							exact
							path="/"
							render={() => (
								<BestAirbnb />
							)}
						/>
						<Route
							exact
							path="/dashboard"
							render={() => (
								<BestAirbnb />
							)}
						/>

					</Switch>
				</Router>
			</div>
		);
	}
}
