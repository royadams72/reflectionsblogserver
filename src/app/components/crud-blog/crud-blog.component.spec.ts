import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { MockComponent } from '../../../testing/mock.component';
import { CrudBlogComponent } from './crud-blog.component';
import { BlogsService } from '../../services/blogs.service';
describe('CrudBlogComponent', () => {
  let component: CrudBlogComponent;
  let fixture: ComponentFixture<CrudBlogComponent>;
  let mockComponent1 = MockComponent({ selector: 'app-blogform' });
  let mockComponent2= MockComponent({ selector: 'app-crud-list' });
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CrudBlogComponent, mockComponent1, mockComponent2],
      providers: [BlogsService]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CrudBlogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
