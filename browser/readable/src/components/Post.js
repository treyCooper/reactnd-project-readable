import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';

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
    this.toEditView = this.toEditView.bind(this);
  }

  componentDidMount() {
    const { title, author, category, body } = this.props.post;
    this.setState(() => ({ title, category, author, body }))
  }


    handleChange (evt) {
      const value = evt.target.value;
      this.setState({
        [evt.target.name]: value
      });
  }

  toEditView () {
    const { title, author, category, body } = this.props.post;
    this.setState(() => ({ title, category, author, body, showEditView: true }))
  }

  render () {
    if (!this.state.showEditView) {
  const { title, author, category, body, id, voteScore } = this.props.post;
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
      <div>
          <p>Score: {voteScore}</p>
          <button onClick={() => this.props.handleVotePost(id, 'downVote')}>Down Vote</button>
          <button onClick={() => this.props.handleVotePost(id, 'upVote')}>Up Vote</button>
        </div>
      <button onClick={this.toEditView}>Edit</button>
      <button onClick={() => this.props.handleDelete(id)}>Delete</button>

      </li>
  )}
   else {
    const { title, author, category, body } = this.state;
    console.log('STATEE', this.state)
    const { id } = this.props.post
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
        <button type='submit' onClick={() => {
          this.props.handleEdit(title, author, category, body, id)
          this.setState({showEditView: false})
        }
          }>Submit</button>
      </span>
    </li>
  )
}
}
}
