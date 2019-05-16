import React from 'react';

import VideoDetail from './VideoDetail';
import SessionInfoTabs from './SessionInfoTabs';

import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Divider from '@material-ui/core/Divider';
import Paper from '@material-ui/core/Paper';


class SessionListView extends React.Component {

	constructor(props) {
		// props 
		// ~ a list of sessions
		super(props);
		this.state = {
			request_url: props.request_url || '',
			sessions: props.sessions || []
		}
		console.log("Session List View Constructor::")
		console.log(this.state)
	}

	transformSessionsToListItems(sessions) {
		if(sessions.length > 0) {
			const listItems = sessions.map((session) => 
				<ListItem>
					<VideoDetail videoId = {session.video_id}/>
					<SessionInfoTabs session = {session}/>
				</ListItem>
			);
			return listItems;
		} else {
			return null;
		}
	}

	static getDerivedStateFromProps(nextProps, prevState) {
		if(nextProps.request_url !== prevState.request_url) {
			console.log('getDerivedStateFromProps::')
			console.log('nextProps', nextProps)
			console.log('prevState', prevState)
			return { 
				request_url: nextProps.request_url,
				sessions: nextProps.sessions
			};
		} else {
			return null;
		}

	}

	render() {
		return (
			<div className="SessionList">
				<Paper elevation={1}>
					<List>{this.transformSessionsToListItems(this.state.sessions)}</List>
				</Paper>
			</div>
		);
	}
}

export default SessionListView;

 