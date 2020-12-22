import React,{useState} from 'react';
import { Route, Redirect } from 'react-router-dom';
import { isLoggedIn } from '../utils/auth'

const PrivateRoute = ({component: Component, ...rest}) => {
	const isLogin = isLoggedIn()
    return (
        // Show the component only when the user is logged in
        // Otherwise, redirect the user to /signin page
        <Route {...rest} render={props => (
            isLogin ?
                <Component {...props} />
            : <Redirect to="/" />
        )} />
    );
};

export default PrivateRoute;