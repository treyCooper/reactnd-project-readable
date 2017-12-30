import React from 'react';

export default function Post (props) {

  const post = props.post;

  return (
    <li>
      <div>
      <h3>{ post.title }</h3>
        { post.category }
      </div>
      <div >
        <h4>{ post.author }</h4>
        { post.body }
      </div>
    </li>
  );
}
