import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['../dashboard/dashboard.component.css']
})
export class HeaderComponent implements OnInit {


  EmailUserSigIn = localStorage.getItem("emailUserSignIn");
  constructor(private router : Router) { }

  ngOnInit(): void {
  }


  Logout() : void
  {
    localStorage.clear();
    this.router.navigate(['./login'])
  }

}
