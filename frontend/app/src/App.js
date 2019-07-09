import React, { useState } from 'react';
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


// Mock data 

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

var sessions = [{"captions": ['hello is this caption', 'no this is patrick'], "id":"109417","user_id":"400","site_id":"400","created":"1561418795","updated":"1561478971","cuepoints_updated":"1561478971","title":"06-24-19 Council Meeting Video","label":"06-24-19 Council Meeting Video","url":"https:\/\/Lakewood.open.media\/sessions\/109417","embed_url":"https:\/\/Lakewood.open.media\/embed\/sessions\/109417","video_url":"https:\/\/www.youtube.com\/watch?v=mzlptlkOqxU","video_id":"mzlptlkOqxU","video_image_url":"https:\/\/img.youtube.com\/vi\/mzlptlkOqxU\/0.jpg","archive_id":false,"date":"1561402800","documents":[{"id":"17636","file_id":"16675","url":"https:\/\/ompnetwork.s3-us-west-2.amazonaws.com\/sites\/400\/documents\/city-council-meeting-agenda-06-24-2019.pdf?LfBMpt28Tbqbg_zZjUsJZmrTARtEYaiP","label":null,"external_id":null,"session_id":"109417","session_title":"06-24-19 Council Meeting Video","user_id":"400","type":"Agenda","agenda_provider_id":null,"agenda_provider_agenda_id":null,"storage":"attachment","provider":"generic","type_id":"1"},{"id":"17637","file_id":"16677","url":"https:\/\/ompnetwork.s3-us-west-2.amazonaws.com\/sites\/400\/documents\/city-council-meeting-agenda-packet-06-24-2019.pdf?.WlrD.jr2Om2mNeANOkgRv8hIaGRsh29","label":null,"external_id":null,"session_id":"109417","session_title":"06-24-19 Council Meeting Video","user_id":"400","type":"Packet","agenda_provider_id":null,"agenda_provider_agenda_id":null,"storage":"attachment","provider":"generic","type_id":"5"}],"categories":[{"id":"311","user_id":"400","label":"Meetings","position":"0","livestream":"1","hidden":"0"}],"live_status":"0","minutes_status":"0"}]

const API = 'http://127.0.0.1:5000'

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

  // const newDate = new Date();
  // const date = String(newDate.getDate()).padStart(2,'0');
  // const month = String(newDate.getMonth() + 1).padStart(2,'0');
  // const startYear = String(newDate.getFullYear());
  // const endYear = String(newDate.getFullYear());
  // const startDateString = `${startYear}-${month}-${date}`;
  // const endDateString = `${endYear}-${month}-${date}`; 
  const endDateString = moment();
  const startDateString = endDateString.clone().subtract(1, 'week');

  const [state, setState] = useState({
    topics: [],
    startDate: startDateString.format('YYYY-MM-DD'),
    endDate: endDateString.format('YYYY-MM-DD'),
    keyword: '',
    sessions: []
  });

  const callApi = () => {
    const url = `${API}/sessions?start_date=${state.startDate}&end_date=${state.endDate}`;
    console.log("hello!")
    axios.get(url).then((res) => { 
      setState({...state, sessions: res.data }); 
    }); 
  }

  // Set initial sessions 
  callApi();

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
                <AnalyticsView data={data}/>
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
                  callApi={callApi}
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
