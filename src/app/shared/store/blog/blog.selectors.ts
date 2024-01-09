import { createFeatureSelector, createSelector } from '@ngrx/store';
import { BlogModel, Blogs } from './blog.model';

const getBlogState = createFeatureSelector<Blogs>('blog');

export const getBlog = createSelector(getBlogState, (state) => {
  return state.blogList;
});
export const getBlogInfo = createSelector(getBlogState, (state) => {
  return state;
});
export const getPostById = (postId: number) =>
  createSelector(getBlogState, (state) => {
    return state.blogList.find(
      (blog: BlogModel) => blog.id === postId
    ) as BlogModel;
  });
