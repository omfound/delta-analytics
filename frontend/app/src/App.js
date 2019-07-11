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

const STARTER_TOPICS = ['6', '7', '11', '14'];
const ALL_TOPICS = {
    '0': "water, transportation",
    '2': "service",
    '3': "health",
    '5': "license", 
    '6': "crime",
    '7': "transit",
    '8': "law",
    '9': "public_space",
    '11': "community",
    '12': "education",
    '14': "budget",
    '16': "zoning",
    '17': "espanol",
    '18': "procedural",
    '19': "housing",
    '20': "plenary",
    '21': "land",
    '24': "public_safety",
    '25': "mental_health",
    '26': "public_health",
    '27': "climate_change",
    '28': "agriculture",
    '29': "utilities",
    '30': "legal",
    '32': "transportation",
    '33': "economy",
    '34': "immigration"
};

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
  // const endDateString = moment();
  // const startDateString = endDateString.clone().subtract(1, 'week');
  // ~ Some good defaults for example DB
  const endDateString = moment('2018-08-30');
  const startDateString = moment('2018-08-27');

  // Initialize state
  const [state, setState] = useState({
    topics: STARTER_TOPICS,
    all_topics: ALL_TOPICS,
    startDate: startDateString.format('YYYY-MM-DD'),
    endDate: endDateString.format('YYYY-MM-DD'),
    keyword: '',
    sessions: [],
    sessionAnalytics: []
  });

  const [query, setQuery] = useState({ 
    url: `${API}/sessions?start_date=${state.startDate}&end_date=${state.endDate}&topic_ids=${state.topics}&keyword=${state.keyword}`
  });

  const [queryAnalytics, setQueryAnalytics] = useState({
    url: `${API}/session_analytics?start_date=${state.startDate}&end_date=${state.endDate}&topic_ids=${state.topics}`
  });

  // trigger api call for session listing
  useEffect(() => {
    axios.get(query.url).then((res) => { 
      setState({ ...state, sessions: res.data }); 
    }); 
  }, [query]);

  // trigger api call for analytics view
  useEffect(() =>{
    axios.get(queryAnalytics.url).then((res) => {
      setState({...state, sessionAnalytics: res.data })
    });
  }, [queryAnalytics])

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
    console.log(event.target.value)
    setState({ ...state, topics: event.target.value })
  }

  const searchButtonClick = (event) => {
    // if no filters, don't pass topics arguments
    let formatted_topics = '';
    if(state.topics.length > 0) {
      formatted_topics = state.topics.join(',') ;
    } 
      
    setQuery({ url: `${API}/sessions?start_date=${state.startDate}&end_date=${state.endDate}&topic_ids=${formatted_topics}&keyword=${state.keyword}` });
    setQueryAnalytics({ url: `${API}/session_analytics?start_date=${state.startDate}&end_date=${state.endDate}&topic_ids=${formatted_topics}` });
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
                <AnalyticsView state={state}/>
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
