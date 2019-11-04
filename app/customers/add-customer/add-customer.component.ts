import { Component, OnInit } from '@angular/core';
import {CreateCustomer} from '../../_models/customers/createCustomer';
import {Country} from '../../_models/country';
import {CountryService} from '../../_services/country.service';
import {CustomerService} from '../../_services/customer.service';
import {CurrentUser} from '../../_models/currentUser';
import {AuthService} from '../../_services/auth.service';
import {NbToastrService} from '@nebular/theme';

@Component({
  selector: 'app-add-customer',
  templateUrl: './add-customer.component.html',
  styleUrls: ['./add-customer.component.scss']
})
export class AddCustomerComponent implements OnInit {
  customer: CreateCustomer = new CreateCustomer();
  countries: Country[];
  currUser: CurrentUser;
  loading = false;


  constructor(private countryService: CountryService,
              private customerService: CustomerService,
              private authService: AuthService,
              private toastrService: NbToastrService) { }

  ngOnInit() {
    this.countryService.getAll().subscribe(data => {
      this.countries = data['countries'];
      this.customer.countryId = this.countries[0].id;
    });
    this.currUser = this.authService.getUserInfo();
  }

  create() {
    this.loading = true;
    this.customer.merchantId = this.currUser.merchantId;
    this.customer.merchantEmployeeId = this.currUser.employeeId;
    this.customerService.create(this.customer).subscribe(data => {
      this.loading = false;
      this.customer = new CreateCustomer();
      this.toastrService.success('Customer created successfully');
    }, error => {
      this.loading = false;
      this.toastrService.danger(error);
    });
  }

}
