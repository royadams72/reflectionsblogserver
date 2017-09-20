import { Component, OnInit } from '@angular/core';
import { BlogsService } from '../../services/blogs.service';
import { Blog } from '../../models/blog';
@Component({
  selector: 'app-crud-list',
  templateUrl: './crud-list.component.html',
  styleUrls: ['./crud-list.component.css']
})
export class CrudListComponent implements OnInit {

  blogs:Blog[];
  constructor(private  blogsService: BlogsService) { }

  ngOnInit() {
    this.blogsService.getBlogs()
    .subscribe((res)=>{
      this.blogs = res;
      console.log(res)
    })

  }
  populateForm(id){
    this.blogs.map((blog:Blog)=>{
     blog._id === id ? this.blogsService.populateForm.next(blog) : blog._id = blog._id;

   })
  }
}
