import React, { Component } from 'react';
import Post from './Post';
import NewPost from './NewPost';
import axios from 'axios';
import store, { gotPosts, deletePost, editPost, sortPosts } from '../store';

export default class RootPostsList extends Component {

  constructor () {
    super();
    this.state = store.getState();
    this.handleVotePost = this.handleVotePost.bind(this);
    this.handleEdit = this.handleEdit.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
    this.handleSort= this.handleSort.bind(this);
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

  handleVotePost = (id, vote) => {
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

  handleSort (sortParam) {
    const action = sortPosts(sortParam);
    store.dispatch(action);
  }

  render () {

    const allPosts = this.state.posts;
    console.log('routeprops', this.props.match.params.category)
    const { category } = this.props.match.params
    const posts = category ? allPosts.filter(post => post.category === category) : allPosts;
    return (
      <div>
        <h1>{category ? `${category.charAt(0).toUpperCase() + category.substr(1)} Posts` : 'All Posts'}</h1>
        <button onClick={() => this.handleSort('timestamp')}>Sort By Date</button>
        <button onClick={() => this.handleSort('voteScore')}>Sort By Score</button>
        <ul>
          { posts.length ? posts.map(post => {
          return <Post post={post} key={post.id} handleDelete={this.handleDelete} handleEdit={this.handleEdit} handleVotePost={this.handleVotePost}/>
         }) : `There are currently no posts in the ${category} category.`
        }
        </ul>
        <NewPost />
      </div>
    );
  }
}
