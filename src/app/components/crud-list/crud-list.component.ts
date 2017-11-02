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
  blogs: any;

  constructor(private blogsService: BlogsService) { }

  ngOnInit() {
    this.blogs = this.blogsService.getBlogs();
  }
  populateForm(id: String, index: number) {
    let blogs = this.blogsService.returnBlogs()
    // console.log(index)
    blogs.map((blog: Blog) => {
      blog._id === id ? this.blogsService.populateForm.next({ blog: blog, index: index }) : blog._id = blog._id;

    })
  }
}
