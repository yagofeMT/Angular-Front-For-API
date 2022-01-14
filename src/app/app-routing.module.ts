import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListCategorysComponent } from './componentes/Categoria/list-categorys/list-categorys.component';
import { HttpClientModule } from '@angular/common/http';
import { NewCategoryComponent } from './componentes/Categoria/new-category/new-category.component';
import { EditCategoryComponent } from './componentes/Categoria/edit/edit.component';
import { ListFunctionComponent } from './componentes/Funcao/list-function/list-function.component';
import { EditFunctionComponent } from './componentes/Funcao/edit/edit.component';
import { NewFunctionComponent } from './componentes/Funcao/new-function/new-function.component';


const routes: Routes = [
  {
    path : 'categorys/list', component: ListCategorysComponent
  },
  {
    path : 'categorys/newcategory', component: NewCategoryComponent
  },
  {
    path : 'categorys/edit/:id', component: EditCategoryComponent
  },
  {
    path : 'function/list', component : ListFunctionComponent
  },
  {
    path: 'function/edit' , component: EditFunctionComponent
  },
  {
    path : 'function/newfunction', component: NewFunctionComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes), HttpClientModule],
  exports: [RouterModule]
})
export class AppRoutingModule { }
