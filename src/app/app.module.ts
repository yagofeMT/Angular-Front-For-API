import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {HttpClientModule} from '@angular/common/http';
import {HttpClient } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TypesService } from './services/types.service';
import { CategorysService } from './services/categorys.service';
import { DialogDeleteCategorysComponent, ListCategorysComponent } from './componentes/Categoria/list-categorys/list-categorys.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatCommonModule } from '@angular/material/core';
import {MatIconModule} from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { NewCategoryComponent } from './componentes/Categoria/new-category/new-category.component';
import {MatCardModule} from '@angular/material/card';
import {MatDividerModule} from '@angular/material/divider';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatSelectModule} from '@angular/material/select';
import { ReactiveFormsModule } from '@angular/forms';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatGridListModule} from '@angular/material/grid-list';
import { EditComponent } from './componentes/Categoria/edit/edit.component';
import {MatDialogModule} from '@angular/material/dialog';


@NgModule({
  declarations: [
    AppComponent,
    ListCategorysComponent,
    NewCategoryComponent,
    EditComponent,
    DialogDeleteCategorysComponent,
  ],
  imports: [
    HttpClientModule,
    AppRoutingModule,
    BrowserModule,
    MatCommonModule,
    MatIconModule,
    MatTableModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatCardModule,
    MatDividerModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    ReactiveFormsModule,
    MatSidenavModule,
    MatGridListModule,
    MatDialogModule
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
