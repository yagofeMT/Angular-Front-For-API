import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Register } from '../models/Register';
import { importType } from '@angular/compiler/src/output/output_ast';
import { Observable } from 'rxjs';
import { LoginVM } from '../models/LoginVM';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json'
  })
};

@Injectable({
  providedIn: 'root'
})
export class UsersService {

Url : string  = 'https://localhost:7089/api/User'

  constructor(private http : HttpClient) { }

  PostUser(Register : Register) : Observable<any>
  {
    const apiURL = `${this.Url}/RegisterUser`
    return this.http.post<Register>(apiURL, Register, httpOptions)
  }

  SavePhoto(formData : any): Observable<any>
  {
    const apiUrl = `${this.Url}/SavePhoto`
    return this.http.post<any>(apiUrl, formData, httpOptions)
  }

  GetUserById(id : string): Observable<Register>
  {
    const apiURL = `${this.Url}/${id}`
    return this.http.get<Register>(apiURL)
  }

  Login(Login : LoginVM) : Observable<any>
  {
    const apiUrl = `${this.Url}/Login`
    return  this.http.post<LoginVM>(apiUrl, Login, httpOptions)
  }
}
