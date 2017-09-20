import {ModuleWithProviders} from "@angular/core";
import {Routes, RouterModule} from "@angular/router";
import { CrudBlogComponent } from './components/crud-blog/crud-blog.component';
import { BlogsComponent } from './components/blogs/blogs.component';
import { BlogpageComponent } from './components/blogpage/blogpage.component';

const appRoutes: Routes = [
  {path: "crudblog", component: CrudBlogComponent},
  {path: "blog/:id", component: BlogpageComponent},
  {path: "", component: BlogsComponent},
  {path: "**", component: BlogsComponent},
]

export const routing:ModuleWithProviders = RouterModule.forRoot(appRoutes);
