import axios from 'axios';
import setAuthToken from '../utils/setAuthToken';
import jwtDecode from 'jwt-decode';
import { GET_ERRORS, SET_CURRENT_USER, USER_LOADING } from './types';

export const setCurrentUser = decoded => {
  return {
    type: SET_CURRENT_USER, payload: decoded
  };
};

export const loginUser = userData => dispatch => {
  axios.post(`${process.env.REACT_APP_API_SERVER}signin`, userData,
    { headers: { accesskey: process.env.REACT_APP_ACCESSKEY } })
    .then(res => {
      const { token } = res.data;
      localStorage.setItem('jwtToken', token);

      setAuthToken(token);

      const decoded = jwtDecode(token);

      dispatch(setCurrentUser(decoded));
    }).catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      }));
};

export const setUserLoading = () => {
  return {
    type: USER_LOADING
  };
};

export const logoutUser = () => dispatch => {
  localStorage.removeItem('jwtToken');
  setAuthToken(false);
  dispatch(setCurrentUser({}));
};
