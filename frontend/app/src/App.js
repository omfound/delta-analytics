import React from 'react';

import axios from 'axios';

import logo from './omf_logo.png';
import VideoDetail from './VideoDetail';
import SessionListView from './SessionListView';
import AnalyticsView from './AnalyticsView';
import FilterView from './FilterView'

import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';


import './App.css';

var data = [
  {
    "value": 86.85, 
    "label": "Health", 
    "total_minutes_per_topic": 608, 
    "id": "health",
    "color": "hsl(126, 70%, 50%)"
  }, 
  {
    "value": 57.16, 
    "label": "Law", 
    "id": "law",
    "color": "hsl(277, 70%, 50%)"
  }
];

// var data = [
//   {
//     "avg_minutes_per_topic": 86.85714285714286, 
//     "display_topic_name": "health", 
//     "session_count": 7, 
//     "total_minutes_per_topic": 608, 
//     "true_topic_id": 3
//   }, 
//   {
//     "avg_minutes_per_topic": 57.166666666666664, 
//     "display_topic_name": "law", 
//     "session_count": 6, 
//     "total_minutes_per_topic": 343, 
//     "true_topic_id": 8
//   }
// ]

class App extends React.Component {

  // See this for state-change code:
  // ~ https://reactjs.org/docs/lifting-state-up.html
  // ~ https://reactjs.org/blog/2018/03/27/update-on-async-rendering.html#fetching-external-data
  
  constructor(props) {
  	super(props);
  	this.state = { 
  		sessions: [], 
  		request_url: ''
  	};
  }

  componentDidMount() {
  	// returns a promise, so don't do anything after and expect it to happen synchronously
  	axios.get(`https://open.ompnetwork.org/api/site/400/sessions?limit=3&live=0`)
  		.then((res) => {
  			this.setState({
  				sessions: res.data.results,
  				request_url: 'https://open.ompnetwork.org/api/site/400/sessions?limit=10&live=0'
  			});
  		});
  }

  
  render() {

  	return (

	    <div className = "Container"> 

	      <AppBar position = "static">
	        <Toolbar>
	          <img src={logo} alt="logo" height="10%" width="10%"/>
	        </Toolbar>
	      </AppBar>
      	<div className = "ContentView">
  	      <SessionListView
  	      	request_url = {this.state.request_url}
  	      	sessions = {this.state.sessions}
  	      />

          <AnalyticsView
            data= {data}
          />

          <FilterView
          />
        </div>
	    </div>

	);
  }
}

export default App;
