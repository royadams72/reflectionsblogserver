import { Component, OnInit, OnDestroy, Input} from '@angular/core';
import { FormGroup, FormControl, Validators, FormArray } from '@angular/forms';
import { BlogsService } from '../../services/blogs.service';
import { Blog } from '../../models/blog';

@Component({
  selector: 'app-blogform',
  templateUrl: './blogform.component.html',
  styleUrls: ['./blogform.component.css']
})
export class BlogFormComponent implements OnInit {
  public state:string;
  public crudBlogForm:FormGroup;
  private formValid:boolean;
  public success:boolean;
  private successMsg:String;
  public _id:String;
  // private blog:Blog;
  private index:number;
  constructor(private blogsService: BlogsService) {
                  this.state = 'CREATING';
                  this.formValid = false;
                  this.success = false;
                  // this._id = '';
   }
  ngOnInit() {
    this.initForm();
    this.blogsService.populateForm
    .subscribe((data)=>{
      if(data){
        this.state = 'UPDATING';
        let blog:Blog = data.blog;
        this.crudBlogForm.setValue({
          title: blog.title,
          vidUrl: blog.vidUrl,
          script: blog.script,
          _id: blog._id,
          index: data.index
          });
      }
        // console.log(blog)

    })
  }
  private initForm(){
      // let items = [];
        this.crudBlogForm = new FormGroup({
              'title': new FormControl(null, [Validators.required, Validators.minLength(1)]),
              'vidUrl': new FormControl(null,Validators.compose([Validators.required, Validators.minLength(1)])),
              'script': new FormControl(null, [Validators.required, Validators.minLength(1)]),
              '_id': new FormControl(null),
              'index': new FormControl(null)
            });
        // this.addItemFields();
  }

  onSubmitForm(action){
    let form = this.crudBlogForm
    let title = form.get('title');
    let vidUrl = form.get('vidUrl');
    let script = form.get('script');
    let _id = form.get('_id');
    let index = form.get('index').value;

    // action === 'CREATING' ? vidID = null : vidID = this._id;
    let blog:Blog = {_id:_id.value, title:title.value, vidUrl:vidUrl.value, script:script.value}
    if(action === 'CREATING'){
      this.blogsService.addBlog(blog)
        .subscribe(data=>{
          if(data){
            this.success = true;
            this.successMsg = "Your Blog has been uploaded";
          }
        })
    }else if(action === 'UPDATING'){
      // console.log(blog)
      this.blogsService.updateBlog(blog, index)
        .subscribe(data=>{
          if(data){
            this.success = true;
            this.successMsg = "Your Blog has been updated";
          }
        })
    }else{
      this.blogsService.deleteBlog(blog)
        .subscribe(data=>{
          if(data){
            this.success = true;
            this.successMsg = "Your Blog has been deleted";
          }
        })
    }
    form.reset();
    this.state = 'CREATING';
  }
  ngOnDestroy(){
    // this.blogsService.addBlog.unsubscrbe();
  }

}
