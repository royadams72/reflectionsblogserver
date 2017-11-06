import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { routing } from './app.routes';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
/*Components*/
import { AppComponent } from './app.component';
import { BlogsComponent } from './components/blogs/blogs.component';
import { NavComponent } from './components/nav/nav.component';
import { BlogpageComponent } from './components/blogpage/blogpage.component';
import { ErrorComponent } from './components/errors/error.component';
import { LoginComponent } from './components/login/login.component';
import { AlertComponent } from './components/alert/alert.component';
/*Services*/
import { ErrorService } from './components//errors/error.service';
import { TokenInterceptor } from './services/token.interceptor';
import { BlogsService } from './services/blogs.service';
import { AuthService } from './services/auth.service';
import { IsloggedinGuard } from './routing/isloggedin.guard';
import { AlertService } from './components/alert/alert.service';
@NgModule({
  declarations: [
    AppComponent,
    BlogsComponent,
    NavComponent,
    BlogpageComponent,
    LoginComponent,
    ErrorComponent,
    AlertComponent
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
    IsloggedinGuard,
    ErrorService,
    AlertService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
