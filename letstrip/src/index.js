import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import 'bootstrap/dist/css/bootstrap.min.css';
import * as serviceWorker from './serviceWorker';

const firebase = require("firebase");
require("firebase/firestore");

firebase.initializeApp({
  apiKey: "AIzaSyCSA3upvMZFxZFvFA50dfmShDedgRTjzPk",
  authDomain: "letstest-ab98e.firebaseapp.com",
  databaseURL: "https://letstest-ab98e.firebaseio.com",
  projectId: "letstest-ab98e",
  storageBucket: "letstest-ab98e.appspot.com",
  messagingSenderId: "1164063352",
  appId: "1:1164063352:web:4c5225646de38b890af38d",
  measurementId: "G-S12XWSWYCP"
});



ReactDOM.render(<App />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
