import { Component, OnInit, OnDestroy } from '@angular/core';
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
  public loginForm: FormGroup;
  private conn: Subscription;
  constructor(private blogsService: BlogsService, private authService: AuthService) { }

  ngOnInit() {

    this.authService.login();
  }



}
