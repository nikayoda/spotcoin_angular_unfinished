import { Injectable } from '@angular/core';
import {environment} from '../../environments/environment';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Currency} from '../_models/currency';

@Injectable({
  providedIn: 'root'
})
export class CurrencyService {
  baseUrl =  environment.apiUrl + 'a/s/c';

  constructor(private http: HttpClient) { }

  getAll(): Observable<Currency[]> {
    return this.http.get<Currency[]>(`${this.baseUrl}/get-currencies`);
  }

}
