import { Injectable } from '@angular/core';
import {environment} from '../../environments/environment';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Country} from '../_models/country';

@Injectable({
  providedIn: 'root'
})
export class CountryService {
  baseUrl =  environment.apiUrl + 'a/s/c';

  constructor(private http: HttpClient) { }

  getAll(): Observable<Country[]> {
    return this.http.get<Country[]>(`${this.baseUrl}/get-all-countries`);
  }
}
