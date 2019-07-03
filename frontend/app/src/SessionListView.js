import React from 'react';

import VideoDetail from './VideoDetail';
import SessionInfoTabs from './SessionInfoTabs';

import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Divider from '@material-ui/core/Divider';
import Paper from '@material-ui/core/Paper';


function SessionListView(props) {

	// constructor(props) {
	// 	super(props);
	// 	this.state = {
	// 		request_url: props.request_url || '',
	// 		sessions: props.sessions || []
	// 	}
	// }

	// static getDerivedStateFromProps(nextProps, prevState) {
	// 	if(nextProps.request_url !== prevState.request_url) {
	// 		return { 
	// 			request_url: nextProps.request_url,
	// 			sessions: nextProps.sessions
	// 		};
	// 	} else {
	// 		return null;
	// 	}

	// }

	const transformSessionsToListItems = (sessions) => {
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
	
	return (
		<div className="SessionList">
			<List>{transformSessionsToListItems(props.sessions)}</List>
		</div>
	);
}

export default SessionListView;

 