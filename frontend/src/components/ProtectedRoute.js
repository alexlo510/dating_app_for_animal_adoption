import React from 'react';
import { Route, Redirect } from 'react-router-dom';

export default function ProtectedRoute( {isAuth: isAuth, component: Component, ...rest} ) {
    return (
        <Route
            {...rest}
            render={(props) => {
                return isAuth ? <Component {...props}/> 
                : <Redirect to={{pathname: "/", state: {from: props.location} }} />
            }}
        />
    );
}
