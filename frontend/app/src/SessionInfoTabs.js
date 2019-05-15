import React from 'react';

import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';

class SessionInfoTabs extends React.Component {

	constructor(props) {
		// props 
		// ~ session information 
		super(props);
		this.state = {
			value: 0 
		};
	}

	handleChange = (event, value) => {
		this.setState({ value });
	}

	render() {
		return (
			<div className='SessionInfoTabs'>
				<Tabs value={this.state.value} onChange={this.handleChange}>
					<Tab label="Session Information" />
					<Tab label="Relevant Captions" />
					<Tab label="Agenda & Documents" />
				</Tabs>
				{this.state.value === 0 && <Typography component="div">Session Information</Typography>}
				{this.state.value === 1 && <Typography component="div">Relevant Captions</Typography>}
				{this.state.value === 2 && <Typography component="div">Agenda & Documents</Typography>}
			</div>
		);
	}
}

export default SessionInfoTabs;