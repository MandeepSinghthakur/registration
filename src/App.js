import React from 'react';
import {  BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

import Registration from './components/registration'
import Login from './components/login'
import AllUsers from './components/allusers'
import PrivateRoute from './components/privateRoute'
import MenuBar from './components/menuBar'

export default class App extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
       <div className="App">
      <Router >
       <MenuBar/>
            <Switch>
                <Route exact path="/" component={Login} />
                <Route exact path="/register" component={Registration} />
                <PrivateRoute component={AllUsers} path="/all" exact />
                <Redirect from="*" to="/" />
            </Switch>
        </Router>
    	</div>
      );
    }
}
