import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListCategorysComponent } from './componentes/Categoria/list-categorys/list-categorys.component';
import { HttpClientModule } from '@angular/common/http';
import { NewCategoryComponent } from './componentes/Categoria/new-category/new-category.component';
import { EditComponent } from './componentes/Categoria/edit/edit.component';


const routes: Routes = [
  {
    path : 'categorys/list', component: ListCategorysComponent
  },
  {
    path : 'categorys/newcategory', component: NewCategoryComponent
  },
  {
    path : 'categorys/edit/:id', component: EditComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes), HttpClientModule],
  exports: [RouterModule]
})
export class AppRoutingModule { }
