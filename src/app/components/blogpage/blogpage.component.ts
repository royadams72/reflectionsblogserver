import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { BlogsService } from '../../services/blogs.service';

@Component({
  selector: 'app-blogpage',
  templateUrl: './blogpage.component.html',
  styleUrls: ['./blogpage.component.css']
})
export class BlogpageComponent implements OnInit {
blog;
  constructor(private activatedRoute: ActivatedRoute,
              private  blogsService: BlogsService) { }

              ngOnInit() {
                this.activatedRoute.params
                .subscribe((data)=>{
                  console.log(data.id)
                this.blogsService.getBlog(data.id)
                .subscribe((res)=>{
                  this.blog = res;
                  console.log(this.blog.vidUrl)
                })
              })
            }

}
