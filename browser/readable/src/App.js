import React, { Component } from 'react';
import './App.css';
import RootPostsList from './components/RootPostsList';
import CategoryList from './components/CategoryList';
import PostDetail from './components/PostDetail';
import CategoryPostsList from './components/CategoryPostsList';
import { Route, Switch } from 'react-router-dom';
class App extends Component {

  render() {
    return (
      <div>
        <CategoryList />
        <main>
          <Switch>
            <Route exact path="/categories/:category" component={CategoryPostsList} />
            <Route exact path="/:category" component={CategoryPostsList} />
            <Route path="/:category/:post_id" component={PostDetail}/>
            <Route path="/" component={RootPostsList} />
          </Switch>
        </main>
      </div>
    );
  }
}

export default App;
