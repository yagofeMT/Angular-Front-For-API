import { Component, OnInit, Inject} from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { UsersService } from 'src/app/services/users.service';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FileInput, FileValidator } from 'ngx-material-file-input'
import { Byte } from '@angular/compiler/src/util';

@Component({
  selector: 'app-register-user',
  templateUrl: './register-user.component.html',
  styleUrls: ['../../Categoria/list-categorys/list-categorys.component.css']
})
export class RegisterUserComponent implements OnInit {

form : any

  constructor(private userService : UsersService, private router: Router, private SnackBar: MatSnackBar) { }

  ngOnInit(): void {

    if(localStorage.getItem("TokenUserSignIn") != null){
      this.router.navigate(["categorys/list"])
    }

    this.form = new FormGroup({
      Username : new FormControl(null,[Validators.required,Validators.minLength(2), Validators.maxLength(80)]),
      Password : new FormControl(null, [Validators.required ,Validators.minLength(5), Validators.maxLength(17)]),
      Email : new FormControl(null, [Validators.required, Validators.maxLength(100), Validators.minLength(8)]),
      Profissao : new FormControl(null, [Validators.required ,Validators.minLength(2), Validators.maxLength(30)]),
      CPF : new FormControl(null, [Validators.required]),
    })

  }




  PostUser() : void
  {
    const user = this.form.value;

    this.userService.PostUser(user).subscribe(result => {
      localStorage.setItem("EmailUserSignIn", result.emailUserSignIn);
      localStorage.setItem("UserId", result.UserId)
      localStorage.setItem("TokenUserSignIn", result.tokenUsuarioLogado)

      this.router.navigate(['categorys/list'])
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
                console.log(camp)
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
  }
}
