import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { CrudListComponent } from './crud-list.component';
import { BlogsService } from '../../services/blogs.service';
import { HttpClientModule } from '@angular/common/http';
describe('CrudListComponent', () => {
  let component: CrudListComponent;
  let fixture: ComponentFixture<CrudListComponent>;

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
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });

  it('should call function and populate parameters', () => {
  let domEl = fixture.debugElement.query(By.css('.blog-thumb'));

    fixture.whenStable().then(
        () => {
    // fixture.detectChanges();


      domEl.triggerEventHandler('click', null);
        // spyOn(component, 'populateForm').and.callThrough()
          fixture.detectChanges();
       expect(component.populateForm).toHaveBeenCalledWith();
    })
  });

  it('Should set items array with values from service', () => {

  let spy = spyOn(component, 'populateForm').and.callFake(()=>{
return "gfgfg";
  })
  // component.ngOnInit();
  // do stuff
  // expect(component.items.length).toBeGreaterThan(0);
});

  // it('Elements of class jqx-tree-item-li found using getElementsByClassName ', (done) => {
  //
  //     this.fixture.whenStable().then(
  //         () => {
  //             fixture.detectChanges(); // missed
  //             var elementArray = fixture.debugElement.query(By.css('.jqx-tree-item-li')); // use fixture instance to
  //             expect(elementArray.length).toBeGreaterThan(0); //passes without issue :)
  //             done();
  //         }
  //     );
  // });

});
