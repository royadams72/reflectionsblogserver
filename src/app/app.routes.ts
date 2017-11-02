// import { ModuleWithProviders } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
// import { CrudBlogComponent } from './components/crud-blog/crud-blog.component';
import { BlogsComponent } from './components/blogs/blogs.component';
import { BlogpageComponent } from './components/blogpage/blogpage.component';
import { LoginComponent } from './components/login/login.component';
import { IsloggedinGuard } from './routing/isloggedin.guard';
// './auth/auth.module#AuthModule'
const appRoutes: Routes = [
  { path: "login", component: LoginComponent },
  { path: "crudblog", canActivate: [IsloggedinGuard], loadChildren: './components/crud-blog/crud.module#CrudModule' },
  { path: "blog/:id", component: BlogpageComponent },
  { path: "", component: BlogsComponent },
  { path: "**", component: BlogsComponent },
]

export const routing = RouterModule.forRoot(appRoutes);
