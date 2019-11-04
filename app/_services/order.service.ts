import { Injectable } from '@angular/core';
import {environment} from '../../environments/environment';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Order} from '../_models/orders/order';
import {OrderForList} from '../_models/orders/orderForList';
import {Invoice} from '../_models/orders/invoice';

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  baseUrl =  environment.apiUrl + 'a/m/o';

  constructor(private http: HttpClient) { }

  countFiat(model: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/count-spot`, model);
  }

  create(order: Order): Observable<any> {
    return this.http.post(`${this.baseUrl}/create-order`, order);
  }

  getAllEmpOrders(model: any): Observable<OrderForList[]> {
    return this.http.post<OrderForList[]>(`${this.baseUrl}/get-me-orders-bs`, model);
  }

  getAllMerchOrders(model: any): Observable<OrderForList[]> {
    return this.http.post<OrderForList[]>(`${this.baseUrl}/get-m-orders-bs`, model);
  }

  getAllOrderStatus(): Observable<any> {
    return this.http.get(`${this.baseUrl}/get-order-statuses`);
  }

  getInvoice(model: any): Observable<Invoice> {
    return this.http.post<Invoice>(`${this.baseUrl}/get-invoice-by-order`, model);
  }
}
