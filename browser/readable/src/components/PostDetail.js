import React, { Component } from 'react';
import axios from 'axios';
import { NavLink } from 'react-router-dom';
import Comment from './Comment'

  export default class PostDetail extends Component {

      constructor () {
        super();
        this.state = {
          post: {},
          comments: []
       };
      }

      componentDidMount(){
        axios.get(`http://localhost:3001/posts/${this.props.match.params.post_id}`, { headers: { 'Authorization': 'readable-trey'}})
        .then(res => res.data)
        .then(post => this.setState({ post }))
        .catch(err => console.log('err',err))
        this.getComments()
      }

      getComments = () => {
        axios.get(`http://localhost:3001/posts/${this.props.match.params.post_id}/comments`, { headers: { 'Authorization': 'readable-trey'}})
        .then(res => res.data)
        .then(comments => this.setState({ comments }))
        .catch(err => console.log('err',err))
      }
  render() {
  const { post, comments } = this.state
  return (
    <div>
      <div>
      <h3>{ post.title }</h3>
      <NavLink to={`/categories/${post.category}`}>
          <span>{ post.category }</span>
          </NavLink>

      </div>
      <div >
        <h4>{ post.author }</h4>
        { post.body }
      </div>
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


