import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { CrudListComponent } from './crud-list.component';
import { BlogsService } from '../../services/blogs.service';
import { HttpClientModule } from '@angular/common/http';
import { Observable } from "rxjs";
import 'rxjs/add/observable/from';

describe('CrudListComponent', () => {
  let component: CrudListComponent;
  let fixture: ComponentFixture<CrudListComponent>;
  let blogsTest = Observable.from([[{_id1: 1, title: 'title1', vidUrl: 'XpiipWULkXk'}, {_id1: 2, title: 'title2', vidUrl: 'XpiipWULkXk'}]]);
  let blogsService:BlogsService;
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CrudListComponent ],
      imports:[HttpClientModule],
      providers: [BlogsService]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CrudListComponent);
    component = fixture.componentInstance;
    spyOn(component, 'populateForm');
    component.populateForm('xyz', 1);
    fixture.detectChanges();

  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });

  it('HTML should at least contain a title with results from server', () => {
      component.blogs = blogsTest
      fixture.detectChanges();
      // console.log(fixture.nativeElement.querySelector('h6'))
      let title = fixture.nativeElement.querySelector('h6');
      expect(title.innerHTML).toContain('title1');

  });
  it('Should be able to click element and call PopulateForm function with correct parameters', () => {
    let blogs = [{_id1: 'xyz', title: 'title1', vidUrl: 'XpiipWULkXk'}, {_id1: 'abc', title: 'title2', vidUrl: 'XpiipWULkXk'}]
        blogsService = TestBed.get(BlogsService)
        component.blogs = blogsTest
        fixture.detectChanges();
        let spy =  spyOn(blogsService, 'returnBlogs').and.returnValue(blogs);
    // console.log(fixture.nativeElement.querySelector('.blog-thumb'))
    let domEl = fixture.nativeElement.querySelector('.blog-thumb');
        domEl.click();
        expect(component.populateForm).toHaveBeenCalledWith('xyz', 1);
        // fixture.detectChanges();
        blogsService.returnBlogs()
        // console.log(blogsService.returnBlogs())
        expect(blogsService.returnBlogs).toHaveBeenCalled();
  });

  it('PopulateForm should return current blog array', () => {
         blogsService = TestBed.get(BlogsService)
         let blogs = [{_id1: 'xyz', title: 'title1', vidUrl: 'XpiipWULkXk'}, {_id1: 'abc', title: 'title2', vidUrl: 'XpiipWULkXk'}]
         let id = 'xyz'
         let index = 1;

      let spy =  spyOn(blogsService, 'returnBlogs').and.returnValue(blogs);
      // expect(component.populateForm).toHaveBeenCalled();
      component.populateForm('xyz', 1)

        fixture.detectChanges();

  });
});
