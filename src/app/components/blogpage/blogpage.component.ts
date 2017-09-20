import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { BlogsService } from '../../services/blogs.service';
import {DomSanitizer} from '@angular/platform-browser';
import { Blog } from '../../models/blog';
import 'rxjs/add/operator/mergeMap'
@Component({
  selector: 'app-blogpage',
  templateUrl: './blogpage.component.html',
  styleUrls: ['./blogpage.component.css']
})
export class BlogpageComponent implements OnInit {
  blog:Blog;
  url;
  constructor(private activatedRoute: ActivatedRoute,
              private  blogsService: BlogsService,
              private sanitizer: DomSanitizer) { }
              ngOnInit() {
                this.activatedRoute.params
                .mergeMap((data)=>{
                  // console.log(data.id)
                 return this.blogsService.getBlog(data.id)
              })
                .subscribe((blog:Blog)=>{
                  this.blog = blog;
                  this.url = this.sanitizer.bypassSecurityTrustResourceUrl("https://www.youtube.com/embed/" + this.blog.vidUrl);
                  // console.log(this.blog.vidUrl)
                })

            }

}
