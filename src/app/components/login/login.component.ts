import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormArray } from '@angular/forms';
import { Subscription } from 'rxjs/Subscription';

import { BlogsService } from '../../services/blogs.service';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
public loginForm:FormGroup;
  constructor(private blogsService:BlogsService, private authService:AuthService) { }

  ngOnInit() {
      this.initForm();
  }
  private initForm(){
      // let items = [];
        this.loginForm = new FormGroup({
              'email': new FormControl(null, [Validators.required, Validators.email]),
              'password': new FormControl(null,Validators.compose([Validators.required, Validators.minLength(1)]))
            });
        // this.addItemFields();
  }
  onSubmitForm(){
    let form = this.loginForm
    let email = form.get('email');
    let password = form.get('password');
    let conn:Subscription;
        conn = this.authService.login(email.value, password.value)
        .subscribe((data)=>{
          console.log(data)
        },
        err => {
    //  console.log(err.error.error.message);

    if (err.error instanceof Error) {
            // A client-side or network error occurred. Handle it accordingly.
            console.log('An error occurred:', err.error);
          } else {
            // The backend returned an unsuccessful response code.
            // The response body may contain clues as to what went wrong,
            console.log(err.error)
            console.log(`Backend returned code ${err.status}, body was: ${err.error}`);
          }

          }

      )
      // console.log(email.value, password.value)

  }
}
