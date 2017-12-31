import React from 'react';

export default function Comment (props) {
  const { comment } = props
  return (
    <div>
      <h5>{ comment.author }</h5>
        { comment.body }
    </div>
  )
}
