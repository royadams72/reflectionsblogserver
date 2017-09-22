import { Component, OnInit, OnDestroy, Input} from '@angular/core';
import { FormGroup, FormControl, Validators, FormArray } from '@angular/forms';
import { BlogsService } from '../../services/blogs.service';
import { Blog } from '../../models/blog';
import { CrudService } from '../../services/crud.service';
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
  public _id:String;
  private blog:Blog;
  private index:number;
  constructor(private blogsService: BlogsService) {
                  this.state = 'CREATING';
                  this.formValid = false;
                  this.success = false;
                  this._id = '';
   }
  ngOnInit() {
    this.initForm();
    this.blogsService.populateForm
    .subscribe((data)=>{
      if(data){
        this.blog = data.blog;
        this.index = data.index;
        // console.log(data)
        this.state = 'UPDATING';
        this._id = this.blog._id;
        this.crudBlogForm.setValue({
          title: this.blog.title,
          vidUrl: this.blog.vidUrl,
          script: this.blog.script
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
              'script': new FormControl(null, [Validators.required, Validators.minLength(1)])
            });
        // this.addItemFields();
  }

  onSubmitForm(action){
    let form = this.crudBlogForm
    let title = form.get('title');
    let vidUrl = form.get('vidUrl');
    let script = form.get('script');
    let vidID;
    action === 'CREATING' ? vidID = null : vidID = this._id;
    let blog:Blog = {_id:vidID, title:title.value, vidUrl:vidUrl.value, script:script.value}
    if(action === 'CREATING'){
      this.blogsService.addBlog(blog)
        .subscribe(data=>{
          if(data){
            this.success = true;
          }
        })
    }else if(action === 'UPDATING'){
      console.log(blog)
      this.blogsService.updateBlog(this.blog, this.index)
        .subscribe(data=>{
          if(data){
            this.success = true;
          }
        })
    }else{

    }
  }
  ngOnDestroy(){
    // this.blogsService.addBlog.unsubscrbe();
  }

}
