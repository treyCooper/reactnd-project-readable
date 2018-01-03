import React, { Component } from 'react';
import axios from 'axios';
import Comment from './Comment';
import Post from './Post';
import NewComment from './NewComment';
import PostNotFound from './PostNotFound';
import store, { deletePost, editPost, deleteComment, editComment, sortComments } from '../store';

  export default class PostDetail extends Component {

    constructor () {
      super();
      this.state = store.getState();
      this.handleVotePost = this.handleVotePost.bind(this);
      this.handleEdit = this.handleEdit.bind(this);
      this.handleDelete = this.handleDelete.bind(this);
      this.handleDeleteComment = this.handleDeleteComment.bind(this);
      this.handleEditComment = this.handleEditComment.bind(this);
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

      handleVoteComment = (id, vote) => {
        const data = {
          option: vote
        }
        axios.post(`http://localhost:3001/comments/${id}`, data, {
          headers: {
            'Authorization': 'readable-trey',
            },
          }
        )
        .then(res => res.data)
        .then(comment => store.dispatch(editComment(comment)));
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

    handleEditComment (author,body, id) {
      const data = { author, body, id, timestamp: Date.now() };
      axios.put(`http://localhost:3001/comments/${id}`, data, {
        headers: {
          'Authorization': 'readable-trey',
          }
        }
      )
      .then(res => res.data)
      .then(comment => store.dispatch(editComment(comment)))
    }

    handleDeleteComment (id) {
      axios.delete(`http://localhost:3001/comments/${id}`, { headers: { 'Authorization': 'readable-trey' }})
      .then(res => res.data)
      .then(deletedComment => {
        const action = deleteComment(deletedComment);
        store.dispatch(action);
      })
    }
      componentDidMount(){

        this.unsubscribe = store.subscribe(() => this.setState(store.getState()))

    }

    componentWillUnmount() {
      this.unsubscribe();
    }


      handleSort (sortParam) {
        const action = sortComments(sortParam);
        store.dispatch(action);
      }

  render() {
    const { posts, comments } = this.state
    const post = posts.filter(post => post.id === this.props.match.params.post_id)
    const commentsOnPost = comments.filter(comment => comment.parentId === this.props.match.params.post_id)
   return post[0] ?
     (
      <div>
        <ul>
        <Post post={post[0]}  handleDelete={this.handleDelete} handleEdit={this.handleEdit} handleVotePost={this.handleVotePost}
        numComments={commentsOnPost.length}/>
        </ul>
        <div >
          <h4>Comments</h4>
          <button onClick={() => this.handleSort('timestamp')}>Sort By Date</button>
          <button onClick={() => this.handleSort('voteScore')}>Sort By Score</button>
          <ul>
            { commentsOnPost.length ? commentsOnPost.map(comment => <Comment comment={comment} key={comment.id} handleVoteComment={this.handleVoteComment}handleDeleteComment={this.handleDeleteComment}
            handleEditComment={this.handleEditComment}
            />) :
            'This post has not received any comments'}
          </ul>
          <NewComment parentId={post[0].id} />
        </div>
      </div>
    )
    :
     (
      <PostNotFound />
    )
  }
}


