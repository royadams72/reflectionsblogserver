import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormArray } from '@angular/forms';
import { BlogsService } from '../../services/blogs.service';
import { Blog } from '../../models/blog';
@Component({
  selector: 'app-addblog',
  templateUrl: './addblog.component.html',
  styleUrls: ['./addblog.component.css']
})
export class AddblogComponent implements OnInit {
  public addBlogForm: FormGroup;
  private formValid:boolean;
  public success:boolean = false;
  constructor(private blogsService: BlogsService) { }

  ngOnInit() {
    this.initForm();
  }
  private initForm(){
      // let items = [];
        this.addBlogForm = new FormGroup({
              'title': new FormControl(null, [Validators.required, Validators.minLength(1)]),
              'vidUrl': new FormControl(null,Validators.compose([Validators.required, Validators.minLength(1)])),
              'script': new FormControl(null, [Validators.required, Validators.minLength(1)])
            });
        // this.addItemFields();
  }

  submitForm(){
    let title = this.addBlogForm.get('title');
    let vidUrl = this.addBlogForm.get('vidUrl');
    let script = this.addBlogForm.get('script');
    let blog = new Blog(title.value, vidUrl.value, script.value)
    this.blogsService.addBlog(blog)
    .subscribe(data=>{
      console.log(data)
    })

  }
}
