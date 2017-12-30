import React from 'react';
import { NavLink } from 'react-router-dom';

export default function Post (props) {

  const post = props.post;

  return (
    <li>
      <div>
      <h3>{ post.title }</h3>
      <NavLink to={`/categories/${post.category}`}>
          <span>{ post.category }</span>
          </NavLink>

      </div>
      <div >
        <h4>{ post.author }</h4>
        { post.body }
      </div>
    </li>
  );
}
