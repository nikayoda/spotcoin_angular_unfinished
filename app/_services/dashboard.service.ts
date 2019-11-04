import { Injectable } from '@angular/core';
import {environment} from '../../environments/environment';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {
  baseUrl =  environment.apiUrl + 'a/m/r';

  constructor(private http: HttpClient) { }

  maDashboard(merchantAccountId): Observable<any> {
    return this.http.post(`${this.baseUrl}/ma-dashboard`, merchantAccountId);
  }

  getShopInfos(merchantId): Observable<any> {
    return this.http.post(`${this.baseUrl}/shop-infos`, merchantId);
  }
}
