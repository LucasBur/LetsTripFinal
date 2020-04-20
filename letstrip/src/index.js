import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import 'bootstrap/dist/css/bootstrap.min.css';
import * as serviceWorker from './serviceWorker';

const firebase = require("firebase");
require("firebase/firestore"); 

firebase.initializeApp({
  apiKey: "AIzaSyDqE3N-vl3vXIzNVUIZPxHMXTZ78mHQMro",
  authDomain: "letstrip-34765.firebaseapp.com",
  databaseURL: "https://letstrip-34765.firebaseio.com",
  projectId: "letstrip-34765",
  storageBucket: "letstrip-34765.appspot.com",
  messagingSenderId: "897879409011",
  appId: "1:897879409011:web:0959ef44878c4efb0f0506"
});



ReactDOM.render(<App />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
