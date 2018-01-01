import React, { Component } from 'react';
import store, { gotNewComment } from '../store';
import uuid from 'uuid';
import axios from 'axios';

export default class NewMessageEntry extends Component {

  constructor() {
    super();
    this.state = {
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
  }

  handleSubmit (evt) {
    evt.preventDefault();
    const { author, body } = this.state;
    const data = {
      author: author,
      body: body,
      timestamp: Date.now(),
      id: uuid(),
      parentId: this.props.parentId
  }

  axios.post('http://localhost:3001/comments', data, {
      headers: {
        'Authorization': 'readable-trey',
        }
      }
    )
    .then(res => res.data)
    .then(comment => store.dispatch(gotNewComment(comment)))
    .then(() => this.setState({
      author: '',
      body: ''
    }))
  }

  render () {
    const { author, body } = this.state;
    return (
      <form>
        <div>
          <h4>Add New Comment</h4>
          <div>
            <p>Author</p>
            <input
              type="text"
              name="author"
              value={author}
              onChange={this.handleChange}
              placeholder="Author"
            />
          </div>
          <div>
            <p>Body</p>
            <textarea
              type="text"
              name="body"
              value={body}
              onChange={this.handleChange}
              placeholder="Body"
            />
          </div>
          <span>
            <button type="submit" onClick={this.handleSubmit}>Comment</button>
          </span>
        </div>
      </form>
    );
  }
}
