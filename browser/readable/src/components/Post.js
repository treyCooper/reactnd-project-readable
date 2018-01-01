import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import store, { editPost } from '../store';
import axios from 'axios';

export default class Post extends Component {
  constructor (props) {
    super(props)
    this.state = {
      showEditView: false,
      title: '',
      category: '',
      author: '',
      body: ''
    }
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    // this.unsubscribe = store.subscribe(() => this.setState(store.getState()));
    const { title, author, category, body } = this.props.post;
    this.setState(() => ({ title, category, author, body }))
  }



    handleChange (evt) {
      const value = evt.target.value;
      this.setState({
        [evt.target.name]: value
      });
  }

  handleSubmit (evt) {
    evt.preventDefault();
    const { title, author, category, body, id } = this.state;
    const data = {
      title: title,
      category: category,
      author: author,
      body: body,
      timestamp: Date.now()
  }

  axios.put(`http://localhost:3001/posts/${id}`, data, {
      headers: {
        'Authorization': 'readable-trey',
        }
      }
    )
    .then(res => res.data)
    .then(post => store.dispatch(editPost(post)))
    .then(() => window.location.reload())

  }


  render () {
    if (!this.state.showEditView) {
  const { title, author, category, body, id } = this.props.post;
  return  (
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
      <button onClick={() => this.props.handleDelete(id)}>Delete</button>
      </li>
  )}
   else {
    const { title, author, category, body } = this.state;
  return (
    <li>
      <div>
      <h4>Edit Post</h4>
            <p>Title</p>
            <input
              type="text"
              onChange={this.handleChange}
              name="title"
              defaultValue={title}
            />
          </div>
          <div>
            <p>Author</p>
            <input
              type="text"
              onChange={this.handleChange}
              name="author"
              defaultValue={author}
              placeholder="Author"
            />
          </div>
          <div>
            <p>Category</p>
            <input
              type="text"
              onChange={this.handleChange}
              name="category"
              defaultValue={category}
              placeholder="Category"
            />
          </div>
          <div>
            <p>Body</p>
            <textarea
              type="text"
              onChange={this.handleChange}
              name="body"
              defaultValue={body}
              placeholder="Body"
            />
          </div>
          <span>
        <button type='submit' onClick={this.handleSubmit}>Submit Edit</button>
      </span>
    </li>
  )
}
}
}
