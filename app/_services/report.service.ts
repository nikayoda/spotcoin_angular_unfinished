import { Injectable } from '@angular/core';
import {Observable} from 'rxjs';
import {environment} from '../../environments/environment';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ReportService {
  baseUrl =  environment.apiUrl + 'a/m/r';

  constructor(private http: HttpClient) { }

  getShopInfos(model): Observable<any> {
    return this.http.post(`${this.baseUrl}/shop-infos-by-date`, model);
  }
}
