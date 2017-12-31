import React, { Component } from 'react';

export default class NewMessageEntry extends Component {

  render () {
    return (
      <form>
        <div>
          <h4>Add New Post</h4>
          <div>
            <p>Title</p>
            <input
              className="form-control"
              type="text"
              name="title"
              placeholder="Title"
            />
          </div>
          <div>
            <p>Author</p>
            <input
              className="form-control"
              type="text"
              name="author"
              placeholder="Author"
            />
          </div>
          <div>
            <p>Category</p>
            <input
              className="form-control"
              type="text"
              name="category"
              placeholder="Category"
            />
          </div>
          <div>
            <p>Body</p>
            <textarea
              className="form-control"
              type="text"
              name="body"
              placeholder="Body"
            />
          </div>
          <span>
            <button type="submit">Post</button>
          </span>
        </div>
      </form>
    );
  }
}
