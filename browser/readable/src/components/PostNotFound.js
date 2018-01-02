import React from 'react';
import { NavLink } from 'react-router-dom';

export default function PostNotFound () {
  return (
    <div>
      <h2>404 Page Not Found</h2>
      <NavLink to={'/'}>
      <span>Go to home page</span>
      </NavLink>
    </div>
  )
}
