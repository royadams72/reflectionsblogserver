import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from "@angular/forms";
import { Routes, RouterModule } from "@angular/router";

import { CrudBlogComponent } from '../crud-blog/crud-blog.component';
import { BlogFormComponent } from '../blogform/blogform.component';
import { CrudListComponent } from '../crud-list/crud-list.component';

const appRoutes: Routes = [
  { path: "", component: CrudBlogComponent }
]
@NgModule({
  declarations: [
    CrudListComponent,
    BlogFormComponent,
    CrudBlogComponent
  ],
  imports: [CommonModule, ReactiveFormsModule, RouterModule.forChild(appRoutes)],

  exports: [
    CrudListComponent,
    BlogFormComponent,
    CrudBlogComponent
  ]
})
export class CrudModule { }
