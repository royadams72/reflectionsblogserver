import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { routing } from './app.routes';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HTTP_INTERCEPTORS } from '@angular/common/http';

import { AppComponent } from './app.component';
import { BlogsComponent } from './components/blogs/blogs.component';
import { NavComponent } from './components/nav/nav.component';
import { BlogpageComponent } from './components/blogpage/blogpage.component';
import { CrudBlogComponent } from './components/crud-blog/crud-blog.component';
import { BlogFormComponent } from './components/blogform/blogform.component';
import { CrudListComponent } from './components/crud-list/crud-list.component';
import { LoginComponent } from './components/login/login.component';

import { TokenInterceptor } from './services/token.interceptor';
import { BlogsService } from './services/blogs.service';
import { AuthService } from './services/auth.service';

@NgModule({
  declarations: [
    AppComponent,
    BlogsComponent,
    NavComponent,
    BlogpageComponent,
    CrudBlogComponent,
    BlogFormComponent,
    CrudListComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    routing
  ],
  providers: [
    BlogsService,
    AuthService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
