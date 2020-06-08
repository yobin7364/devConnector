import React from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import {Route,Redirect} from 'react-router-dom';

//check it in google for info
const PrivateRoute = ({component: Component, auth, ...rest}) => (
    <Route 
    {...rest}
    render = {props => 
    auth.isAuthenticated === true ? (
        <Component {...props}/>
    ) : (
        <Redirect to="login"/>
    )
    }
    />
);

PrivateRoute.propTypes = {
    auth: PropTypes.object.isRequired
};

const mapPropsToState = state => ({
    auth: state.auth
});

export default connect(mapPropsToState)(PrivateRoute);