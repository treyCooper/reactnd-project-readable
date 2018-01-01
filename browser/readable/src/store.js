import { createStore } from 'redux';
import uuid from 'uuid';

const GOT_POSTS = 'GOT_POSTS';
const GOT_NEW_POST = 'GOT_NEW_POST';

export const gotPosts = function (posts) {
  return {
    type: GOT_POSTS,
    posts: posts
  }
}

export const gotNewPost = function (post) {
  return {
    type: GOT_NEW_POST,
    post: post
  };
}

const initialState = {
  posts: []
}

function reducer (state = initialState, action) {
  switch (action.type) {
    case GOT_POSTS:
      return {...state, posts: action.posts}

    case GOT_NEW_POST:
      return {
        ...state,
        posts: [...state.posts, action.post]
      }

    default:
      return state
  }
}

const store = createStore(reducer);
export default store;
