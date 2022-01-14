import { FunctionService } from 'src/app/services/function.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-new-function',
  templateUrl: './new-function.component.html',
  styleUrls: ['../../Categoria/list-categorys/list-categorys.component.css']
})
export class NewFunctionComponent implements OnInit {

  form: any;
  erros: string[] = [];

  constructor(private functionService: FunctionService, private router: Router, private SnackBar: MatSnackBar) { }

  ngOnInit(): void {


    this.form = new FormGroup({
      name: new FormControl(null, [Validators.required, Validators.minLength(4), Validators.maxLength(50)]),
      description: new FormControl(null, [Validators.required, Validators.minLength(4), Validators.maxLength(50)]),
      normalizedName: new FormControl(null, [Validators.required, Validators.minLength(4), Validators.maxLength(50)]),
    });

  }

  get propriedade() {
    return this.form.controls;
  }

  PostForm(): void {
    const functions = this.form.value;
    this.functionService.PostFunction(functions).subscribe(result => {
      this.router.navigate(['function/list']);
      this.SnackBar.open(result.message, null!, {
        duration: 2000,
        horizontalPosition: 'center',
        verticalPosition: 'top'
      })
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
      })
  };

  BackList(): void {
    this.router.navigate(['function/list'])
  }


}
