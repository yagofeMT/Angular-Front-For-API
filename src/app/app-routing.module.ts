import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListCategorysComponent } from './componentes/Categoria/list-categorys/list-categorys.component';
import { HttpClientModule } from '@angular/common/http';


const routes: Routes = [
  {
    path : 'categorys/list', component: ListCategorysComponent
  },
  {
    path : 'tipos/list', component: ListCategorysComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes), HttpClientModule],
  exports: [RouterModule]
})
export class AppRoutingModule { }
