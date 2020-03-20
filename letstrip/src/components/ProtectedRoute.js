import React from 'react';
import auth from '../auth';
import {Route, Redirect} from 'react-router-dom'

export const ProtectedRoute = ({component : Component, ...rest}) => (
    <Route {...rest} render={(props) => {
        if (auth.isAuth()) {
            return <Component {...props} /> 
        } else {
            return <Redirect to='/' />
        }
    }} />
)


