import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { routing } from './app.routes';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { BlogsComponent } from './components/blogs/blogs.component';
import { BlogsService } from './services/blogs.service';
import { NavComponent } from './components/nav/nav.component';
import { BlogpageComponent } from './components/blogpage/blogpage.component';
import { CrudBlogComponent } from './components/crud-blog/crud-blog.component';
import { BlogFormComponent } from './components/blogform/blogform.component';
import { CrudListComponent } from './components/crud-list/crud-list.component';


@NgModule({
  declarations: [
    AppComponent,
    BlogsComponent,
    NavComponent,
    BlogpageComponent,
    CrudBlogComponent,
    BlogFormComponent,
    CrudListComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    routing
  ],
  providers: [BlogsService],
  bootstrap: [AppComponent]
})
export class AppModule { }
