import React, { Component } from 'react';
import store, { gotNewPost } from '../store';
import uuid from 'uuid';
import axios from 'axios';

export default class NewMessageEntry extends Component {

  constructor() {
    super();
    this.state = {
      title: '',
      category: '',
      author: '',
      body: ''
    }
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  componentDidMount() {
    this.unsubscribe = store.subscribe(() => this.setState(store.getState()));
  }

  componentWillUnmount() {
    this.unsubscribe();
  }


    handleChange (evt) {
      const value = evt.target.value;
      this.setState({
        [evt.target.name]: value
      });
    console.log("NewPost", this.state)
  }

  handleSubmit (evt) {
    evt.preventDefault();
    const { title, author, category, body } = this.state;
    const id = uuid();
    const data = {
      title: title,
      category: category,
      author: author,
      body: body,
      timestamp: Date.now(),
      id: uuid()
  }

  console.log('data', data)
  axios.post('http://localhost:3001/posts', data, {
      headers: {
        'Authorization': 'readable-trey',
        }
      }
    )
    .then(res => res.data)
    .then(post => store.dispatch(gotNewPost(post)));
  }

  render () {
    const { title, author, category, body } = this.state;
    return (
      <form>
        <div>
          <h4>Add New Post</h4>
          <div>
            <p>Title</p>
            <input
              className="form-control"
              type="text"
              name="title"
              value={title}
              onChange={this.handleChange}
              placeholder="Title"
            />
          </div>
          <div>
            <p>Author</p>
            <input
              className="form-control"
              type="text"
              name="author"
              value={author}
              onChange={this.handleChange}
              placeholder="Author"
            />
          </div>
          <div>
            <p>Category</p>
            <input
              className="form-control"
              type="text"
              name="category"
              value={category}
              onChange={this.handleChange}
              placeholder="Category"
            />
          </div>
          <div>
            <p>Body</p>
            <textarea
              className="form-control"
              type="text"
              name="body"
              value={body}
              onChange={this.handleChange}
              placeholder="Body"
            />
          </div>
          <span>
            <button type="submit" onClick={this.handleSubmit}>Post</button>
          </span>
        </div>
      </form>
    );
  }
}
