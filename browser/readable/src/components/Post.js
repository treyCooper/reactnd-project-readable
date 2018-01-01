import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import store, { gotPosts } from '../store';

export default class Post extends Component {
  constructor (props) {
    super(props);
    this.state = {
      showEditView: false
    };
  }

  render () {
  const { title, author, category, body, id } = this.props.post;
  return !this.state.showEditView ? (
    <li>
      <div>
      <NavLink to={`/${category}/${id}`}>
      <h3>{ title }</h3>
      </NavLink>
      <NavLink to={`/categories/${category}`}>
          <span>{ category }</span>
          </NavLink>

      </div>
      <div>
        <h4>{ author }</h4>
        { body }
      </div>
      <button onClick={() => this.setState({showEditView: true})}>Edit</button>
      </li>
  )
  : (
    <li>
      <div>
      <h4>Edit Post</h4>
            <p>Title</p>
            <input
              type="text"
              name="title"
              defaultValue={title}
              placeholder="Title"
            />
          </div>
          <div>
            <p>Author</p>
            <input
              type="text"
              name="author"
              defaultValue={author}
              placeholder="Author"
            />
          </div>
          <div>
            <p>Category</p>
            <input
              type="text"
              name="category"
              defaultValue={category}
              placeholder="Category"
            />
          </div>
          <div>
            <p>Body</p>
            <textarea
              type="text"
              name="body"
              defaultValue={body}
              placeholder="Body"
            />
          </div>
          <span>
        <button type='submit' onClick={() => this.setState({showEditView: false})}>Submit Edit</button>
      </span>
    </li>
  )
}
}
