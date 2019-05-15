import React from 'react';

import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Divider from '@material-ui/core/Divider';
import Paper from '@material-ui/core/Paper';

class SessionListView extends React.Component {

	constructor(props) {
		// props 
		// ~ a list of sessions
		super(props);
		console.log(props)
		const first_three = props.sessions.slice(1,3);
		this.sessionsToRender = first_three.map((session) => 
				<li><h1>{session.title}</h1></li>
		);
	}

	render() {
		return (
			<div className="SessionList">
				<Paper elevation={1}>
					<ul>{this.sessionsToRender}</ul>
				</Paper>
			</div>
		);
	}
}

export default SessionListView;

 