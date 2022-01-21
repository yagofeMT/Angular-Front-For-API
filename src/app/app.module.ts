import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {HttpClientModule} from '@angular/common/http';
import {HttpClient } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

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
import { EditCategoryComponent } from './componentes/Categoria/edit/edit.component';
import {MatDialogModule} from '@angular/material/dialog';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import { CommonModule } from '@angular/common';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatProgressBarModule} from '@angular/material/progress-bar';
import { ListFunctionComponent } from './componentes/Funcao/list-function/list-function.component';
import { DialogDeleteFunctionComponent } from './componentes/Funcao/list-function/list-function.component';
import { EditFunctionComponent } from './componentes/Funcao/edit/edit.component';
import { NewFunctionComponent } from './componentes/Funcao/new-function/new-function.component';
import { RegisterUserComponent } from './componentes/Register/register-user/register-user.component';
import { NgxMaskModule, IConfig } from 'ngx-mask'
import { MaterialFileInputModule } from 'ngx-material-file-input';
import { LoginUserComponent } from './componentes/Register/login-user/login-user.component';
import { JwtModule } from '@auth0/angular-jwt';
import { DashboardComponent } from './componentes/Dashboard/dashboard/dashboard.component';
import { HeaderComponent } from './componentes/Dashboard/header/header.component';
import { MatListModule } from '@angular/material/list';
import {MatToolbarModule} from '@angular/material/toolbar';
import { AuthGuardService } from './services/auth-guard.service';
import { NewCardComponent } from './componentes/Card/new-card/new-card.component';


export function GetTokenUser(){
  return localStorage.getItem("tokenUserSignIn");
}

const maskConfigFunction: () => Partial<IConfig> = () => {
  return {
    validation: false,
  };
};


@NgModule({
  declarations: [
    AppComponent,
    ListCategorysComponent,
    NewCategoryComponent,
    EditCategoryComponent,
    DialogDeleteCategorysComponent,
    ListFunctionComponent,
    DialogDeleteFunctionComponent,
    EditFunctionComponent,
    NewFunctionComponent,
    RegisterUserComponent,
    LoginUserComponent,
    DashboardComponent,
    HeaderComponent,
    NewCardComponent
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
    MatDialogModule,
    FormsModule,
    MatAutocompleteModule,
    CommonModule,
    MatPaginatorModule,
    MatSortModule,
    MatSnackBarModule,
    MatProgressBarModule,
    NgxMaskModule.forRoot(maskConfigFunction),
    MaterialFileInputModule,
    JwtModule.forRoot({
      config: {
        tokenGetter : GetTokenUser,
        allowedDomains: ['localhost:5089'],
        disallowedRoutes: []
      }
    }),
    MatListModule,
    MatToolbarModule,
  ],
  providers: [
    HttpClientModule,
    HttpClient,
    TypesService,
    CategorysService,
    AuthGuardService
    
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
