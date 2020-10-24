import React from 'react';
import { BrowserRouter, Route, Switch, withRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import jwtDecode from 'jwt-decode';
import setAuthToken from './utils/setAuthToken';
import { setCurrentUser, logoutUser } from './actions/authActions';
import PrivateRoute from './utils/privateRoute';

import Login from './pages/Login';
import Home from './pages/Home';
import Product from './pages/Product';
import Variant from './pages/Variant';
import Categories from './pages/Categories';

import store from './store';

if (localStorage.jwtToken) {
  const token = localStorage.jwtToken;
  setAuthToken(token);

  const decoded = jwtDecode(token);
  store.dispatch(setCurrentUser(decoded));
  const currentTime = Date.now() / 1000;

  if (decoded.exp < currentTime) {
    store.dispatch(logoutUser());
    window.location.href = './login';
  }
}

const MainApps = withRouter(() => (
  <>
    <Route exact path='/login' component={ Login } />

    <Switch>
      <PrivateRoute exact path='/' component={ Home } />
      <PrivateRoute exact path='/product' component={ Product } />
      <PrivateRoute exact path='/variant' component={ Variant } />
      <PrivateRoute exact path='/categories' component={ Categories } />
    </Switch>
  </>
));

export default function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <MainApps />
      </BrowserRouter>
    </Provider>
  );
}
