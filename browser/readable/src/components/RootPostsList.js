import React, { Component } from 'react';
import Post from './Post';
import NewPost from './NewPost';
import axios from 'axios';
import store, { gotPosts, deletePost, editPost } from '../store';

export default class RootPostsList extends Component {

  constructor () {
    super();
    this.state = store.getState();
    this.handleVote = this.handleVote.bind(this);
    this.handleEdit = this.handleEdit.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
  }

  componentDidMount(){
    axios.get('http://localhost:3001/posts', { headers: { 'Authorization': 'readable-trey' }})
      .then(res => res.data)
      .then(posts => {
        const filteredPosts = posts.filter(post => !post.disabled)
        const action = gotPosts(filteredPosts);
        store.dispatch(action);
      })
      .catch(err => console.log('err',err))
    this.unsubscribe = store.subscribe(() => this.setState(store.getState()));
  }

  componentWillUnmount() {
    this.unsubscribe();
  }

  handleVote = (id, vote) => {
    console.log('vote', vote)
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
    console.log('data', data)
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
  }

  render () {

    const posts = this.state.posts;

    return (
      <div>
        <ul>
          { posts.map(post => {
          return <Post post={post} key={post.id} handleDelete={this.handleDelete} handleEdit={this.handleEdit} handleVote={this.handleVote}/>
         })
        }
        </ul>
        <NewPost />
      </div>
    );
  }
}
