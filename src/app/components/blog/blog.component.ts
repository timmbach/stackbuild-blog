import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import { BlogModel, Blogs } from 'src/app/shared/store/blog/blog.model';
import { getBlog, getBlogInfo } from 'src/app/shared/store/blog/blog.selectors';
import { CreatepostComponent } from '../createpost/createpost.component';
import { deletePost, loadBlog } from 'src/app/shared/store/blog/blog.actions';
import { DeleteDialogComponent } from '../delete-dialog/delete-dialog.component';

@Component({
  selector: 'app-blog',
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.css'],
})
export class BlogComponent implements OnInit {
  constructor(
    private store: Store<{ blog: BlogModel[] }>,
    private dialog: MatDialog
  ) {}

  // bloglist data variables
  blogList!: BlogModel[];
  blogInfo!: Blogs;

  // variables for pagination functionality
  page: number = 1;
  pageCount: number = 0;
  tableSize: number = 10;
  tableSizes: any = [5, 10, 15, 20];

  // variables for search functionality
  searchText: string = '';

  ngOnInit(): void {
    // this.store.dispatch(loadBlog());
    setTimeout(() => {
      this.store.dispatch(loadBlog());
    }, 100);
    this.store.select(getBlogInfo).subscribe((item) => {
      // this.blogList = item;
      this.blogInfo = item;
      // console.log(this.blogInfo);
    });
  }

  createPost() {
    this.openPopup(0, 'Add Post');
  }

  // open dialog box for editing post by passing post id
  editPost(id: any) {
    this.openPopup(id, 'Edit Post', true);
  }

  removePost(id: any, blogTitle: string) {
    this.openDeleteDialog('0ms', '0ms', id, blogTitle, true);
  }
  // removePost(id: any) {
  //   if (confirm('Are you sure you want to remove this?')) {
  //     this.store.dispatch(deletePost({ id: id }));
  //   }
  // }

  // dialog box function for adding and editing post
  openPopup(id: any, blogTitle: any, editMode = false) {
    this.dialog.open(CreatepostComponent, {
      width: '70%',
      data: {
        id: id,
        blogTitle,
        editMode,
      },
    });
  }

  openDeleteDialog(
    enterAnimationDuration: string,
    exitAnimationDuration: string,
    id: any,
    blogTitle: any,
    deleteMode = false
  ): void {
    this.dialog.open(DeleteDialogComponent, {
      width: '250px',
      enterAnimationDuration,
      exitAnimationDuration,
      data: {
        id,
        blogTitle,
        deleteMode,
      },
    });
  }

  // PAGINATION FUNCTIONALITY
  onPostsCountChange(event: any) {
    this.page = event;
    this.store.dispatch(loadBlog());
  }

  onBlogDataChange(event: any): void {
    this.tableSize = event?.target.value;
    this.page = 1;
    this.store.dispatch(loadBlog());
    this.store.select(getBlogInfo).subscribe((item) => {
      // this.blogList = item;
      this.blogInfo.blogList = item.blogList.slice(0, this.tableSize);
      // console.log(this.blogInfo);
    });
  }

  // SEARCH FUNCTIONALITY

  onSearchTextEntered(searchValue: string) {
    this.searchText = searchValue;
    // console.log(this.searchText)
  }
}
