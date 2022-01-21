import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { Category } from '../models/Category';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${localStorage.getItem('TokenUserSignIn')}`
  })
};

@Injectable({
  providedIn: 'root'
})
export class CategorysService {

  url: string = 'https://localhost:7089/api/categorys';

  constructor(private http: HttpClient) { }

  GetAll(): Observable<Category[]> {
    return this.http.get<Category[]>(this.url);
  }

  GetCategoryID(CategoryId: number): Observable<Category> {
    const apiUrl = `${this.url}/${CategoryId}`;
    return this.http.get<Category>(apiUrl);
  }

  PostCategory(category: Category): Observable<any> {
    return this.http.post<Category>(this.url, category, httpOptions);
  }

  PutCategory(CategoryId: number, category: Category): Observable<any> {
    const apiUrl = `${this.url}/${CategoryId}`;
    return this.http.put<Category>(apiUrl, category, httpOptions)
  }

  DeleteCategory(CategoryId: number): Observable<any> {
    const apiUrl = `${this.url}/${CategoryId}`;
    return this.http.delete<number>(apiUrl, httpOptions)
  }

  FilterCategorys(categoryName: string): Observable<Category[]> {
    const apiUrl = `${this.url}/FilterCategorys/${categoryName}`;

    return this.http.get<Category[]>(apiUrl);
  }
}
