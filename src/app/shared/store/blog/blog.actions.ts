import { createAction, props } from '@ngrx/store';
import { BlogModel } from './blog.model';

export const LOAD_BLOG_SUCCESS = 'blog load success';
export const LOAD_BLOG_FAIL = 'blog load fail';
export const LOAD_BLOG = 'blog load';
export const CREATE_POST_SUCCESS = 'create post success';
export const CREATE_POST = 'create post load';
export const UPDATE_POST_SUCCESS = 'update post success';
export const UPDATE_POST = 'update post load';

export const loadBlog = createAction(LOAD_BLOG);
export const loadBlogSuccess = createAction(
  LOAD_BLOG_SUCCESS,
  props<{ blogList: BlogModel[] }>()
);
export const loadBlogFail = createAction(
  LOAD_BLOG_FAIL,
  props<{ errorMessage: string }>()
);

export const createPost = createAction(
  'createPost',
  props<{ blogInput: BlogModel }>()
);
export const createPostSuccess = createAction(
  'createPostSuccess',
  props<{ blogInput: BlogModel }>()
);

export const updatePost = createAction(
  UPDATE_POST,
  props<{ blogInput: BlogModel }>()
);
export const updatePostSuccess = createAction(
  UPDATE_POST_SUCCESS,
  props<{ blogInput: BlogModel }>()
);
export const deletePost = createAction('deletePost', props<{ id: number }>());
