import React from 'react';

import axios from 'axios';

import logo from './omf_logo.png';
import VideoDetail from './VideoDetail';
import SessionListView from './SessionListView';


import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';


import './App.css';

class App extends React.Component {

  // See this for state-change code:
  // ~ https://reactjs.org/docs/lifting-state-up.html
  // ~ https://blog.logrocket.com/patterns-for-data-fetching-in-react-981ced7e5c56
  
  constructor(props) {
  	super(props);
  	this.state = { sessions: [], isFetching: false };
  }


  componentDidMount() {
  	this.setState({...this.state, isFetching: true});
  	axios.get(`https://open.ompnetwork.org/api/site/400/sessions?limit=10&live=0`)
  		.then((res) => {
  			console.log(res.data.results);
  			this.setState({sessions: res.data.results});
  		});
  	this.setState({...this.state, isFetching: false});
  }

  // Need to signal child component that state has changed because 
  // there's lead time in the GET call to the API and because you're
  // passing stuff as props, which only happens through the constructor!

  
  render() {

  	return (

	    <div className = "Container"> 

	      <AppBar position = "static">
	        <Toolbar>
	          <img src={logo} alt="logo" height="10%" width="10%"/>
	        </Toolbar>
	      </AppBar>
      	 
	      <SessionListView 
	      	isFetching = {this.state.isFetching}
	      	sessions = {this.state.sessions}
	      />
	    </div>

	);
  }
}

export default App;
