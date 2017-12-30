import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';

const REACT = '/categories/react';
const REDUX = '/categories/redux';
const ALL = '/';

export default class CategoryList extends Component {

  render () {
    return (
      <div>
        <div>
        <NavLink to={ALL}>
          <span>Show All</span>
          </NavLink>
        </div>
        <div>
        <NavLink to={REACT}>
          <span>React</span>
          </NavLink>
        </div>
        <div>
        <NavLink to={REDUX}>
          <span>Redux</span>
          </NavLink>
        </div>
      </div>
    )
  }
}
