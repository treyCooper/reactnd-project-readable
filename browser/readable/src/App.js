import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import axios from 'axios';
import RootPostsList from './components/RootPostsList';
import CategoryList from './components/CategoryList';
import CategoryPostsList from './components/CategoryPostsList';
import { Route, Switch } from 'react-router-dom';
class App extends Component {

  render() {
    return (
      <div>
        <CategoryList />
        <main>
          <Switch>
            <Route path="/categories/:category" component={CategoryPostsList} />
            <Route path="/" component={RootPostsList} />
          </Switch>
        </main>
      </div>
    );
  }
}

export default App;
