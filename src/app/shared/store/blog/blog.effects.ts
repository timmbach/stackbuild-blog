import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { MasterService } from '../../master.service';
import {
  LOAD_BLOG,
  createPost,
  createPostSuccess,
  loadBlogFail,
  loadBlogSuccess,
  updatePostSuccess,
} from './blog.actions';
import { EMPTY, catchError, exhaustMap, map, of } from 'rxjs';
import { BlogModel } from './blog.model';

@Injectable()
export class BlogEffects {
  constructor(private actions: Actions, private service: MasterService) {}

  _blog = createEffect(() =>
    this.actions.pipe(
      ofType(LOAD_BLOG),
      exhaustMap((action) =>
        this.service.getAllPosts().pipe(
          map((data: any) => loadBlogSuccess({ blogList: data.data })),
          catchError((error) =>
            of(loadBlogFail({ errorMessage: error.message }))
          )
        )
      )
    )
  );

  _createPost = createEffect(() =>
    this.actions.pipe(
      ofType(createPost),
      exhaustMap((action) => {
        return this.service.createPost(action.blogInput).pipe(
          map((data: any) =>
            createPostSuccess({ blogInput: data as BlogModel })
          ),
          catchError((error) =>
            of(loadBlogFail({ errorMessage: error.message }))
          )
        );
      })
    )
  );
  _updatePost = createEffect(() =>
    this.actions.pipe(
      ofType(createPost),
      exhaustMap((action) => {
        return this.service.updatePost(action.blogInput).pipe(
          map((data: any) =>
            updatePostSuccess({ blogInput: action.blogInput })
          ),
          catchError((error) =>
            of(loadBlogFail({ errorMessage: error.message }))
          )
        );
      })
    )
  );
}
