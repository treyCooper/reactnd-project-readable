import React, { Component } from 'react';
import store, { addPostFunc } from '../store';
import uuid from 'uuid';


export default class NewPost extends Component {

  constructor(props) {
    super(props);
    this.state = {
      title: '',
      category: '',
      author: '',
      body: '',
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
    const { title, author, category, body } = this.state;
    const data = {
      title: title,
      category: category,
      author: author,
      body: body,
      timestamp: Date.now(),
      id: uuid()
  }

  const thunk = addPostFunc(data);
  store.dispatch(thunk)
  .then(() => this.setState({
      title: '',
      category: '',
      author: '',
      body: ''
    }))
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
              type="text"
              name="author"
              value={author}
              onChange={this.handleChange}
              placeholder="Author"
            />
          </div>
          <div>
            <p>Category</p>
            <select
              name="category"
              value={category}
              onChange={this.handleChange}>
              {this.props.categories.map(category => <option key={category.path}  value={category.path}>
                    {category.name}
                    </option>
                  )}
            </select>
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
            <button type="submit" onClick={this.handleSubmit}>Post</button>
          </span>
        </div>
      </form>
    );
  }
}
