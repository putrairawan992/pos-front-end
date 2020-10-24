import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { loginUser } from '../actions/authActions';
import { Grid, Box, TextField, Button, Link } from '@material-ui/core';
import { Send } from '@material-ui/icons';

class Login extends Component {
  state = {
    username: '',
    password: ''
  };

  componentDidMount() {
    this.props.auth.isAuthenticated && this.props.history.push('/');
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.auth.isAuthenticated) {
      this.props.history.push('/');
    }

    if (nextProps.errors) {
      this.setState({
        errors: nextProps.errors
      });
    }
  }

  onChange = obj => e => {
    this.setState({ [obj]: e.target.value });
  };

  onSubmit = e => {
    e.preventDefault();

    const userData = {
      username: this.state.username,
      password: this.state.password
    };

    this.props.loginUser(userData);
  };

  render() {
    return (
      <Grid container justify="center" className="mt-5">
        <Grid item xs={5}>
          <div className="my-5">
            <h4><b>Login</b> below</h4>

            <p className="text-muted">
              Don&apos;t have an account? <Link href="/login">Register</Link>
            </p>
          </div>

          <form onSubmit={this.onSubmit}>
            <TextField
              fullWidth
              required
              className="mb-2"
              label="Username"
              onChange={ this.onChange('username') }
            />

            <TextField
              fullWidth
              required
              className="mb-5"
              type="password"
              label="Password"
              onChange={ this.onChange('password') }
            />

            <Box display="flex" justifyContent="flex-end">
              <Button
                type="submit"
                variant="contained"
                size="large"
                color="primary"
                endIcon={ <Send /> }
              >
                Login
              </Button>
            </Box>
          </form>
        </Grid>
      </Grid>
    );
  }
}

Login.propTypes = {
  loginUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors
});

export default connect(
  mapStateToProps,
  { loginUser }
)(Login);
