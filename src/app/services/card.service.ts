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


  GetCardUser(UserId : any) : Observable<Card[]> 
  {
    const apiUrl = `${this.Url}/GetCardsUser/${UserId}`;
    return this.http.get<Card[]>(apiUrl)
  }

  AddCardUser(card : Card) : Observable<any>
  {
    return this.http.post<Card>(this.Url, card, httpOptions)
  }

  FilterCard(name : string, userid : string) : Observable<Card[]>
  {
    const apiUrl = `${this.Url}/FilterCard/${name}-${userid}`;
    return this.http.get<Card[]>(apiUrl)
  }
}
