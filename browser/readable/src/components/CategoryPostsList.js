import React, { Component } from 'react';
import Post from './Post';
import NewPost from './NewPost';
import axios from 'axios';

export default class PostsList extends Component {

  constructor () {
    super();
    this.state = { posts: [] };
  }

  componentDidMount () {
    axios.get('http://localhost:3001/posts', { headers: { 'Authorization': 'readable-trey' }})
      .then(res => res.data)
      .then(posts => this.setState({ posts }));
  }

  render () {

    const category = this.props.match.params.category;
    const posts = this.state.posts;
    const filteredPosts = posts.filter(post => post.category === category);
    console.log(filteredPosts)
    return (
      <div>
        <ul >
          { filteredPosts.map(post => <Post post={post} key={post.id} />) }
        </ul>
        <NewPost />
      </div>
    );
  }
}
