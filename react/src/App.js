import React, { Component } from 'react';
import { Route, Redirect } from 'react-router-dom';
import './App.css';

//IMPORTING THE REACT PAGES DESIGNED FOR THE WEBSITE
import LandingPage from './pages/LandingPage/index'

class App extends Component {
  render() {
    return (
      <div>
        <LandingPage />
      </div>
    );
  }
}
export default App;