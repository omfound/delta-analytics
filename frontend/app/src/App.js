import React from 'react';

import logo from './omf_logo.png';
import VideoDetail from './VideoDetail';

import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Divider from '@material-ui/core/Divider';
import Paper from '@material-ui/core/Paper';

import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';

import './App.css';

function App() {
  return (

    <div className = "Container"> 

      <AppBar position = "static">
        <Toolbar>
          <img src={logo} alt="logo" height="10%" width="10%"/>
        </Toolbar>
      </AppBar>


      <div className = "SessionList">

        

        <Paper elevation={1}>
          <List>
            <ListItem>
              <VideoDetail videoId = "tAA_yWX8ycQ"/>
            </ListItem>
            <Divider />
            <ListItem>
              <VideoDetail videoId = "tAA_yWX8ycQ"/>
            </ListItem>
            <Divider />
            <ListItem>
              <VideoDetail videoId = "tAA_yWX8ycQ"/>
            </ListItem>
          </List>
        </Paper>

      </div>

    </div>

  );
}

export default App;
