import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import { createPost, updatePost } from 'src/app/shared/store/blog/blog.actions';
import { BlogModel, Blogs } from 'src/app/shared/store/blog/blog.model';
import { getPostById } from 'src/app/shared/store/blog/blog.selectors';

// class ImageSnippet {
//   constructor(public src: string, public file: File) {}
// }

@Component({
  selector: 'app-createblog',
  templateUrl: './createpost.component.html',
  styleUrls: ['./createpost.component.css'],
})
export class CreatepostComponent implements OnInit {
  pageTitle = '';
  editPostId = 0;
  editData!: BlogModel;

  // selectedFile!: ImageSnippet;

  constructor(
    private dialogRef: MatDialogRef<CreatepostComponent>,
    private builder: FormBuilder,
    private store: Store<Blogs>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  ngOnInit(): void {
    // console.log(this.data);
    this.pageTitle = this.data.blogTitle;
    if (this.data.editMode) {
      this.editPostId = this.data.id;
      this.store.select(getPostById(this.editPostId)).subscribe((_data) => {
        this.editData = _data;
        console.log(this.editData);
        this.postForm.setValue({
          id: this.editData.id,
          blogTitle: this.editData.text,
          text: this.editData.text,

          coverPhoto: this.editData.image,
          firstName: this.editData.owner.firstName,
          lastName: this.editData.owner.lastName,
          ownerImage: this.editData.owner.picture,
        });
      });
    }
  }

  closePopup() {
    this.dialogRef.close();
  }

  // This is a form for creating a new blog post
  postForm = this.builder.group({
    id: this.builder.control(0),
    blogTitle: this.builder.control('', Validators.required),
    firstName: this.builder.control('', Validators.required),
    lastName: this.builder.control('', Validators.required),
    coverPhoto: this.builder.control('', Validators.required),
    ownerImage: this.builder.control('', Validators.required),
    text: this.builder.control('', Validators.required),
  });

  // processFile(imageInput: any) {
  //   const file: File = imageInput.files[0];
  //   const reader = new FileReader();

  //   reader.addEventListener('load', (event: any) => {

  //     this.selectedFile = new ImageSnippet(event.target.result, file);

  //     this.imageService.uploadImage(this.selectedFile.file).subscribe(
  //       (res) => {

  //       },
  //       (err) => {

  //       })
  //   });

  //   reader.readAsDataURL(file);
  // }
  // this save function creates a new post and updates a selected post by updating the blog state via NGRX
  savePost() {
    if (this.postForm.valid) {
      const _blogInput: BlogModel = {
        id: 0,
        blogTitle: this.postForm.value.blogTitle as string,
        text: this.postForm.value.text as string,
        likes: 0,
        image: this.postForm.value.coverPhoto as string,
        owner: {
          id: 0 as unknown as string,
          firstName: this.postForm.value.firstName as string,
          lastName: this.postForm.value.firstName as string,
          picture: this.postForm.value.ownerImage as string,
        },
        publishDate: Date.now().toLocaleString(),
      };

      if (this.data.editMode) {
        _blogInput.id = this.postForm.value.id as number;
        this.store.dispatch(updatePost({ blogInput: _blogInput }));
      } else {
        this.store.dispatch(createPost({ blogInput: _blogInput }));
      }
      this.closePopup();
    }
  }
}
