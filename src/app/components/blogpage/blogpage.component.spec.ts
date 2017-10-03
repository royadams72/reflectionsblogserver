import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { BlogpageComponent } from './blogpage.component';
import { ActivatedRoute } from '@angular/router';
import { BlogsService } from '../../services/blogs.service';
import { HttpClientModule } from '@angular/common/http';
import { ActivatedRouteStub } from '../../../testing/activated.route';
import { RouterTestingModule } from '@angular/router/testing';
import { MockComponent } from '../../../testing/mock.component';
class DummyComponent{

}
describe('BlogpageComponent', () => {
  let component: BlogpageComponent;
  let fixture: ComponentFixture<BlogpageComponent>;
  let service: BlogsService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BlogpageComponent],
      imports: [HttpClientModule,  RouterTestingModule.withRoutes([
         { path: 'settings/:collection/edit/:item', component: DummyComponent }
        ])
      ],
      providers: [ {provide: ActivatedRoute, useClass: ActivatedRouteStub}, BlogsService]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BlogpageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('component should be created', () => {
    expect(component).toBeTruthy();
  });

});
