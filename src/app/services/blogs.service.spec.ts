import { TestBed, inject } from '@angular/core/testing';
// import { HttpClientModule } from '@angular/common/http';
import {HttpClientTestingModule, HttpTestingController} from '@angular/common/http/testing';

import { BlogsService } from './blogs.service';
import { Blog } from '../models/blog';


describe('BlogsService', () => {
  let service:BlogsService;
  let blogsURL:string;
  let httpMock: HttpTestingController;
  let blogs:Blog[];
  let blog:Blog;
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [BlogsService],
      imports: [HttpClientTestingModule]
    });
    service = TestBed.get(BlogsService);
    httpMock = TestBed.get(HttpTestingController);
    blogsURL = 'http://localhost:3000/';
    blogs = [{_id: '1234',title: 'title1-test', vidUrl: 'XpiipWULkXk', script:'Some test script'}, {_id: '12345',title: 'title2', vidUrl: 'XpiipWULkXk', script:'Some test script2'}];
    blog = {_id: '1234',title: 'title1', vidUrl: 'XpiipWULkXk', script:'Some test script'};
    service.blogs = blogs;

  });
  it('should be created', () => {
    expect(service).toBeTruthy();
  });
  it('#returnBlogs should return Array',() => {
   expect(service.returnBlogs()).toBeTruthy();
   expect(service.blogs.length).toEqual(2);//Update array with new value
 });

 it('#getBlogs should return data',() => {


   service
       .getBlogs()
       .subscribe(results => {
         expect(results).toBeDefined();
         //blogs has to be 2 things, the actual namr of the object returned by the server
        //And what is returned by the function
         expect(results).toEqual(blogs);

       });
     // look up our request and access it
     const request = httpMock.expectOne(blogsURL+'blogs');
     // verify it is a GET
     expect(request.request.method).toEqual('GET');

     request.flush({message:"Success", blogs});
    //  // make sure it actually got processed...
     httpMock.verify();
   });
   it('#getBlog should return single blog by id',() => {
    //  let blog:Blog = {_id: '1234',title: 'title1', vidUrl: 'XpiipWULkXk', script:'Some test script'};
     let _id = 1;
     service
         .getBlog(_id)
         .subscribe(results => {
           expect(results).toBeDefined();
           //blogs has to be 2 things, the actual namr of the object returned by the server
          //And what is returned by the function
           expect(results).toEqual(blog);

         });
       // look up our request and access it
       const request = httpMock.expectOne(blogsURL+'blogs/'+_id);

       expect(request.request.method).toEqual('GET');

       request.flush({message:"Success", blog});
       httpMock.verify();
     });


it('#updateBlog should return single blog and update frontend from array',() => {
  // let blog:Blog = {_id: '1234',title: 'title1', vidUrl: 'XpiipWULkXk', script:'Some test script1'};
  let index = 0;
  //Attach mock blogs array to this service instance, the updateBlogs function splices from an array
  //without this the test fails

  // console.log(service.blogs[0])
  service
      .updateBlog(blog, index)
      .subscribe(results => {
        expect(results).toBeDefined();
        //blog has to be 2 things, the actual name of the object returned by the server
        //(In this case an object within an object)
       //And what is returned by the function
        expect(service.blogs[0]).toEqual(blog);//Update array with new value
        expect(results).toEqual(blog);
      });
    // look up our request and access it
    const request = httpMock.expectOne({url:blogsURL+'blogs'}) ;

    expect(request.request.method).toEqual('PATCH');
    expect(request.request.body).toEqual(blog);

    request.flush({message:"Success", blog});
    httpMock.verify();
  });

  it('#addBlog should push/add to frontend array',() => {
    // console.log(service.blogs[0])
    service
        .addBlog(blog)
        .subscribe(results => {
          expect(results).toBeDefined();
          expect(service.blogs.length).toEqual(3);//Update array with new value
          expect(results).toEqual(blog);
        });
      // look up our request and access it
      const request = httpMock.expectOne({url:blogsURL+'blogs'}) ;

      expect(request.request.method).toEqual('POST');
      expect(request.request.body).toEqual(blog);

      request.flush({message:"Success", blog});
      httpMock.verify();
    });

    it('#deleteBlog should delete from frontend array',() => {
      // console.log(service.blogs[0])
      service
          .deleteBlog(blog)
          .subscribe(results => {
            expect(results).toBeDefined();
            expect(service.blogs.length).toEqual(1);//Update array with new value
            expect(results).toEqual({message:"Success", blog});
          });
        // look up our request and access it
        const request = httpMock.expectOne({url:blogsURL+'blogs/'+blog._id}) ;

        expect(request.request.method).toEqual('DELETE');
        // expect(request.request.body).toEqual(blog);

        request.flush({message:"Success", blog});
        httpMock.verify();
      });

});
