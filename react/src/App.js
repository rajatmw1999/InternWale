import React, { Component } from 'react';
import { Route, Redirect } from 'react-router-dom';
import './App.css';

//IMPORTING THE REACT PAGES DESIGNED FOR THE WEBSITE
import LandingPage from './pages/LandingPage/index'
import Subscribe from './pages/Subscribe/index'

class App extends Component {
  render() {
    return (
      <div>
        <Route exact path='/subscribe' component={Subscribe} />
        <Route exact path='/' component={LandingPage} />
      </div>
    );
  }
}
export default App;