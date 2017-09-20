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

   getBlogs(){
            return this._http.get(this.blogsURL+'blogs')
                   .do((blogs)=>this.populateList.next(blogs))
                   .map((result: Response ) => {
                    this.blogs = result['blogs'];
                    return this.blogs;
                   })

                  //  .switchMap((blogs)=>this.populateList.next(blogs).asObservable())

    }
    getBlog(id){
        return this._http.get(this.blogsURL+'blogs/'+id)
               .map((res: Response ) => {

                return res["blog"];
               })
    }

    updateBlog(blog:Blog){
      return this._http.patch(this.blogsURL+'blogs', blog)
             .map((res: Response ) => {
               console.log(blog)
              const result = res;
              return result;
             })
    }

}
