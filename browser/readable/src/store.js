import { createStore } from 'redux';

const GOT_POSTS = 'GOT_POSTS';
const GOT_NEW_POST = 'GOT_NEW_POST';
const EDIT_POST = 'EDIT_POST';

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
  }
}

export const editPost = function (post) {
  return {
    type: EDIT_POST,
    post: post
  }
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

    case EDIT_POST:
      const posts = state.posts.map(post => (
        action.post.id === post.id ? action.post : post
      ));
      return {
        ...state, posts
      }

    default:
      return state
  }
}

const store = createStore(reducer);
export default store;
