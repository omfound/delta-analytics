import React, { useState } from 'react';
import ReactPlayer from 'react-player'
import Youtube from 'react-youtube';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Divider from '@material-ui/core/Divider';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
  sessionContainer: {
  	width: '100vh',
  	height: '100vh'
  },
  sessionRow: {
  	// maxWidth: '100vh'
  },
  video: {
  	position: 'absolute',
  	top: 0,
  	left: 0
  },
  videoContainer: {
  	position: 'relative',
  	paddingTop: '56.25%'
  },
  fixedHeight: {
    height: 240,
  }
}));


function VideoDetail(props) {

	const classes = useStyles();
	const url = `https://www.youtube.com/watch?v=${props.videoId}`
	console.log(url)

	return(
		<div className={classes.videoContainer}>
			<ReactPlayer
				className={classes.video}
				url={url}
				width='100vh'
				height='100vh'
			/>
		</div>
	);
}


function SessionInfoTabs(props) {

	const [tabIndex, setTabIndex] = useState(0);

	return (
		<div className='SessionInfoTabs'>
			<Tabs value={tabIndex} onChange={(e, v) => setTabIndex(v)}>
				<Tab label="Information" />
				<Tab label="Captions" />
				<Tab label="Documents" />
			</Tabs>
			{tabIndex === 0 && <Typography component="div">Information</Typography>}
			{tabIndex === 1 && <Typography component="div">Captions</Typography>}
			{tabIndex === 2 && <Typography component="div">Documents</Typography>}
		</div>
	);
}


function SessionListView(props) {

	const classes = useStyles();

	const transformSessionsToListItems = (sessions) => {
		if(sessions.length > 0) {
			const listItems = sessions.map((session) => 
				<ListItem className={classes.sessionRow}>
					<VideoDetail videoId = {session.video_id}/>
					{/*<SessionInfoTabs session = {session}/>*/}
				</ListItem>
			);
			return listItems;
		} else {
			return null;
		}
	}
	
	return (
		<div className={classes.sessionContainer}>
			<List>{transformSessionsToListItems(props.sessions)}</List>
		</div>
	);
}

export default SessionListView;

 