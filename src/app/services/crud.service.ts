import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import {Subject} from 'rxjs/Subject';

import { Blog } from '../models/blog';
@Injectable()
export class CrudService {
  public populateForm;
  private blogsURL:string;
  constructor(private _http: HttpClient) {
    this.blogsURL = 'http://localhost:3000/'
    //  this.blogsURL = 'https://reflections-blog.herokuapp.com/'
     this.populateForm = new Subject<Blog>();
  }


  addBlog(blog:Blog){
    return this._http.post(this.blogsURL+'blogs', blog)
           .map((res: Response ) => {
            const result = res;
            //The result will have an id created by mongodb
              // console.log("result from post: "+res);
            return result;
           })//map automatic
  }

  updateBlog(blog:Blog){
    return this._http.patch(this.blogsURL+'blogs', blog)
           .map((res: Response ) => {
             console.log(blog)
            const result = res;

            return result;
           })//map automatic
  }

}
