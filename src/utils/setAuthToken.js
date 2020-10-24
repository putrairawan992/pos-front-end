import axios from 'axios';

const setAuthToken = token => {
  if (token) {
    axios.defaults.baseURL = `${process.env.REACT_APP_API_SERVER}`;
    axios.defaults.headers.common['x-access-token'] = token;
  } else {
    delete axios.defaults.headers.common['x-access-token'];
  }
};

export default setAuthToken;
