import { Injectable } from '@angular/core';
import {environment} from '../../environments/environment';
import {Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {InitPaymentTransaction} from '../_models/payments/initPaymentTransaction';

@Injectable({
  providedIn: 'root'
})
export class PaymentService {
  baseUrl =  environment.apiUrl + 'a/m/p';

  constructor(private http: HttpClient) { }

  getGateways(): Observable<any> {
    return this.http.get(`${this.baseUrl}/get-gateways`);
  }

  pay(paymentTran: InitPaymentTransaction): Observable<any> {
    return this.http.post<InitPaymentTransaction>(`${this.baseUrl}/pay`, paymentTran);
  }
}
