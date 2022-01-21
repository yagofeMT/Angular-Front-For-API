import { Component, OnInit } from '@angular/core';
import { AuthGuardService } from 'src/app/services/auth-guard.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  isAdm : boolean | undefined;

  constructor(private authGuard : AuthGuardService) { }

  ngOnInit(): void {

    this.isAdm = this.authGuard.CheckAdm();
  }

}
