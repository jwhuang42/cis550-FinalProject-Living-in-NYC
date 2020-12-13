import React from 'react';
import {
	BrowserRouter as Router,
	Route,
	Switch
} from 'react-router-dom';
// import Dashboard from './Dashboard';

import BestAirbnb from './BestAirbnb';
import BestHotel from './BestHotel';
import BestPlace from './BestPlace';
import FunFacts from './FunFacts';

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
							path="/bestairbnb"
							render={() => (
								<BestAirbnb />
							)}
						/>
						<Route
							exact
							path="/besthotel"
							render={() => (
								<BestHotel />
							)}
						/>
						<Route
							exact
							path="/bestplace"
							render={() => (
								<BestPlace />
							)}
						/>
						<Route
							exact
							path="/funfacts"
							render={() => (
								<FunFacts />
							)}
						/>
					</Switch>
				</Router>
			</div>
		);
	}
}
