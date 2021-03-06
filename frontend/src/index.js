import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';



import './Styles/base.css';
import './Styles/nav.css';
import './Styles/games.css';
import './Styles/index.css';
import './Styles/listings.css';
import './Styles/teams.css';
import './Styles/home.css';
import './Styles/create.css';
import './Styles/auth.css';
import './Styles/profile.css';

import 'bootstrap/dist/css/bootstrap.css';

import App from './App';
import reportWebVitals from './reportWebVitals';

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
