import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Http, Headers, Response } from '@angular/http';
import { Blog } from '../models/blog';
@Injectable()
export class BlogsService {
 blogsURL:string = 'https://reflections-blog.herokuapp.com/'
  constructor(private _http: HttpClient) { }
    getBlogs(){
        return this._http.get(this.blogsURL+'blogs')
               .map((res: Response ) => {
                const result = res['blogs'];
                //The result will have an id created by mongodb
                  // console.log(result);
                return result;
               })//map automatically turns response to an Observable
               .catch((error: Response) => {
                // //Call the handleError function(./errors/error.service), which will emit this error
                // this.errorService.handleError(error.json());
                return Observable.throw(error.json())
               });
          //But have to throw/ cast to an Observable with catch
    }
    getBlog(id){
        return this._http.get(this.blogsURL+'blogs/'+id)
               .map((res: Response ) => {
                // const result = res['blogs'];
                //The result will have an id created by mongodb
                  // console.log(res["blog"]);
                return res["blog"];
               })//map automatically turns response to an Observable
               .catch((error: Response) => {
                // //Call the handleError function(./errors/error.service), which will emit this error
                // this.errorService.handleError(error.json());
                return Observable.throw(error.json())
               });
          //But have to throw/ cast to an Observable with catch
    }
    addBlog(blog:Blog){
      return this._http.post(this.blogsURL+'blogs', blog)
             .map((res: Response ) => {
              const result = res;
              //The result will have an id created by mongodb
                console.log("result from post: "+res);
              return result;
             })//map automatic
    }

}
