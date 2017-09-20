import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CrudBlogComponent } from './crud-blog.component';

describe('CrudBlogComponent', () => {
  let component: CrudBlogComponent;
  let fixture: ComponentFixture<CrudBlogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CrudBlogComponent ]
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
