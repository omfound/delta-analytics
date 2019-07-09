import React, { useState, useEffect } from 'react';
import axios from 'axios';
import moment from 'moment';

import logo from './omf_logo.png';
import SessionListView from './SessionListView';
import AnalyticsView from './AnalyticsView';
import FilterView from './FilterView';

import { makeStyles } from '@material-ui/core/styles';

import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';

import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';


const API = 'http://127.0.0.1:5000';

const STARTER_TOPICS = ['transit', 'budget', 'health', 'crime', 'economy'];
const ALL_TOPICS = [
  {
    "topic_id": 0, 
    "topic_name": "water, transportation"
  }, 
  {
    "topic_id": 2, 
    "topic_name": "service"
  }, 
  {
    "topic_id": 3, 
    "topic_name": "health"
  }, 
  {
    "topic_id": 5, 
    "topic_name": "license"
  }, 
  {
    "topic_id": 6, 
    "topic_name": "crime"
  }, 
  {
    "topic_id": 7, 
    "topic_name": "transit"
  }, 
  {
    "topic_id": 8, 
    "topic_name": "law"
  }, 
  {
    "topic_id": 9, 
    "topic_name": "public_space"
  }, 
  {
    "topic_id": 11, 
    "topic_name": "community"
  }, 
  {
    "topic_id": 12, 
    "topic_name": "education"
  }, 
  {
    "topic_id": 14, 
    "topic_name": "budget"
  }, 
  {
    "topic_id": 16, 
    "topic_name": "zoning"
  }, 
  {
    "topic_id": 17, 
    "topic_name": "espanol"
  }, 
  {
    "topic_id": 18, 
    "topic_name": "procedural"
  }, 
  {
    "topic_id": 19, 
    "topic_name": "housing"
  }, 
  {
    "topic_id": 20, 
    "topic_name": "plenary"
  }, 
  {
    "topic_id": 21, 
    "topic_name": "land"
  }, 
  {
    "topic_id": 24, 
    "topic_name": "public_safety"
  }, 
  {
    "topic_id": 25, 
    "topic_name": "mental_health"
  }, 
  {
    "topic_id": 26, 
    "topic_name": "public_health"
  }, 
  {
    "topic_id": 27, 
    "topic_name": "climate_change"
  }, 
  {
    "topic_id": 28, 
    "topic_name": "agriculture"
  }, 
  {
    "topic_id": 29, 
    "topic_name": "utilities"
  }, 
  {
    "topic_id": 30, 
    "topic_name": "legal"
  }, 
  {
    "topic_id": 32, 
    "topic_name": "transportation"
  }, 
  {
    "topic_id": 33, 
    "topic_name": "economy"
  }, 
  {
    "topic_id": 34, 
    "topic_name": "immigration"
  }
]

const useStyles = makeStyles(theme => ({
  root: {},
  content: {
    background: '#F0F0F7'
  },
  container: {
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(4)
  },
  paper: {
    padding: theme.spacing(2),
    display: 'flex',
    overflowX: 'hidden',
    overflowY: 'auto',
    flexDirection: 'column'
  },
  appBarSpacer: theme.mixins.toolbar,
  appBar: {
    zIndex: theme.zIndex.drawer + 1
  },
  toolbar: {}
}));


function App() {
  const classes = useStyles();

  // Set up default dates
  const endDateString = moment();
  const startDateString = endDateString.clone().subtract(1, 'week');

  // Initialize state
  const [state, setState] = useState({
    topics: STARTER_TOPICS,
    all_topics: ALL_TOPICS.map(t => (t.topic_name)),
    startDate: startDateString.format('YYYY-MM-DD'),
    endDate: endDateString.format('YYYY-MM-DD'),
    keyword: '',
    sessions: []
  });

  const [query, setQuery] = useState({ 
    url: `${API}/sessions?start_date=${state.startDate}&end_date=${state.endDate}` 
  });

  useEffect(() => {
    console.log("Pulling new data.")
    axios.get(query.url).then((res) => { 
      setState({ ...state, sessions: res.data }); 
    }); 
  }, [query]);

  // State change handlers
  const keywordHandleChange = (event) => {
    setState({ ...state, keyword: event.target.value });
  }

  const startDateHandleChange = (event) => {
    setState({ ...state, startDate: event.target.value });
  }

  const endDateHandleChange = (event) => {
    setState({ ...state, endDate: event.target.value });
  }

  const topicHandleChange = (event) => {
    setState({ ...state, topics: event.target.value })
  }

  const searchButtonClick = (event) => {
    console.log("Setting new search URL.")
    setQuery({ 
      url: `${API}/sessions?start_date=${state.startDate}&end_date=${state.endDate}` 
    });
  }

	return (

    <div className={classes.root}> 

      <AppBar position="absolute" className={classes.appBar}>
        <Toolbar className={classes.toolbar}>
          <img src={logo} alt="logo" height="10%" width="10%"/>
        </Toolbar>
      </AppBar>

      <main className={classes.content}>
        <div className={classes.appBarSpacer} />
        <Container className={classes.container} maxWidth="lg">
          <Grid container spacing={3}>

            <Grid item xs={12} md={5} lg={5}>
              <Paper className={classes.paper}>
                <SessionListView request_url="blah" sessions={state.sessions} />
              </Paper>
            </Grid>

            <Grid item xs={12} md={4} lg={4}>
              <Paper className={classes.paper}>
                <AnalyticsView />
              </Paper>
            </Grid>

            <Grid item xs={12} md={3} lg={3}>
              <Paper className={classes.paper}>
                <FilterView 
                  state={state}
                  keywordHandleChange={keywordHandleChange}
                  startDateHandleChange={startDateHandleChange}
                  endDateHandleChange={endDateHandleChange}
                  topicHandleChange={topicHandleChange}
                  searchButtonClick={searchButtonClick}
                />
              </Paper>
            </Grid>

          </Grid>
        </Container>
      </main>
    </div>
  );
  
}

export default App;
