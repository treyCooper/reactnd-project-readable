import React, { Component } from 'react';
import Post from './Post';
import NewPost from './NewPost';
import axios from 'axios';

export default class RootPostsList extends Component {

  constructor () {
    super();
    this.state = { posts: [] };
  }

  componentDidMount(){
    axios.get('http://localhost:3001/posts', { headers: { 'Authorization': 'readable-trey' }})
    .then(res => res.data)
    .then(posts => this.setState({ posts }))
    .catch(err => console.log('err',err))
  }

  render () {

    const posts = this.state.posts;

    return (
      <div>
        <ul>
          { posts.map(post => <Post post={post} key={post.id} />) }
        </ul>
        <NewPost />
      </div>
    );
  }
}
