import React, { Component } from 'react';
import Post from './Post';
import NewPost from './NewPost';
import store, { deletePostFunc, editPostFunc, editPostScoreFunc, sortPosts } from '../store';

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
    console.log('vote', vote)
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
    const { comments, categories } = this.state;
    const allPosts = this.state.posts;
    const { category } = this.props.match.params;
    const posts = allPosts.filter(post => post.category === this.props.match.params.category)

    return (
      <div>
        <h1>{ `${category.charAt(0).toUpperCase() + category.substr(1)} Posts`}</h1>
        <button onClick={() => this.handleSort('timestamp')}>Sort By Date</button>
        <button onClick={() => this.handleSort('voteScore')}>Sort By Score</button>
        <ul>
          { posts.length ? posts.map(post => {
          return <Post post={post} key={post.id} handleDelete={this.handleDelete} handleEdit={this.handleEdit} handleVotePost={this.handleVotePost}
          numComments={comments.filter(comment => comment.parentId === post.id).length}
          />
         }) : `There are currently no posts in the ${category} category.`
        }
        </ul>
        <NewPost categories={categories} />
      </div>
    );
  }
}
