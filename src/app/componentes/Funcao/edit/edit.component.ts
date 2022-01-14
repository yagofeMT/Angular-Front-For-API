import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FunctionService } from 'src/app/services/function.service';
import { Funcao } from 'src/app/models/Funcao';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['../../Categoria/list-categorys/list-categorys.component.css']
})
export class EditFunctionComponent implements OnInit {
nameFunction : string | undefined
function : Observable<Funcao> | undefined
form: any
id!: string;

  constructor(private router : Router,
    private route : ActivatedRoute,
    private functionService : FunctionService, private SnackBar : MatSnackBar) { }

  ngOnInit(): void {
    
    
    this.id = this.route.snapshot.params['FunctionId'];
    this.functionService.GetFunctionID(this.id).subscribe(result => {
      this.nameFunction = result.name;
      this.form = new FormGroup({
      Id : new FormControl(result.id),
      name : new FormControl(result.name),
      description : new FormControl(result.description),
      normalizedName : new FormControl(result.normalizedName),
    });
  });
  }

  get propriedade(){
    return this.form.controls;
  }

  UpdateCategory() : void {
    const functions = this.form.value;

    this.functionService.PutFunction(this.id, functions).subscribe(result => {
      this.router.navigate(['function/list'])
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
    this.router.navigate(['function/list'])
  }

}
