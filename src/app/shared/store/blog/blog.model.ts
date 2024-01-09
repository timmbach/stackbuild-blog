export interface BlogModel {
  id: number;
  blogTitle: string;
  image: string;
  likes: number;
  owner: {
    firstName: string;
    lastName: string;
    id: string;
    picture: string;
  };
  publishDate: string;
  text: string;
}

export interface Blogs {
  blogList: BlogModel[];
  errorMessage: string;
}
