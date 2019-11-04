import { Injectable } from '@angular/core';
import {environment} from '../../environments/environment';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {MerchantEmployeeFull} from '../_models/merchant/merchantEmployeeFull';
import {EmployeeForList} from '../_models/merchant/employeeForList';

@Injectable({
  providedIn: 'root'
})
export class MerchantService {
  baseUrl =  environment.apiUrl + 'a/m/m';

  constructor(private http: HttpClient) { }

  createMerchantEmployee(emp: MerchantEmployeeFull): Observable<any> {
    return this.http.post(`${this.baseUrl}/create-merchant-emp-full`, emp);
  }

  checkMerchantEmpAccount(model: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/check-mea-unique-glob`, model);
  }

  getAllEmployee(model: any): Observable<EmployeeForList[]> {
    return this.http.post<EmployeeForList[]>(`${this.baseUrl}/get-all-emp`, model);
  }

  uploadMerchantLogo(merchantId, file): Observable<any> {
    const formData: FormData = new FormData();

    formData.append('id', merchantId);
    formData.append('logo', file);

    return this.http.post(`${environment.apiUrl}a/s/c/update-branding`, formData);
  }
}
