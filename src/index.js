import React from 'react';
import ReactDOM from 'react-dom';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import App from './App';
import './sass/App.scss';

const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#110f48',
      type: '#383838'
    },
    secondary: {
      main: '#e63956'
    },
    background: {
      card: '#dddde6'
    }
  },
  overrides: {
    MuiButton: {
      contained: {
        borderRadius: 20,
        textTransform: 'unset',
        height: 35
      },
      text: {
        borderRadius: 20,
        textTransform: 'unset',
        height: 35
      }
    },
    MuiOutlinedInput: {
      root: {
        borderRadius: 20
      },
      input: {
        height: 35,
        padding: '0 15px'
      }
    }
  }
});

ReactDOM.render(
  <MuiThemeProvider theme={theme}>
    <App />
  </MuiThemeProvider>,
  document.getElementById('root')
);
