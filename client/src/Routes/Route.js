import React from 'react';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom'
import Dashboard from '../components/Dashboard';
import Login from '../components/Login';
import Register from '../components/Register';
import {makeStyles} from '@material-ui/core';

const useStyles = makeStyles(theme => ({
  root: {
    height: '100vh',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  }
}))

const Routes = () => {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <Router>
        <Switch>
          <Route exact path="/" component={Login}/>
          <Route exact path="/dashboard" component={Dashboard}/>
          <Route exact path="/register" component={Register}/>
        </Switch>
      </Router>
    </div>
  )
}

export default Routes
