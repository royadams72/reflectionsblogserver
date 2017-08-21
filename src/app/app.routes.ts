import {ModuleWithProviders} from "@angular/core";
import {Routes, RouterModule} from "@angular/router";
import { AddblogComponent } from './components/addblog/addblog.component';
import { BlogsComponent } from './components/blogs/blogs.component';


const appRoutes: Routes = [
  {path: "addblog", component: AddblogComponent},
  {path: "", component: BlogsComponent},
  {path: "**", component: BlogsComponent},
]

export const routing:ModuleWithProviders = RouterModule.forRoot(appRoutes);
