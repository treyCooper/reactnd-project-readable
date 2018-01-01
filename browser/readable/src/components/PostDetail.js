import React, { Component } from 'react';
import axios from 'axios';
import Comment from './Comment';
import Post from './Post';
  export default class PostDetail extends Component {

      constructor () {
        super();
        this.state = {
          post: {},
          comments: []
       };
      }

      componentDidMount(){
        console.log('deatailProps', this.props)
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
      <Post post={post} key={post.id} />
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


