import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { Card } from '../models/Card';



const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${localStorage.getItem('TokenUserSignIn')}`
  })
};


@Injectable({
  providedIn: 'root'
})
export class CardService {

  Url = "https://localhost:7089/api/Cards"

  constructor(private http: HttpClient) { }


  GetAll() : Observable<Card[]> 
  {
    return this.http.get<Card[]>(this.Url)
  }
}
