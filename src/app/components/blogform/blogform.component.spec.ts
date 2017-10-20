import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import{ReactiveFormsModule  } from '@angular/forms';
import { BlogFormComponent } from './blogform.component';
import { BlogsService } from '../../services/blogs.service';
import { HttpClientModule } from '@angular/common/http';
import { Blog } from '../../models/blog';
describe('BlogFormComponent', () => {
  let component: BlogFormComponent;
  let fixture: ComponentFixture<BlogFormComponent>;
  let blogsService:BlogsService;
  let success = true;
  let blog:Blog;
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BlogFormComponent ],
      imports: [ReactiveFormsModule, HttpClientModule],
      providers:[BlogsService]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BlogFormComponent);
    component = fixture.componentInstance;
    spyOn(component, 'onSubmitForm');
    blogsService = TestBed.get(BlogsService)
    blog = {title: 'title1', vidUrl: 'XpiipWULkXk', script:'Some test script'};
    fixture.detectChanges();
  });

  it('Blog form should be created', () => {
    expect(component).toBeTruthy();
    // console.log(component.crudBlogForm)
  });

  it('Should be created with a title field', () => {

    expect(component.crudBlogForm.contains('title')).toBeTruthy();

    //let blogs = [{_id1: 'xyz', title: 'title1', vidUrl: 'XpiipWULkXk'}, {_id1: 'abc', title: 'title2', vidUrl: 'XpiipWULkXk'}]
  });

  it('When the paramater, action is "CREATING" it should call addBlog with blog payload', () => {
    // let blog:Blog = {title: 'title1', vidUrl: 'XpiipWULkXk', script:'Some test script'};
    let spy =  spyOn(blogsService, 'addBlog').and.returnValue(success);

        component.onSubmitForm('CREATING');
        blogsService.addBlog(blog);

        expect(component.onSubmitForm).toHaveBeenCalledWith('CREATING');

  });

  it('When onSubmitForm paramater is "UPDATING" it should call addBlog with blog payload and index', () => {
    let index = 1;
    let spy =  spyOn(blogsService, 'updateBlog').and.returnValue(success);

        component.onSubmitForm('UPDATING');
        blogsService.updateBlog(blog, index);

        expect(component.onSubmitForm).toHaveBeenCalledWith('UPDATING');

  });

  it('When onSubmitForm paramater is "DELETING" it should call deleteBlog with blog payload', () => {
    // let blog:Blog = {title: 'title1', vidUrl: 'XpiipWULkXk', script:'Some test script'};
    let spy =  spyOn(blogsService, 'deleteBlog').and.returnValue(success);

        component.onSubmitForm('DELETING');
        blogsService.deleteBlog(blog);

        expect(component.onSubmitForm).toHaveBeenCalledWith('DELETING');

  });
  it('it should populate form with subject payload', () => {
    let index = 1;
    let blog:Blog = {_id: '1234',title: 'title1', vidUrl: 'XpiipWULkXk', script:'Some test script'};
    let data = {blog: blog, index:index}//Subject payload
    let spy =  spyOn(blogsService, 'populateForm').and.returnValue(data);

        blogsService.populateForm(data);
        component.crudBlogForm.setValue({
          title: blog.title,
          vidUrl: blog.vidUrl,
          script: blog.script,
          _id: blog._id,
          index: data.index
          });

          expect(blogsService.populateForm).toHaveBeenCalledWith(data);
          expect(component.crudBlogForm.get('title').value).toEqual('title1');
          // console.log(component.crudBlogForm.get('title').value)
  });

});
