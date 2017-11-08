import { Component } from '@angular/core';
import { NavComponent } from './components/nav/nav.component';
import { AuthService } from './services/auth.service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  constructor(public auth: AuthService) {
    auth.handleAuth();
  }

  ngOnInit() {

  }

}
