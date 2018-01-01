import { createStore } from 'redux';

const GOT_POSTS = 'GOT_POSTS';
const GOT_SINGLE_POST = 'GOT_SINGLE_POST';
const GOT_NEW_POST = 'GOT_NEW_POST';
const EDIT_POST = 'EDIT_POST';
const DELETE_POST = 'DELETE_POST';
const GOT_COMMENTS = 'GOT_COMMENTS';
const GOT_NEW_COMMENT = 'GOT_NEW_COMMENT';

export const gotPosts = function (posts) {
  return {
    type: GOT_POSTS,
    posts: posts
  }
}

export const gotSinglePost = function (post) {
  return {
    type: GOT_SINGLE_POST,
    post: post
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

export const deletePost = function (post) {
  return {
    type: DELETE_POST,
    post: post
  }
}

export const gotComments = function (comments) {
  return {
    type: GOT_COMMENTS,
    comments: comments
  }
}

export const gotNewComment = function (comment) {
  return {
    type: GOT_NEW_COMMENT,
    comment: comment
  }
}

const initialState = {
  posts: [],
  singlePost: {},
  comments: []
}

function reducer (state = initialState, action) {
  switch (action.type) {
    case GOT_POSTS:
      return {...state, posts: action.posts}

    case GOT_SINGLE_POST:
      return {...state, singlePost: action.post}

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
        ...state, posts: posts, singlePost: action.post
      }

      case DELETE_POST:
        return {
          ...state, posts: state.posts.filter(post => post.id !== action.post.id), singlePost: {}
        }

      case GOT_COMMENTS:
        return {
          ...state, comments: action.comments
        }

        case GOT_NEW_COMMENT:
        return {
          ...state,
          comments: [...state.comments, action.comment]
        }

    default:
      return state
  }
}

const store = createStore(reducer);
export default store;
