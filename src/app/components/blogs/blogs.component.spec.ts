import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { BlogsService } from '../../services/blogs.service';
import { BlogsComponent } from './blogs.component';
import { HttpClientModule } from '@angular/common/http';
import { RouterTestingModule } from '@angular/router/testing';
import { CrudListComponent } from '../../components/crud-list/crud-list.component';
import { Observable } from "rxjs";
class DummyComponent{

}
describe('BlogsComponent', () => {
  let component: BlogsComponent;
  let fixture: ComponentFixture<BlogsComponent>;
  let blogsService:BlogsService;
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BlogsComponent, CrudListComponent],
      providers: [BlogsService],
      imports: [HttpClientModule,  RouterTestingModule.withRoutes([
         { path: 'settings/:collection/edit/:item', component: DummyComponent }
        ])
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BlogsComponent);
    component = fixture.componentInstance;
    blogsService = TestBed.get(BlogsService)
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
  it('Should set blogs variable with values from service', () => {

  let spy = spyOn(blogsService, 'getBlogs').and.callFake(()=>{
    return Observable.from([[{id1: 1, title: 'a'}, {id1: 2, title: 'b'}]])
  })
  component.ngOnInit();
  // do stuff
  expect(component.blogs.length).toBeGreaterThan(0);
  });


});
