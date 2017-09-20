import { Component, OnInit } from '@angular/core';
import { BlogsService } from '../../services/blogs.service';
import { Blog } from '../../models/blog';
import 'rxjs/add/operator/mergeMap';
@Component({
  selector: 'app-crud-list',
  templateUrl: './crud-list.component.html',
  styleUrls: ['./crud-list.component.css']
})
export class CrudListComponent implements OnInit {

  blogs:any;
  constructor(private blogsService: BlogsService) { }

  ngOnInit() {
    this.blogsService.getBlogs()
    .subscribe((res)=>{
      // this.blogs = res;
      // console.log(res)
    })

  this.blogsService.populateList
        .subscribe((res)=>{
          this.blogs = res;
          console.log(this.blogs)
        })

// this.blogsService.populateList.subscribe()

  }
  populateForm(id){
    this.blogs.map((blog:Blog)=>{
     blog._id === id ? this.blogsService.populateForm.next(blog) : blog._id = blog._id;

   })
  }
}
