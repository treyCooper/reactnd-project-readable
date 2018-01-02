import React, { Component } from 'react';

export default class Comment extends Component {
  constructor (props) {
    super(props)
    this.state = {
      showEditView: false,
      author: '',
      body: ''
    }
    this.handleChange = this.handleChange.bind(this);
    this.toEditView = this.toEditView.bind(this);
  }

  componentDidMount() {
    const { author, body } = this.props.comment;
    this.setState(() => ({ author, body }))
  }


    handleChange (evt) {
      const value = evt.target.value;
      this.setState({
        [evt.target.name]: value
      });
  }

  toEditView () {
    const { author, body } = this.props.comment;
    this.setState(() => ({ author, body, showEditView: true }))
  }

  render () {
    if (!this.state.showEditView) {
      const { author, body, voteScore, id } = this.props.comment
      return (
        <div>
          <h5>{ author }</h5>
            { body }
            <div>
            <p>Score: {voteScore}</p>
              <button onClick={() => this.props.handleVoteComment(id, 'downVote')}>Down Vote</button>
              <button onClick={() => this.props.handleVoteComment(id, 'upVote')}>Up Vote</button>
            </div>
          <button onClick={this.toEditView}>Edit</button>
          <button onClick={() => this.props.handleDeleteComment(id)}>Delete</button>
        </div>
      )
    } else {
        const { author, body } = this.state;
        const { id } = this.props.comment
        return (
          <li>
            <div>
            <h4>Edit Comment</h4>
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
                this.props.handleEditComment(author, body, id)
                this.setState({showEditView: false})
              }
                }>Submit</button>
            </span>
          </li>
        )
    }
  }
}
