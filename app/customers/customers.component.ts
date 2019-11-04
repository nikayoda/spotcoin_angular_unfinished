import { Component, OnInit } from '@angular/core';
import {LocalDataSource} from 'ng2-smart-table';
import {DatePipe} from '@angular/common';
import {CustomerService} from '../_services/customer.service';
import {CurrentUser} from '../_models/currentUser';
import {AuthService} from '../_services/auth.service';

@Component({
  selector: 'app-customers',
  templateUrl: './customers.component.html',
  styleUrls: ['./customers.component.scss']
})
export class CustomersComponent implements OnInit {
  source: LocalDataSource;
  currUser: CurrentUser;
  settings = {};

  constructor(private customerService: CustomerService,
              private datePipe: DatePipe,
              private authService: AuthService) {
    this.source = new LocalDataSource();
    this.currUser = this.authService.getUserInfo();
    if (this.currUser.role === 'Cashier') {
      this.settings = {
        actions: {
          add: false,
          edit: false,
          delete: false
        },
        columns: {
          firstName: {
            title: 'First Name'
          },
          lastName: {
            title: 'Last Name'
          },
          countryName: {
            title: 'Country'
          },
          town: {
            title: 'town'
          },
          zip: {
            title: 'Zip'
          },
          email: {
            title: 'Email'
          },
          phone: {
            title: 'Phone'
          },
          identityNumber: {
            title: 'Identity Number'
          },
          createdDate: {
            title: 'Created At',
            type: 'string',
            valuePrepareFunction: (column, row) => {
              return this.datePipe.transform(column, 'yyyy-MM-dd');
            },
          },
          gender: {
            title: 'Gender'
          },
        },
        attr: {
          class: 'table'
        }
      };
    } else {
      this.settings = {
        actions: {
          add: false,
          edit: false,
          delete: false
        },
        columns: {
          firstName: {
            title: 'First Name'
          },
          lastName: {
            title: 'Last Name'
          },
          countryName: {
            title: 'Country'
          },
          town: {
            title: 'town'
          },
          zip: {
            title: 'Zip'
          },
          email: {
            title: 'Email'
          },
          phone: {
            title: 'Phone'
          },
          identityNumber: {
            title: 'Identity Number'
          },
          createdDate: {
            title: 'Created At',
            type: 'string',
            valuePrepareFunction: (column, row) => {
              return this.datePipe.transform(column, 'yyyy-MM-dd');
            },
          },
          gender: {
            title: 'Gender'
          },
          employeeFirstName: {
            title: 'Cashier First Name'
          },
          employeeLastName: {
            title: 'Cashier Last Name'
          },
        },
        attr: {
          class: 'table'
        }
      };
    }
  }

  ngOnInit() {
    if (this.currUser.role === 'Cashier') {
      this.customerService.getAllEmpCustomer({id: this.currUser.employeeId}).subscribe(data => {
        this.source.load(data['customers']);
        this.source.setPaging(1, 15, true);
      });
    } else {
      this.customerService.getAll({id: this.currUser.merchantId}).subscribe(data => {
        this.source.load(data['customers']);
        this.source.setPaging(1, 15, true);
      });
    }
  }
}
