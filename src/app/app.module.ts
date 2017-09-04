import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { routing } from './app.routes';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { BlogsComponent } from './components/blogs/blogs.component';
import { BlogsService } from './services/blogs.service';
import { AddblogComponent } from './components/addblog/addblog.component';
import { NavComponent } from './components/nav/nav.component';
import { BlogpageComponent } from './components/blogpage/blogpage.component';
@NgModule({
  declarations: [
    AppComponent,
    BlogsComponent,
    AddblogComponent,
    NavComponent,
    BlogpageComponent
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
