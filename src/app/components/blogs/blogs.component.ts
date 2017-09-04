import { Component, OnInit } from '@angular/core';
import { DomSanitizer  } from '@angular/platform-browser';
import { BlogsService } from '../../services/blogs.service';
import { Blog } from '../../models/blog';
@Component({
  selector: 'app-blogs',
  templateUrl: './blogs.component.html',
  styleUrls: ['./blogs.component.css']
})
export class BlogsComponent implements OnInit {
  blogs:Blog[];
  constructor(private  blogsService: BlogsService, private sanitizer: DomSanitizer) { }

  ngOnInit() {
    this.blogsService.getBlogs()
    .subscribe((res)=>{


      // res.map(items=>{
      //   let url = "https://img.youtube.com/vi/"+ items.vidUrl + "/0.jpg";
      //
      // items.vidUrl =  this.sanitizer.bypassSecurityTrustStyle("url("+url+")")
      //
      // })
this.blogs = res;
console.log(res)
    })
  }

}
