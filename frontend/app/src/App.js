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
  const endDateString = moment('2018-09-01');
  const startDateString = moment('2018-08-27');

  // Set up query builder utilities

  const buildQueryString = function(start_date, end_date, topic_ids, keyword) {
    let formatted_topic_ids = '';
    if(topic_ids.length > 0) {
      formatted_topic_ids = topic_ids.join(',');
    }

    return `start_date=${start_date}&end_date=${end_date}&topic_ids=${formatted_topic_ids}&keyword=${keyword}`;
  }

  // Initialize state
  const [state, setState] = useState({
    topics: ['6', '7', '11', '14'],
    startDate: startDateString.format('YYYY-MM-DD'),
    endDate: endDateString.format('YYYY-MM-DD'),
    keyword: ''
  });
  const [data, setData] = useState({ sessions: [] });
  const [analytics_data, setAnalyticsData] = useState({ sessionAnalytics: [] });
  const [query, setQuery] = useState(buildQueryString(state.startDate, state.endDate, state.topics, state.keyword));
  const [isLoading, setIsLoading] = useState(false);

  // Effect to update analytics and session listings
  useEffect(() => {

    let listing_url = `${API}/sessions?${query}`;
    let analytics_url = `${API}/session_analytics?${query}`;

    setIsLoading(true);
    axios
      .get(listing_url)
      .then((res) => { 
        setData({ ...data, sessions: res.data }); 
      })
      .then(() => {
        setIsLoading(false);
      }); 

    axios.get(analytics_url).then((res) => { 
      setAnalyticsData({ ...analytics_data, sessionAnalytics: res.data }); 
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
    setQuery(buildQueryString(state.startDate, state.endDate, state.topics, state.keyword));
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
                <SessionListView isLoading={isLoading} sessions={data.sessions} />
              </Paper>
            </Grid>

            <Grid item xs={12} md={4} lg={4}>
              <Paper className={classes.paper}>
                <AnalyticsView data={analytics_data}/>
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
