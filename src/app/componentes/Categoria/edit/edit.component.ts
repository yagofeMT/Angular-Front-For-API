import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Category } from 'src/app/models/Category';
import { Tipo } from 'src/app/models/Tipo';
import { CategorysService } from 'src/app/services/categorys.service';
import { TypesService } from 'src/app/services/types.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AuthGuardService } from 'src/app/services/auth-guard.service';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['../list-categorys/list-categorys.component.css']
})
export class EditCategoryComponent implements OnInit {
nameCategory : string | undefined
category : Observable<Category> | undefined
tipos : Tipo[] | undefined
form: any
id!: number;
isAdm : boolean | undefined;

  constructor(private router : Router,
    private route : ActivatedRoute,
    private categoryService : CategorysService,
    private typesService : TypesService, private SnackBar : MatSnackBar, private authGuard : AuthGuardService) { }

  ngOnInit(): void {
    
    if(localStorage.getItem("tokenUserSignIn") == null){
      this.router.navigate(["login"])
    }
    
    this.isAdm = this.authGuard.CheckAdm();

    if(this.isAdm == false){
      this.router.navigate(["categorys/list"]);
    }

    this.id = this.route.snapshot.params['id'];
    this.typesService.GetAll().subscribe(result => {this.tipos = result});
    this.categoryService.GetCategoryID(this.id).subscribe(result => {
      this.nameCategory = result.name;
      this.form = new FormGroup({
      Id : new FormControl(result.id),
      name : new FormControl(result.name),
      icone : new FormControl(result.icone),
      typeId : new FormControl(result.typeId)
    });
  });
  }

  get propriedade(){
    return this.form.controls;
  }

  UpdateCategory() : void {
    const categoria = this.form.value;

    this.categoryService.PutCategory(this.id, categoria).subscribe(result => {
      this.router.navigate(['categorys/list'])
      this.SnackBar.open(result.message, null!, {
        duration: 2000,
        horizontalPosition: 'center',
        verticalPosition: 'top'
      });
    },
      (err) => {
        if (err.status === 400) {
          for (const camp in err.error.errors) {
            if (err.error.errors.hasOwnProperty(camp)) 
            {
              for(var error in err.error.errors[camp]){
                this.SnackBar.open(err.error.errors[camp], null!, {
                  duration: 2000,
                  horizontalPosition: 'center',
                  verticalPosition: 'top',
                })   
              }
            }
          }
        }
      });
  }

  BackList() : void {
    this.router.navigate(['categorys/list'])
  }
}
