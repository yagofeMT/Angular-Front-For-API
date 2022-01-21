import { Component, OnInit, Inject } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { UsersService } from 'src/app/services/users.service';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';


@Component({
  selector: 'app-login-user',
  templateUrl: './login-user.component.html',
  styleUrls: ['../../Categoria/list-categorys/list-categorys.component.css']
})
export class LoginUserComponent implements OnInit {

  form: any

  constructor(private userService: UsersService, private router: Router, private SnackBar: MatSnackBar) { }

  ngOnInit(): void {

    if(localStorage.getItem("tokenUserSignIn") != null){
      this.router.navigate(["categorys/list"])
    }


    this.form = new FormGroup({
      Email: new FormControl(null, [Validators.required, Validators.minLength(2), Validators.maxLength(80)]),
      Password: new FormControl(null, [Validators.required, Validators.minLength(5), Validators.maxLength(17)])
    })

  }


  getpropriedade(){
    return this.form.controls;
  }

  Login(): void {
    const Login = this.form.value;
    this.userService.Login(Login).subscribe(result => {
      this.SnackBar.open(result.message, null!, {
        duration: 2000,
        horizontalPosition: 'center',
        verticalPosition: 'top'
      }),
    

      localStorage.setItem("emailUserSignIn", result.emailUserSignIn);
      localStorage.setItem("UserId", result.UserId)
      localStorage.setItem("tokenUserSignIn", result.tokenUserSignIn)
      
      this.router.navigate(['categorys/list'])

    },
      (err) => {    
        if (err.status === 404) {
          this.SnackBar.open(err.error, null!, {
            duration: 2000,
            horizontalPosition: 'center',
            verticalPosition: 'top',
          })
        }
      })
  }

}
