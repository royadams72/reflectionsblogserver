import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/switchMap';
import {Subject} from 'rxjs/Subject';
// import { Http, Headers, Response } from '@angular/http';
import { Blog } from '../models/blog';
@Injectable()
export class BlogsService {
  private blogsURL:string;
  public populateList;
  public populateForm;
  public blogs:Blog[];
 //
  constructor(private _http: HttpClient) {
    // this.blogsURL = 'https://reflections-blog.herokuapp.com/'
    this.blogsURL = 'http://localhost:3000/'
    this.populateList = new Subject<Blog[]>();
    this.populateForm = new Subject<Blog>();
   }


   returnBlogs(){
     return this.blogs;
   }
   getBlogs(){
            return this._http.get(this.blogsURL+'blogs')
                   .map((result: Response ) => {
                      this.blogs  = result['blogs'].reverse();
                    // let b  = result['blogs'];
                    // this.blogs = b.reverse()
                    console.log(this.blogs);
                    return this.blogs;
                   })

    }
    getBlog(id){
        return this._http.get(this.blogsURL+'blogs/'+id)
               .map((res: Response ) => {
                return res["blog"];
               })
    }

    updateBlog(blog:Blog, index:number){
      return this._http.patch(this.blogsURL+'blogs', blog)
             .map((res: Response ) => {
               if(res){
                  this.blogs.splice(index, 1, blog);
                  // let b  = this.blogs;
                  // this.blogs = b.reverse()
                  // console.log(this.blogs);
                  return blog;
              }
             })
    }

    addBlog(blog:Blog){
      return this._http.post(this.blogsURL+'blogs', blog)
             .map((res: Response ) => {
              let blog = res['blog'];
              this.blogs.push(blog)

              return blog;
             })//map automatic
    }

    deleteBlog(blog:Blog){
      console.log( blog._id)
        return this._http.delete(this.blogsURL+'blogs' + "/" +blog._id)
               .map((res: Response ) => {
                 const result = res;
                  this.blogs.splice(this.blogs.indexOf(blog), 1);//delete from front end
                  console.log(result)
                 return result;
               })//map automatically turns response to an Observable

          //But have to throw/ cast to an Observable with catch

    }

}
