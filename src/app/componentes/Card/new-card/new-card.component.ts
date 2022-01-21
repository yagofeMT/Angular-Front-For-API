import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthGuardService } from 'src/app/services/auth-guard.service';

@Component({
  selector: 'app-new-card',
  templateUrl: './new-card.component.html',
  styleUrls: ['../../Categoria/list-categorys/list-categorys.component.css'],
})
export class NewCardComponent implements OnInit {

  isAdm : boolean | undefined;

  constructor(private authGuard : AuthGuardService, private router : Router) { }

  ngOnInit(): void {

    if(localStorage.getItem("tokenUserSignIn") == null){
      this.router.navigate(["login"])
    }

    this.isAdm = this.authGuard.CheckAdm();
  }

}
