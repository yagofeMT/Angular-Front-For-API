import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {HttpClientModule} from '@angular/common/http';
import {HttpClient } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TypesService } from './services/types.service';
import { CategorysService } from './services/categorys.service';
import { ListCategorysComponent } from './componentes/Categoria/list-categorys/list-categorys.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatCommonModule } from '@angular/material/core';
import {MatIconModule} from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';


@NgModule({
  declarations: [
    AppComponent,
    ListCategorysComponent,
  ],
  imports: [
    HttpClientModule,
    AppRoutingModule,
    BrowserModule,
    MatCommonModule,
    MatIconModule,
    MatTableModule,
    BrowserAnimationsModule,
    MatButtonModule
  ],
  providers: [
    HttpClientModule,
    HttpClient,
    TypesService,
    CategorysService,
    
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
