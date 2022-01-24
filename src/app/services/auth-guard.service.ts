import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Route, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import jwtDecode from 'jwt-decode';
import { Observable } from 'rxjs';
import decode from 'jwt-decode';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate {

  constructor(private jwtHelper : JwtHelperService, private router : Router) { }
  canActivate() : boolean
  {

    const token = localStorage.getItem('tokenUserSignIn');

    if(token && !this.jwtHelper.isTokenExpired(token)){
      return true;
    }

    this.router.navigate(['./login']);
    return false;
  }

  CheckAdm() : boolean
  {
    const token = localStorage.getItem('tokenUserSignIn');
    const tokenUser : any = decode(token!);

    

    if(tokenUser.role == 'Administrador')
    { 
      return true
    }
    else
    {
      return false;
    }
  }
}
