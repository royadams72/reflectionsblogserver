import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import{ReactiveFormsModule  } from '@angular/forms';
import { BlogFormComponent } from './blogform.component';
import { BlogsService } from '../../services/blogs.service';
import { HttpClientModule } from '@angular/common/http';
describe('BlogFormComponent', () => {
  let component: BlogFormComponent;
  let fixture: ComponentFixture<BlogFormComponent>;

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
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
