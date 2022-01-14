import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { map, Observable } from 'rxjs';
import { Funcao } from '../models/Funcao';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json'
  })
};

@Injectable({
  providedIn: 'root'
})
export class FunctionService {

  url: string = 'https://localhost:7089/api/Functions';

  constructor(private http: HttpClient) { }

  GetAll(): Observable<Function[]> {
    return this.http.get<Function[]>(this.url);
  }

  GetFunctionID(id: string): Observable<Funcao> {
    const apiUrl = `${this.url}/${id}`;
    return this.http.get<Funcao>(apiUrl);
  }

  PostFunction(functions: Funcao): Observable<any> {
    functions.id = this.StringAleatoria();
    return this.http.post<Funcao>(this.url, functions, httpOptions);
  }

  PutFunction(FunctionId: string, functions: Funcao): Observable<any> {
    const apiUrl = `${this.url}/${FunctionId}`;
    return this.http.put<Funcao>(apiUrl, functions, httpOptions)
  }

  DeleteFunction(FunctionId: string): Observable<any> {
    const apiUrl = `${this.url}/${FunctionId}`;
    return this.http.delete<number>(apiUrl, httpOptions)
  }

  StringAleatoria() : string
  {
    var string  = '';
    var caracteres = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    for (var i = 0; i < 450; i++) {
      string += caracteres.charAt(Math.floor(Math.random() * caracteres.length));
    }
    return string;
  }
}
