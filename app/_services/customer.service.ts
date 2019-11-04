import { Injectable } from '@angular/core';
import {environment} from '../../environments/environment';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {CustomerForList} from '../_models/customers/customerForList';
import {CreateCustomer} from '../_models/customers/createCustomer';
import {CustomerCreditCard} from '../_models/customers/customerCreditCard';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {
  baseUrl =  environment.apiUrl + 'a/m/m';

  constructor(private http: HttpClient) { }

  getAll(model: any): Observable<CustomerForList[]> {
    return this.http.post<CustomerForList[]>(`${this.baseUrl}/get-all-customers`, model);
  }

  create(customer: CreateCustomer): Observable<any> {
    return this.http.post(`${this.baseUrl}/create-customer`, customer);
  }

  getAllEmpCustomer(model: any): Observable<CustomerForList[]> {
    return this.http.post<CustomerForList[]>(`${this.baseUrl}/get-all-emp-customers`, model);
  }

  addCreditCart(card: CustomerCreditCard): Observable<any> {
    return this.http.post(`${this.baseUrl}/add-customer-card`, card);
  }
}
