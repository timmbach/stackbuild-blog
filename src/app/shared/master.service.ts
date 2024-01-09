import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { BlogModel } from './store/blog/blog.model';

@Injectable({
  providedIn: 'root',
})
export class MasterService {
  baseUrl: string = 'https://dummyapi.io/data/v1/post';
  constructor(private http: HttpClient) {}

  getAllPosts(): Observable<BlogModel[]> {
    const headerDict = {
      'app-id': '659b4a29a492e6b3558478f9',
    };

    const requestOptions = {
      headers: new HttpHeaders(headerDict),
    };

    return this.http.get<BlogModel[]>(this.baseUrl, requestOptions);
  }

  createPost(blogInput: BlogModel) {
    const headerDict = {
      'app-id': '659b79b8701ee3812ca58a82',
    };

    const requestOptions = {
      headers: new HttpHeaders(headerDict),
    };
    return this.http
      .post(
        'https://dummyapi.io/data/v1/post/create',
        blogInput,
        requestOptions
      )
      .pipe(
        tap(() => {
          this.http.get<BlogModel>(
            'https://dummyapi.io/data/v1/post?page=1&limit=10&sort=id&order=desc'
          );
        })
      );
  }

  updatePost(blogInput: BlogModel) {
    const headerDict = {
      'app-id': '659be3316d4ce3e93afc5566',
    };

    const requestOptions = {
      headers: new HttpHeaders(headerDict),
    };
    return this.http.post(
      'https://dummyapi.io/data/v1/post/' + blogInput.id,
      blogInput,
      requestOptions
    );
  }
}
