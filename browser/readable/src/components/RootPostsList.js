import React, { Component } from 'react';
import Post from './Post';
import NewPost from './NewPost';
import axios from 'axios';
import store, { gotPosts } from '../store';

export default class RootPostsList extends Component {

  constructor () {
    super();
    this.state = store.getState();
    this.handleEdit = this.handleEdit.bind(this);
  }

  componentDidMount(){
    axios.get('http://localhost:3001/posts', { headers: { 'Authorization': 'readable-trey' }})
      .then(res => res.data)
      .then(posts => {
        const action = gotPosts(posts);
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

  render () {

    const posts = this.state.posts;

    return (
      <div>
        <ul>
          { posts.map(post => {
            console.log('postId', post.id)
          return <Post post={post} key={post.id} handleEdit={this.handleEdit}/>
         })
        }
        </ul>
        <NewPost />
      </div>
    );
  }
}
