import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AppModule } from '../app.module';

import { Tipo } from '../models/Tipo';

@Injectable({
  providedIn: 'root'
})
export class TypesService {

url:string = 'api/Types';

  constructor(private http: HttpClient) { }

  GetAll(): Observable<Tipo[]>{
    return this.http.get<Tipo[]>(this.url)
  }
}
