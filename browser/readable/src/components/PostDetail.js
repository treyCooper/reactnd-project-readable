import React, { Component } from 'react';
import axios from 'axios';
import Comment from './Comment';
import Post from './Post';
import store, { gotSinglePost, deletePost, editPost } from '../store';

  export default class PostDetail extends Component {

    constructor () {
      super();
      this.state = store.getState();
      this.handleVote = this.handleVote.bind(this);
      this.handleEdit = this.handleEdit.bind(this);
      this.handleDelete = this.handleDelete.bind(this);
    }

    handleVote = (id, vote) => {
      const data = {
        option: vote
      }
      axios.post(`http://localhost:3001/posts/${id}`, data, {
        headers: {
          'Authorization': 'readable-trey',
          },
        }
      )
      .then(res => res.data)
      .then(post => store.dispatch(editPost(post)));
      }

    handleEdit (title, author, category, body, id) {

      const data = { title, author, category, body, id, timestamp: Date.now() };
      axios.put(`http://localhost:3001/posts/${id}`, data, {
        headers: {
          'Authorization': 'readable-trey',
          }
        }
      )
      .then(res => res.data)
      .then(post => store.dispatch(editPost(post)))
    }


    handleDelete (id) {
      axios.delete(`http://localhost:3001/posts/${id}`, { headers: { 'Authorization': 'readable-trey' }})
      .then(res => res.data)
      .then(deletedPost => {
        const action = deletePost(deletedPost);
        store.dispatch(action);
      })
      .then(() => window.history.back())
    }


      componentDidMount(){
        axios.get(`http://localhost:3001/posts/${this.props.match.params.post_id}`, { headers: { 'Authorization': 'readable-trey'}})
        .then(res => res.data)
        .then(post => {
        const action = gotSinglePost(post);
        store.dispatch(action)})
        .then(() => this.getComments())
        this.unsubscribe = store.subscribe(() => this.setState(store.getState()))

    }

    componentWillUnmount() {
      this.unsubscribe();
    }

      getComments = () => {
        axios.get(`http://localhost:3001/posts/${this.props.match.params.post_id}/comments`, { headers: { 'Authorization': 'readable-trey'}})
        .then(res => res.data)
        .then(comments => this.setState({ comments }))
        .catch(err => console.log('err',err))
      }

  render() {
  const { singlePost, comments } = this.state
  const post = singlePost
  return (
    <div>
      <Post post={post}  handleDelete={this.handleDelete} handleEdit={this.handleEdit} handleVote={this.handleVote}/>
      <div >
        <h4>Comments</h4>
        <ul>
          { comments.map(comment => <Comment comment={comment} key={comment.id} />) }
        </ul>
      </div>
    </div>
  );
}
}


