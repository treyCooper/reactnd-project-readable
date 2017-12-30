import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import axios from 'axios';
import RootPostsList from './components/RootPostsList';

class App extends Component {

  render() {
    return (
      <RootPostsList />
    );
  }
}

export default App;
