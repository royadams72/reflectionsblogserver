import { TestBed, async } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { MockComponent } from '../testing/mock.component';
describe('AppComponent', () => {
  let AppNav = MockComponent({ selector: 'app-nav' });
  let RouterApp = MockComponent({ selector: 'router-outlet' })
  beforeEach(async(() => {//
    TestBed.configureTestingModule({

      declarations: [
        AppComponent,
        AppNav,
        RouterApp
      ]

    }).compileComponents();
  }));

  it('should create the app', async(() => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  }));

});
