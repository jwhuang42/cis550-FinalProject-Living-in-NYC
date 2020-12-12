import React from 'react';
import {
	BrowserRouter as Router,
	Route,
	Switch
} from 'react-router-dom';
// import Dashboard from './Dashboard';

import BestAirbnb from './BestAirbnb';
import BestHousing from './BestHousing';
import BestLiving from './BestLiving';
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
							path="/besthousing"
							render={() => (
								<BestHousing />
							)}
						/>
						<Route
							exact
							path="/bestliving"
							render={() => (
								<BestLiving />
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
