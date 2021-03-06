import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import store from '../store';

const ALL = '/';

export default class CategoryList extends Component {
  constructor () {
    super();
    this.state = store.getState();
  }

  componentDidMount(){

    this.unsubscribe = store.subscribe(() => this.setState(store.getState()));
  }

  componentWillUnmount() {
    this.unsubscribe();
  }

  render () {
    const { categories } = this.state
    return (
      <div>
        <div>
        <NavLink to={ALL}>
          <span>Show All</span>
          </NavLink>
        </div>
        <div>
        { categories.map(category => {
        return (<div key={category.name}>
        <NavLink to={`/categories/${category.path}`}>
          <span>{category.name.charAt(0).toUpperCase() + category.name.substr(1)}</span>
          </NavLink>
        </div>)})}
        </div>
      </div>
    )
  }
}
