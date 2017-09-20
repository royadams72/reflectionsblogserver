import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import 'rxjs/add/operator/map'
// import { Http, Headers, Response } from '@angular/http';
import { Blog } from '../models/blog';
@Injectable()
export class BlogsService {
  blogsURL:string;
 // blogsURL:string = 'https://reflections-blog.herokuapp.com/'
  constructor(private _http: HttpClient) {
    this.blogsURL = 'http://localhost:3000/'
   }
    getBlogs(){
        return this._http.get(this.blogsURL+'blogs')
               .map((res: Response ) => {
                const result = res['blogs'];
                //The result will have an id created by mongodb
                  // console.log(result);
                return result;
               })
    }
    getBlog(id){
        return this._http.get(this.blogsURL+'blogs/'+id)
               .map((res: Response ) => {
                // const result = res['blogs'];
                //The result will have an id created by mongodb
                  // console.log(res["blog"]);
                return res["blog"];
               })//map automatically turns response to an Observable

          //But have to throw/ cast to an Observable with catch
    }


}
