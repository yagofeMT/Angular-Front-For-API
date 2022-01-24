import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { AuthGuardService } from 'src/app/services/auth-guard.service';
import { CardService } from 'src/app/services/card.service';

@Component({
  selector: 'app-new-card',
  templateUrl: './new-card.component.html',
  styleUrls: ['../../Categoria/list-categorys/list-categorys.component.css'],
})
export class NewCardComponent implements OnInit {

  isAdm: boolean | undefined;
  form: any;
  userid = localStorage.getItem("userId");

  constructor(private authGuard: AuthGuardService, private router: Router, private cardService: CardService, private SnackBar: MatSnackBar) { }

  ngOnInit(): void {

    if (localStorage.getItem("tokenUserSignIn") == null) {
      this.router.navigate(["login"])
    }
    

    this.isAdm = this.authGuard.CheckAdm();

    this.form = new FormGroup({
      Name: new FormControl(null, [Validators.required, Validators.minLength(2)]),
      Flag: new FormControl(),
      Number: new FormControl(null, [Validators.required, Validators.maxLength(16), Validators.minLength(15)]),
      Limite: new FormControl(),
      UserId : new FormControl(this.userid)
    })

  }

  AddCard() : void {;
    const card = this.form.value;

    this.cardService.AddCardUser(card).subscribe(result => {
      this.router.navigate(["Card"]);
      this.SnackBar.open(result.message, null!, {
        duration: 2000,
        horizontalPosition: "center",
        verticalPosition: "top"
      })
    },
      (err) => {
        if (err.status === 400) {
          for (const camp in err.error.errors) {
            if (err.error.errors.hasOwnProperty(camp)) {
              for (var error in err.error.errors[camp]) {
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

  
  BackList(): void {
    this.router.navigate(['categorys/list'])
  }
}
