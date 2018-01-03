import { createStore, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk';
import axios from 'axios';

const SORT_POSTS = 'SORT_POSTS';
const GOT_POSTS = 'GOT_POSTS';
const GOT_SINGLE_POST = 'GOT_SINGLE_POST';
const GOT_NEW_POST = 'GOT_NEW_POST';
const EDIT_POST = 'EDIT_POST';
const DELETE_POST = 'DELETE_POST';
const GOT_COMMENTS = 'GOT_COMMENTS';
const GOT_NEW_COMMENT = 'GOT_NEW_COMMENT';
const DELETE_COMMENT = 'DELETE_COMMENT';
const EDIT_COMMENT = 'EDIT_COMMENT';
const GOT_CATEGORIES = 'GOT_CATEGORIES';
const SORT_COMMENTS = 'SORT_COMMENTS';

export const sortPosts = function (sortParam) {
  return {
    type: SORT_POSTS,
    sortParam
  }
}

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

export const deleteComment = function (comment) {
  return {
    type: DELETE_COMMENT,
    comment: comment
  }
}

export const editComment = function (comment) {
  return {
    type: EDIT_COMMENT,
    comment: comment
  }
}

export const gotCategories = function (categories) {
  return {
    type: GOT_CATEGORIES,
    categories: categories
  }
}

export const sortComments = function (sortParam) {
  return {
    type: SORT_COMMENTS,
    sortParam
  }
}

export function fetchCategories () {

      return function thunk (dispatch) {
        return  axios.get('http://localhost:3001/categories', { headers: { 'Authorization': 'readable-trey' }})
        .then(res => res.data)
        .then(categories => {
          const action = gotCategories(categories);
          store.dispatch(action);
        })
  }
}

export function fetchPosts () {

    return function thunk (dispatch) {

      return axios.get('http://localhost:3001/posts', { headers: { 'Authorization': 'readable-trey' }})
      .then(res => res.data)
      .then(posts => {
        const action = gotPosts(posts);
        store.dispatch(action)
        return posts
      })
  }
}

export function fetchComments (id) {

      return function thunk (dispatch) {
        axios.get(`http://localhost:3001/posts/${id}/comments`, { headers: { 'Authorization': 'readable-trey'}})
        .then(res => res.data)
        .then(comments => {
          const action = gotComments(comments);
          store.dispatch(action)
          console.log('commtest', comments)
      })
    }
  }

export function initializeState () {

    return function thunk (dispatch) {
      store.dispatch(fetchCategories())
      store.dispatch(fetchPosts())
      .then((posts) => {
        posts.map(post => store.dispatch(fetchComments(post.id)))
      })
    }
}

export function deletePostFunc (id) {

      return function thunk (dispatch) {
        return axios.delete(`http://localhost:3001/posts/${id}`, { headers: { 'Authorization': 'readable-trey' }})
        .then(res => res.data)
        .then(deletedPost => {
          const action = deletePost(deletedPost);
          store.dispatch(action);
        })
  }
}

export function addPostFunc (data) {

        return function thunk (dispatch) {
          return  axios.post('http://localhost:3001/posts', data, {
            headers: {
              'Authorization': 'readable-trey',
              }
            }
          )
          .then(res => res.data)
          .then(post => store.dispatch(gotNewPost(post)))
  }
}

export function addCommentFunc (data) {

          return function thunk (dispatch) {
            return  axios.post('http://localhost:3001/comments', data, {
              headers: {
                'Authorization': 'readable-trey',
                }
              }
            )
            .then(res => res.data)
            .then(comment => store.dispatch(gotNewComment(comment)))
    }
  }

export function editPostFunc (data, id) {

    return function thunk (dispatch) {
      console.log('ddata', data, 'id', id)
      return axios.put(`http://localhost:3001/posts/${id}`, data, {
        headers: {
          'Authorization': 'readable-trey',
          }
        }
      )
      .then(res => res.data)
      .then(post => {
        store.dispatch(editPost(post))})

  }
}

export function editPostScoreFunc (data, id) {

      return function thunk (dispatch) {
        return axios.post(`http://localhost:3001/posts/${id}`, data, {
          headers: {
            'Authorization': 'readable-trey',
            }
          }
        )
        .then(res => res.data)
        .then(post => {
          store.dispatch(editPost(post))
        })

    }
  }

  export function editCommentScoreFunc (data, id) {

          return function thunk (dispatch) {
            return axios.post(`http://localhost:3001/comments/${id}`, data, {
              headers: {
                'Authorization': 'readable-trey',
                },
              }
            )
            .then(res => res.data)
            .then(comment => store.dispatch(editComment(comment)));

        }
      }

export function editCommentFunc (data, id) {

      return function thunk (dispatch) {
        return axios.put(`http://localhost:3001/comments/${id}`, data, {
          headers: {
            'Authorization': 'readable-trey',
            }
          }
        )
        .then(res => res.data)
        .then(comment => store.dispatch(editComment(comment)))

    }
  }

export function deleteCommentFunc (id) {

        return function thunk (dispatch) {
          return axios.delete(`http://localhost:3001/comments/${id}`, { headers: { 'Authorization': 'readable-trey' }})
          .then(res => res.data)
          .then(deletedComment => {
            const action = deleteComment(deletedComment);
            store.dispatch(action);
          })
    }
  }

const initialState = {
  posts: [],
  singlePost: {},
  comments: [],
  categories: []
}

function reducer (state = initialState, action) {
  switch (action.type) {
    case SORT_POSTS:
      const sortedPosts = state.posts.sort((a,b) => b[action.sortParam]-a[action.sortParam])
      return {...state, posts: sortedPosts}

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
          ...state, comments: [...state.comments, ...action.comments]
        }

      case GOT_NEW_COMMENT:
        return {
          ...state,
          comments: [...state.comments, action.comment]
        }

      case DELETE_COMMENT:
        return {
          ...state, comments: state.comments.filter(comment => comment.id !== action.comment.id)
        }

      case EDIT_COMMENT:
        const comments = state.comments.map(comment => (
          action.comment.id === comment.id ? action.comment : comment
        ));
        return {
          ...state, comments: comments
        }

      case GOT_CATEGORIES:
        return {
          ...state, categories: action.categories.categories
        }
      case SORT_COMMENTS:
        const sortedComments = state.comments.sort((a,b) => b[action.sortParam]-a[action.sortParam])
        return {...state, comments: sortedComments}

    default:
      return state
  }
}

const store = createStore(reducer, applyMiddleware(thunkMiddleware));
export default store;
