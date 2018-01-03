import React, { Component } from 'react';
import Post from './Post';
import NewPost from './NewPost';
import store, { deletePostFunc, editPostFunc, editPostScoreFunc,  sortPosts } from '../store';

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

    this.unsubscribe = store.subscribe(() => this.setState(store.getState()));
  }

  componentWillUnmount() {
    this.unsubscribe();
  }

  handleVotePost = (id, vote) => {
    const data = {
      option: vote
    }
    const thunk = editPostScoreFunc(data, id);
    store.dispatch(thunk);
    }

  handleEdit (title, author, category, body, id) {

    const data = { title, author, category, body, id, timestamp: Date.now() };

    const thunk = editPostFunc(data, id);
    store.dispatch(thunk);
  }


  handleDelete (id) {
    const thunk = deletePostFunc(id);
    store.dispatch(thunk);
  }

  handleSort (sortParam) {
    const action = sortPosts(sortParam);
    store.dispatch(action);
  }

  render () {
    console.log(this.state)
    const { posts, comments, categories } = this.state;
    return (
      <div>
        <h1>All Posts</h1>
        <button onClick={() => this.handleSort('timestamp')}>Sort By Date</button>
        <button onClick={() => this.handleSort('voteScore')}>Sort By Score</button>
        <ul>
          { posts.map(post => {
          return <Post post={post} key={post.id} handleDelete={this.handleDelete} handleEdit={this.handleEdit} handleVotePost={this.handleVotePost}
          numComments={comments.filter(comment => comment.parentId === post.id).length}
          />
         })
        }
        </ul>
        <NewPost categories={categories}/>
      </div>
    );
  }
}
