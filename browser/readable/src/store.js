import { createStore } from 'redux';

const GOT_POSTS = 'GOT_POSTS';

export const gotPosts = function (posts) {
  return {
    type: GOT_POSTS,
    posts: posts
  }
}

const initialState = {
  posts: []
}

function reducer (state = initialState, action) {
  switch (action.type) {
    case GOT_POSTS:
      return {...state, posts: action.posts}
    default:
      return state
  }
}

const store = createStore(reducer);
export default store;
