import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/do';
import { Subject } from 'rxjs/Subject';

import { Blog } from '../models/blog';
import { ENV } from '../app.config';
@Injectable()
export class BlogsService {
  private blogsURL: string;
  public populateList;
  public populateForm;
  public blogs: Blog[];

  constructor(private http: HttpClient) {
    this.blogsURL = ENV.BASE_API;
    this.populateList = new Subject<Blog[]>();
    this.populateForm = new Subject<Blog>();
  }

  returnBlogs() {
    return this.blogs;
  }

  getBlogs() {
    return this.http.get(this.blogsURL + 'blogs')
      .map((res: Response) => {
        this.blogs = res['blogs'];
        return this.blogs;
      })
  }

  getBlog(id) {
    return this.http.get(this.blogsURL + 'blogs/' + id)
      .map((res: Response) => {
        return res["blog"];
      })
  }

  updateBlog(blog: Blog, index: number) {
    return this.http.patch(this.blogsURL + 'blogs/edit', blog)
      .map((res: Response) => {
        if (res) {
          // console.log(res)
          this.blogs.splice(index, 1, blog);
          return blog;
        }
      })
  }

  addBlog(blog: Blog): Observable<Blog> {
    return this.http.post(this.blogsURL + 'blogs/edit', blog)
      .map((res: Response) => {
        let blog = res['blog'];
        console.log(res)
        this.blogs.push(blog);

        return blog;
      })//map automatic
  }

  deleteBlog(blog: Blog, index: number) {
    // console.log(blog)
    let id = blog._id
    return this.http.delete(this.blogsURL + 'blogs/edit/' + id)
      .map((res: Response) => {
        if (res) {
          const result = res;
          this.blogs.splice(this.blogs.indexOf(blog), 1);//delete from front end
          console.log(result);
          console.log(this.blogs);
          return result;
        }
      })
  }


}
