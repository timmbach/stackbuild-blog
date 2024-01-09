import { createReducer, on } from '@ngrx/store';
import { blogState } from './blog.state';
import {
  createPost,
  createPostSuccess,
  deletePost,
  loadBlog,
  loadBlogFail,
  loadBlogSuccess,
  updatePost,
  updatePostSuccess,
} from './blog.actions';
import { BlogModel } from './blog.model';

const _blogReducer = createReducer(
  blogState,
  on(loadBlog, (state) => {
    return {
      ...state,
    };
  }),
  on(loadBlogSuccess, (state, action) => {
    // on successful load, update state with data from action
    return {
      ...state,
      blogList: action.blogList,
      errorMessage: '',
    };
  }),
  on(loadBlogFail, (state, action) => {
    // if load fails, update state with an empty array
    return {
      ...state,
      blogList: [],
      errorMessage: action.errorMessage,
    };
  }),
  // on(createPost, (state, action) => {
  //   const _blog = { ...action.blogInput };
  //   _blog.id = state.blogList.length + 1;
  //   return {
  //     ...state,
  //     blogList: [_blog, ...state.blogList],
  //   };
  // }),
  on(createPostSuccess, (state, action) => {
    // data received from action is added to _blog variable
    const _blog = { ...action.blogInput };
    return {
      ...state,
      blogList: [_blog, ...state.blogList],
    };
  }),
  on(updatePostSuccess, (state, action) => {
    // data received from action is added to _blog variable
    const _blog = { ...action.blogInput };
    const updatedBlog = state.blogList.map((post) => {
      return _blog.id === post.id ? _blog : post;
    });
    return {
      ...state,
      blogList: updatedBlog,
    };
  }),
  on(deletePost, (state, action) => {
    // a filtering function that loops through the blog list and
    const updatedBlog = state.blogList.filter((data: BlogModel) => {
      return data.id !== action.id;
    });
    return {
      ...state,
      blogList: updatedBlog,
    };
  })
);

export function blogReducer(state: any, action: any) {
  return _blogReducer(state, action);
}
