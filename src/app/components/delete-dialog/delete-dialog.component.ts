import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import { deletePost } from 'src/app/shared/store/blog/blog.actions';
import { BlogModel, Blogs } from 'src/app/shared/store/blog/blog.model';
import { getPostById } from 'src/app/shared/store/blog/blog.selectors';

@Component({
  selector: 'app-delete-dialog',
  templateUrl: './delete-dialog.component.html',
  styleUrls: ['./delete-dialog.component.css'],
})
export class DeleteDialogComponent implements OnInit {
  pageTitle = '';
  deletePostId = 0;
  deleteData!: BlogModel;

  constructor(
    public dialogRef: MatDialogRef<DeleteDialogComponent>,
    private store: Store<Blogs>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  ngOnInit(): void {
    // console.log(this.data);
    this.pageTitle = this.data.blogTitle;
    if (this.data.deleteMode) {
      this.deletePostId = this.data.id;
      this.store.select(getPostById(this.deletePostId)).subscribe((_data) => {
        this.deleteData = _data;
        // console.log(this.deleteData);
      });
    }
  }

  closePopup() {
    this.dialogRef.close();
  }

  removePost() {
    if (this.data.deleteMode) {
      this.store.dispatch(deletePost({ id: this.deletePostId }));
    }
    this.closePopup();
  }
}
