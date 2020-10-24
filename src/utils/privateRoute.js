import React from 'react';
import PropTypes from 'prop-types';
import { Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import Sidebar from '../components/Sidebar';

const PrivateRoute = ({ component: Component, auth, ...rest }) => (
  <Route
    {...rest}
    render={props => (
      auth.isAuthenticated ? <div style={{ display: 'flex', width: '100%' }}>
        <Sidebar />
        <div className="ml-5 mr-5 mt-5" style={{ display: 'flex', width: '100%' }}>
          <Component {...props} />
        </div>
      </div> : <Redirect to='/login' />
    )}
  />
);

PrivateRoute.propTypes = {
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(mapStateToProps)(PrivateRoute);
