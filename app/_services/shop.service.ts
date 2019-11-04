import { Injectable } from '@angular/core';
import {environment} from '../../environments/environment';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {ShopForList} from '../_models/shops/shopForList';
import {Shop} from '../_models/shops/shop';

@Injectable({
  providedIn: 'root'
})
export class ShopService {
  baseUrl =  environment.apiUrl + 'a/m/m';

  constructor(private http: HttpClient) {
  }

  getAll(merchantId): Observable<ShopForList[]> {
    return this.http.post<ShopForList[]>(`${this.baseUrl}/get-all-shops`, merchantId);
  }

  create(shop: Shop): Observable<any> {
    return this.http.post(`${this.baseUrl}/create-shop`, shop);
  }
}
