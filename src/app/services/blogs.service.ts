import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/do';
import { Subject } from 'rxjs/Subject';

import { Blog } from '../models/blog';

@Injectable()
export class BlogsService {
  private blogsURL: string;
  public populateList;
  public populateForm;
  public blogs: Blog[];
  //
  constructor(private http: HttpClient) {
    this.blogsURL = 'https://reflections-blog.herokuapp.com/'
    // this.blogsURL = 'http://localhost:3000/'
    this.populateList = new Subject<Blog[]>();
    this.populateForm = new Subject<Blog>();
  }


  returnBlogs() {
    //  console.log("fired")
    return this.blogs;
  }
  getBlogs() {
    return this.http.get(this.blogsURL + 'blogs')
      .map((res: Response) => {

        this.blogs = res['blogs'];
        // console.log(this.blogs)
        return this.blogs;
      })
  }
  getBlog(id) {
    return this.http.get(this.blogsURL + 'blogs/' + id)
      .map((res: Response) => {
        //  console.log(res)
        return res["blog"];
      })
  }

  updateBlog(blog: Blog, index: number) {
    return this.http.patch(this.blogsURL + 'blogs/edit', blog)
      .map((res: Response) => {
        if (res) {
          this.blogs.splice(index, 1, blog);
          return blog;
        }
      })
  }

  addBlog(blog: Blog) {
    return this.http.post(this.blogsURL + 'blogs/edit', blog)
      .map((res: Response) => {
        let blog = res['blog'];
        this.blogs.push(blog);
        return blog;
      })//map automatic
  }

  deleteBlog(blog: Blog) {
    // console.log(blog._id)
    return this.http.delete(this.blogsURL + 'blogs/edit' + "/" + blog._id)
      .map((res: Response) => {
        if (res) {
          const result = res;
          this.blogs.splice(this.blogs.indexOf(blog), 1);//delete from front end
          // console.log(result)
          return result;
        }
      })


  }


}
