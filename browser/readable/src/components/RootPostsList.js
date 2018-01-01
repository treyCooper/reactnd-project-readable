import React, { Component } from 'react';
import Post from './Post';
import NewPost from './NewPost';
import axios from 'axios';
import store, { gotPosts, deletePost } from '../store';

export default class RootPostsList extends Component {

  constructor () {
    super();
    this.state = store.getState();
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

  handleEdit () {
    this.setState(store.getState())
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
          return <Post post={post} key={post.id} handleDelete={this.handleDelete}/>
         })
        }
        </ul>
        <NewPost />
      </div>
    );
  }
}
